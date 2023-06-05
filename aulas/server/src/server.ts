import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import multipart from "@fastify/multipart";
import "dotenv/config";
import fastify from "fastify";
import { resolve } from "node:path";
import { authRoutes } from "./routes/auth";
import { memoriesRoutes } from "./routes/memories";
import { uploadRoutes } from "./routes/upload";

const app = fastify();

app.register(require("@fastify/static"), {
    root: resolve(__dirname, "../uploads"),
    prefix: "/uploads",
});
app.register(memoriesRoutes);
app.register(multipart);
app.register(cors, { origin: true });
app.register(authRoutes);
app.register(uploadRoutes);
app.register(jwt, { secret: "spacetime" });

app.listen({
    port: 3333,
    host: "0.0.0.0",
}).then(() => {
    console.log("listening on port http://localhost:3333 🤣");
});
