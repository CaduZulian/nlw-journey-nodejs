import fastify from "fastify";
import cors from "@fastify/cors";
import {
  confirmParticipant,
  confirmTrip,
  createActivity,
  createLink,
  createTrip,
  getActivities,
  getLinks,
} from "./routes";
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
app.register(createActivity);
app.register(createLink);
app.register(confirmTrip);
app.register(confirmParticipant);
app.register(getActivities);
app.register(getLinks);

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
