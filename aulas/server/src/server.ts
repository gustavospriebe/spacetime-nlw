import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import "dotenv/config";
import fastify from "fastify";
import { authRoutes } from "./routes/auth";
import { memoriesRoutes } from "./routes/memories";

const app = fastify();

app.register(memoriesRoutes);
app.register(cors, { origin: true });
app.register(authRoutes);
app.register(jwt, { secret: "spacetime" });

app.listen({
    port: 3333,
    // host: "0.0.0.0",
}).then(() => {
    console.log("listening on port http://localhost:3333 🤣");
});
