import crypto from "crypto";

import DATA from "./db/dataset.json";
import {Flight, Trip} from "./types";

const api = {
  trips: {
    list: async (origin: Flight["origin"]): Promise<Trip[]> => {
      const [origins, destinations] = DATA.reduce<[Flight[], Flight[]]>(
        ([origins, destinations], flight) => {
          if (flight.origin === origin) {
            origins.push(flight);
          } else if (flight.destination === origin) {
            destinations.push(flight);
          }

          return [origins, destinations];
        },
        [[], []],
      );

      const trips: Trip[] = [];

      for (let origin of origins) {
        for (let destination of destinations) {
          const days = Math.ceil(
            (+new Date(destination.date) - +new Date(origin.date)) / (1000 * 60 * 60 * 24),
          );

          trips.push({
            id: crypto.randomUUID(),
            days,
            destination,
            origin,
            availability: Math.min(origin.availability, destination.availability),
            price: origin.price + destination.price,
          });
        }
      }

      return trips;
    },
  },
  origin: {
    list: async (): Promise<Flight["origin"][]> => {
      const origins = new Set<Flight["origin"]>();

      for (let flight of DATA) {
        origins.add(flight.origin);
      }

      return Array.from(origins);
    },
  },
};

export default api;
