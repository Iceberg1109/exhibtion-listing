import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
  NextPage,
} from "next";
import Image from "next/image";
import Layout from "../../components/Layout";
import { IMG_UNAVAILABLE } from "../../config/config";
import { getExhibitionDetail } from "../../lib/exhibition";
import { ExhibitionInterface } from "../../types/exhibition";
interface ExhibitionDetailProps {
  exhibition: ExhibitionInterface;
}

type Params = {
  id: string;
};

const ExhibitionDetail: NextPage<ExhibitionDetailProps> = ({ exhibition }) => {
  return (
    <Layout>
      <div>
        <Image
          src={exhibition?.image_url || IMG_UNAVAILABLE}
          alt="exhibition preview image"
          width="300"
          height="300"
        />
        <h5>{exhibition?.title}</h5>
        <span>
          {exhibition?.aic_start_at
            ? new Date(exhibition?.aic_start_at).toDateString()
            : "N/A"}{" "}
          -{" "}
        </span>
        <span>
          {exhibition?.aic_end_at
            ? new Date(exhibition?.aic_end_at).toDateString()
            : "N/A"}
        </span>
        <p>{exhibition?.description}</p>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(
  context: GetServerSidePropsContext<Params>
): Promise<GetServerSidePropsResult<ExhibitionDetailProps>> {
  if (!context?.params?.id) {
    return {
      notFound: true,
    };
  }
  try {
    const data = await getExhibitionDetail(context?.params?.id);
    return {
      props: { exhibition: data },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
}

export default ExhibitionDetail;
