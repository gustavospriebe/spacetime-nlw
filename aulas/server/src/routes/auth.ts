import axios from "axios";
import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(app: FastifyInstance) {
    app.post("/register", async (request) => {
        const bodySchema = z.object({
            code: z.string(),
        });

        const { code } = bodySchema.parse(request.body);

        // Pega o code vindo do GitHub e faz um post para conseguir a access_token
        const accessTokenResponse = await axios.post(
            "https://github.com/login/oauth/access_token",
            null,
            {
                params: {
                    code,
                    client_id: process.env.GITHUB_CLIENT_ID,
                    client_secret: process.env.GITHUB_CLIENT_SECRET,
                },
                headers: {
                    Accept: "application/json",
                },
            }
        );

        const { access_token } = accessTokenResponse.data;

        // Faz uma request dos dados do usuário do GitHub com a access_token
        const userResponse = await axios.get("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const userSchema = z.object({
            id: z.number(),
            login: z.string(),
            name: z.string(),
            avatar_url: z.string().url(),
        });

        const userInfo = userSchema.parse(userResponse.data);

        // Procura o usuário do DB
        let user = await prisma.user.findUnique({
            where: {
                githubId: userInfo.id,
            },
        });

        // Se não existe, cria novo usuário
        if (!user) {
            user = await prisma.user.create({
                data: {
                    name: userInfo.name,
                    avatarUrl: userInfo.avatar_url,
                    githubId: userInfo.id,
                    login: userInfo.login,
                },
            });
        }

        // JWT
        const token = app.jwt.sign(
            {
                name: user.name,
                avatarUrl: user.avatarUrl,
            },
            {
                sub: user.id,
                expiresIn: "30 days",
            }
        );

        return { token };
    });
}
