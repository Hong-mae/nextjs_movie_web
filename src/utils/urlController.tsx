const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;

export const convertURL = (targetURL: string, params: any) => {
  const url = new URL(targetURL);
  url.search = new URLSearchParams(params).toString();

  return url;
};

export const convertImageURL = (target: string, size: number | string) => {
  if (target === null || target === undefined) {
    return "/no_image.png";
  }
  return `${TMDB_IMAGE_URL}/${
    typeof size === "number" ? `w${size}` : `${size}`
  }${target}`;
};

export const convertThumbnailURL = (
  vId: string,
  quality: string = "default"
) => {
  return `https://img.youtube.com/vi/${vId}/${quality}.jpg`;
};
