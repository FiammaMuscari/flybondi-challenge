import DATA from './db/dataset.json'

import { Flight, Trip } from "./types"

const api = {
    trips:{
        list: async (origin: Flight['origin']): Promise<Trip[]> =>{
            return []
        },
    },
    origin:{
        list: async () : Promise<Flight['origin'][]> =>{

            const origins = new Set<Flight['origin']>()

            for (let flight of DATA) {
                origins.add(flight.origin)
            }

            return Array.from(origins)
        }
    }
}

export default api