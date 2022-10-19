import "../styles/globals.css";

import type {AppProps} from "next/app";

import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

import styles from "../styles/App.module.css";

function App({Component, pageProps}: AppProps) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta content="Generated by create next app" name="description" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Bienvenido a{" "}
          <Link href="https://flybondi.com/">
            <a target="_blank">FlyBondi!</a>
          </Link>
        </h1>

        <p className={styles.description}>Encuentra vuelos baratos desde tu origen</p>

        <Component {...pageProps} />
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          rel="noopener noreferrer"
          target="_blank"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image alt="Vercel Logo" height={16} src="/vercel.svg" width={72} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export default App;
