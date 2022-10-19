import type {GetStaticProps, NextPage} from "next";

import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import api from "../api";
import styles from "../styles/App.module.css";
import {Flight} from "../types";

type Props = {
  origins: Flight["origin"][];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const origins = await api.origin.list();

  return {
    props: {
      origins,
    },
  };
};

const Home: NextPage<Props> = ({origins}) => {
  return (
    <div className={styles.grid}>
      {origins.map((origin) => (
        <Link key={origin} href={`/${origin}`}>
          <a className={styles.card}>
            {origin} {">"}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Home;
