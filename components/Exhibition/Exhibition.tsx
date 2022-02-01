import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { IMG_UNAVAILABLE } from "../../config/config";
import styles from "./exhibition.module.css";

interface ExhibitionProps {
  title: string;
  aicStartAt: Date | null;
  aicEndAt: Date | null;
  imageUrl: string | null;
  id: string;
}

const Exhibition: NextPage<ExhibitionProps> = ({
  title,
  aicStartAt,
  aicEndAt,
  imageUrl,
  id,
}) => (
  <Link href={`/exhibition/${id}`} passHref>
    <div className={styles.container}>
      <Image
        src={imageUrl || IMG_UNAVAILABLE}
        alt="exhibition preview image"
        width="300"
        height="300"
      />
      <h5>{title}</h5>
      <span>{aicStartAt ? new Date(aicStartAt).toDateString() : "N/A"} - </span>
      <span>{aicEndAt ? new Date(aicEndAt).toDateString() : "N/A"}</span>
    </div>
  </Link>
);

export default Exhibition;
