import fastify from "fastify";
import cors from "@fastify/cors";
import { createTrip } from "./routes";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(createTrip);

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
