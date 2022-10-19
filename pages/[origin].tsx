import type {Trip} from "../types";

import {ParsedUrlQuery} from "querystring";

import {GetStaticPaths, GetStaticProps} from "next";
import React from "react";

import api from "../api";

type Props = {
  trips: Trip[];
};

type Params = ParsedUrlQuery & {
  origin: string;
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({params}) => {
  const trips = await api.trips.list(params?.origin!);

  return {
    props: {
      trips,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {paths: [], fallback: "blocking"};
};

const OriginPage: React.FC<Props> = ({trips}) => {
  console.log(trips);

  return <div>{`<OriginPage />`}</div>;
};

export default OriginPage;
