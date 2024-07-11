import fastify from "fastify";
import cors from "@fastify/cors";
import {
  confirmParticipant,
  confirmTrip,
  createActivity,
  createInvite,
  createLink,
  createTrip,
  getActivities,
  getLinks,
  getParticipant,
  getParticipants,
  getTripDetails,
  updateTrip,
} from "./routes";
import {
  validatorCompiler,
  serializerCompiler,
} from "fastify-type-provider-zod";
import { errorHandler } from "./error-handler";
import { env } from "./env";

const app = fastify();

app.register(cors, {
  origin: "*",
});

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.setErrorHandler(errorHandler);

app.register(createTrip);
app.register(createActivity);
app.register(createLink);
app.register(createInvite);
app.register(confirmTrip);
app.register(confirmParticipant);
app.register(getActivities);
app.register(getLinks);
app.register(getParticipants);
app.register(getParticipant);
app.register(getTripDetails);
app.register(updateTrip);

app.listen({ port: env.PORT }).then(() => {
  console.log("Server is running on port 3333");
});
