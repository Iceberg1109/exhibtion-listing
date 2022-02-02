import type { NextPage } from "next";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Exhibition from "../components/Exhibition/Exhibition";
import Layout from "../components/Layout";
import { getExhibtionsByOffset } from "../lib/exhibition";
import styles from "../styles/Home.module.css";
import { ExhibitionInterface } from "../types/exhibition";

interface HomeProps {
  firstExhibtions: ExhibitionInterface[];
}

const Home: NextPage<HomeProps> = ({ firstExhibtions }) => {
  const [exhibitions, setExhibitions] =
    useState<ExhibitionInterface[]>(firstExhibtions);
  const [hasMore, setHasMore] = useState(true);

  const getMoreExhibitions = async () => {
    getExhibtionsByOffset(exhibitions.length)
      .then(({ data, hasMore }) => {
        setExhibitions([...exhibitions, ...data]);
        setHasMore(hasMore);
      })
      .catch((err) => alert("Something went wrong!"));
  };

  return (
    <Layout home>
      <InfiniteScroll
        dataLength={exhibitions.length}
        next={getMoreExhibitions}
        hasMore={hasMore}
        loader={<h3> Loading...</h3>}
        endMessage={<h4>Nothing more to show</h4>}
      >
        <div className={styles.grid}>
          {exhibitions.map((exhibition: ExhibitionInterface) => (
            <Exhibition
              key={exhibition.id}
              title={exhibition.title}
              imageUrl={exhibition.image_url}
              aicStartAt={exhibition.aic_start_at}
              aicEndAt={exhibition.aic_end_at}
              id={exhibition.id}
            />
          ))}
        </div>
      </InfiniteScroll>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data } = await getExhibtionsByOffset(0);
  return {
    props: { firstExhibtions: data },
  };
}

export default Home;
