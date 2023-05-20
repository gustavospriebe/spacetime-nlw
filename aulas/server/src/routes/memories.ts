import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function memoriesRoutes(app: FastifyInstance) {
    app.get("/memories", async () => {
        const memories = await prisma.memory.findMany({
            orderBy: {
                createdAt: "asc",
            },
        });

        return memories.map((memory) => {
            return {
                id: memory.id,
                coverUrl: memory.coverUrl,
                content: memory.content.substring(0, 96).concat("..."),
            };
        });
    });

    app.get("/memories/:id", async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = paramsSchema.parse(request.params);

        const memory = await prisma.memory.findUniqueOrThrow({
            where: {
                id,
            },
        });

        return memory;
    });

    app.post("/memories", async (request) => {
        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
        });

        const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

        const memory = await prisma.memory.create({
            data: {
                content,
                isPublic,
                coverUrl,
                userId: "a9f8977d-0652-45e9-ad90-9274099aea74",
            },
        });
        return memory;
    });

    app.put("/memories/:id", async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = paramsSchema.parse(request.params);

        const bodySchema = z.object({
            content: z.string(),
            coverUrl: z.string(),
            isPublic: z.coerce.boolean().default(false),
        });

        const { content, coverUrl, isPublic } = bodySchema.parse(request.body);

        const memory = await prisma.memory.update({
            data: {
                content,
                coverUrl,
                isPublic,
            },
            where: {
                id,
            },
        });
        return memory;
    });

    app.delete("/memories/:id", async (request) => {
        const paramsSchema = z.object({
            id: z.string().uuid(),
        });

        const { id } = paramsSchema.parse(request.params);

        await prisma.memory.delete({
            where: {
                id,
            },
        });
    });
}
