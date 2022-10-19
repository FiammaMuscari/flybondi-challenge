import type {Trip} from "../types";

import {ParsedUrlQuery} from "querystring";

import {GetStaticPaths, GetStaticProps} from "next";
import React from "react";
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
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <td>Destino</td>
          <td>Días</td>
          <td>Precio</td>
        </tr>
      </thead>
      <tbody>
        {trips.map((trip) => (
          <tr key={trip.id}>
            <td>{trip.origin.destination}</td>
            <td>{trip.days}</td>
            <td>{trip.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OriginPage;
