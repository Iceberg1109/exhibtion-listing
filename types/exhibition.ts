export interface ExhibitionInterface {
  id: string;
  title: string;
  aic_start_at: Date;
  aic_end_at: Date;
  image_url: string | null;
  description?: string;
}
