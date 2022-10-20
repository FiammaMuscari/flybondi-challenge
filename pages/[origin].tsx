import type {Trip} from "../types";

import {ParsedUrlQuery} from "querystring";

import {GetStaticPaths, GetStaticProps} from "next";
import React, {useMemo, useState} from "react";

import styles from "../styles/App.module.css";
import api from "../api";

type Props = {
  trips: Trip[];
};

type Params = ParsedUrlQuery & {
  origin: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({params}) => {
  const trips = await api.trips.list(params?.origin!);

  trips.sort((a, b) => a.price - b.price);

  return {
    props: {
      trips: trips.slice(0, 100),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {paths: [], fallback: "blocking"};
};

const OriginPage: React.FC<Props> = ({trips}) => {
  const [sort, setSort] = useState<"price" | "days">("price");
  const [page, setPage] = useState<number>(10);
  const matches = useMemo(() => {
    const draft = [...trips];

    return draft.sort((a, b) => a[sort] - b[sort]).slice(0, page);
  }, [sort, trips, page]);

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Destino</td>
            <td
              style={{cursor: "pointer", color: sort === "days" ? "#e1b531" : "inherit"}}
              onClick={() => setSort("days")}
            >
              Días
            </td>
            <td
              style={{cursor: "pointer", color: sort === "price" ? "#e1b531" : "inherit"}}
              onClick={() => setSort("price")}
            >
              Precio
            </td>
          </tr>
        </thead>
        <tbody>
          {matches.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.origin.destination}</td>
              <td>{trip.days}</td>
              <td>
                {Number(trip.price).toLocaleString("es-AR", {style: "currency", currency: "ARS"})}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {trips.length > page && (
        <button onClick={() => setPage((page) => page + 10)}>Cargar más</button>
      )}
    </>
  );
};

export default OriginPage;
