import Head from "next/head";
import Link from "next/link";

import styles from "./layout.module.css";

const Layout = ({
  children,
  home = false,
}: {
  children: any;
  home?: boolean;
}) => {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Views Exhibition Assessment" />
        <meta name="og:title" content="Exhibition" />
      </Head>
      <header>
        <div className={styles.pageTitle}>
          <h2>Exhibitions!</h2>
        </div>
        {!home && (
          <Link href="/">
            <a>&#8592;Back to home</a>
          </Link>
        )}
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};

export default Layout;
