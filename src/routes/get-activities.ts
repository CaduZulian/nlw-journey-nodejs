import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { dayjs, prisma } from "../lib";
import { ClientError } from "../errors/client-error";

export async function getActivities(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    "/trips/:tripId/activities",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params;

      const trip = await prisma.trip.findUnique({
        where: { id: tripId },
        include: {
          activities: {
            orderBy: { occurs_at: "asc" },
          },
        },
      });

      if (!trip) {
        throw new ClientError("Trip not found");
      }

      const differenceInDaysBetweenTripStartAndEnd = dayjs(trip.ends_at).diff(
        dayjs(trip.starts_at),
        "days",
      );

      const activities = Array.from({
        length: differenceInDaysBetweenTripStartAndEnd + 1,
      }).map((_, index) => {
        const date = dayjs(trip.starts_at).add(index, "days").toDate();

        return {
          date,
          activities: trip.activities.filter((activity) =>
            dayjs(activity.occurs_at).isSame(date, "day"),
          ),
        };
      });

      return { activities };
    },
  );
}
