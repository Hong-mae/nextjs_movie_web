import { getMovieInfo } from "@/utils/tmdbController";
import { convertImageURL, convertThumbnailURL } from "@/utils/urlController";
import { notFound } from "next/navigation";
import React from "react";
import TmdbStatus from "@/utils/data.json";
import Rating from "@/components/molecules/Rating";
import { Metadata, ResolvingMetadata } from "next";
import { Box, Container, Stack, Typography } from "@mui/material";
import HashTag from "@/components/molecules/HashTag";
import Tabs from "@/components/molecules/Tabs";
import { YoutubeDialog } from "@/components/molecules/Dialog";
import Section from "@/components/molecules/Section";
import { ProfileImgList } from "@/components/molecules/ImageList";

type MetadataProps = {
  params: Promise<{ slug: string }>;
};

export const generateMetadata = async (
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const mId = (await params).slug;

  const info = await getMovieInfo(mId);
  const og = await convertImageURL(info.backdrop_path, 300);
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${info.title} | Watch Movie`,
    description: info.overview,
    openGraph: {
      images: [og, ...previousImages],
    },
  };
};

export const dynamic = "force-static";
export const dynamicParams = true;

export const generateStaticParams = () => {
  return [];
};

interface GetMovieInfoProps {
  mId: string | number;
}

interface DetailsProps {
  params: Promise<{ slug: number }>;
}

const getInfo = async ({ mId }: GetMovieInfoProps) => {
  const info = await getMovieInfo(mId, ["videos", "images", "credits"], false);

  const videos = info.videos.results
    .filter((e: any, i: number) => e.site.toLowerCase() === "youtube")
    .map((e: any) => {
      return {
        ...e,
        src: convertThumbnailURL({
          vId: e.key,
          quality: "mqdefault",
        }),
      };
    });

  let { backdrops, posters } = info.images;
  backdrops = backdrops.map((e: any) => {
    return {
      ...e,
      src: convertImageURL(e.file_path, 300),
    };
  });
  posters = posters.map((e: any) => {
    return {
      ...e,
      src: convertImageURL(e.file_path, 185),
    };
  });

  let { cast } = info.credits;

  cast = cast.map((e: any) => {
    return {
      ...e,
      src: convertImageURL(e.profile_path, 185),
    };
  });

  delete info.images;
  delete info.videos;
  delete info.credits;

  return { ...info, videos, backdrops, posters, cast };
};

const Details = async ({ params }: DetailsProps) => {
  const mId = (await params).slug;
  const {
    poster_path,
    backdrop_path,
    title,
    tagline,
    overview,
    genres,
    release_date,
    vote_average,
    status,
    videos,
    backdrops,
    posters,
    cast,
  } = await getInfo({ mId });

  const mainPoster = convertImageURL(poster_path, 300);
  const backdrop = convertImageURL(backdrop_path, "original");

  const movieStatus: any = TmdbStatus.movie.status;

  if (isNaN(mId)) notFound();

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${backdrop})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            py: 2,
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
          }}
        >
          <Container maxWidth="xl">
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Box
                flexGrow={1}
                sx={{
                  "& > img": {
                    display: "block",
                    width: {
                      xs: "100%",
                      md: "400px",
                    },
                  },
                }}
              >
                <Box component={"img"} src={mainPoster} />
              </Box>
              <Box flexGrow={2}>
                <Stack
                  direction={"column"}
                  spacing={2}
                  height={"100%"}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box flex={2}>
                    <Typography variant="h2" fontWeight={"bold"}>
                      {title}
                    </Typography>
                    <Typography variant="subtitle1">{tagline}</Typography>
                  </Box>
                  <Box flex={8}>
                    <Typography variant="subtitle2">{overview}</Typography>
                  </Box>
                  <Box flex={1}>
                    <HashTag genres={genres} />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="subtitle2">
                      {release_date} / {movieStatus[status]}
                    </Typography>
                    <Rating vote_average={vote_average} />
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Box>

      <Container maxWidth="xl">
        <Section>
          <Typography variant="h6" fontWeight={"bold"}>
            미디어
          </Typography>
          <Tabs videos={videos} backdrops={backdrops} posters={posters} />
        </Section>
        <Section>
          <Typography variant="h6" fontWeight={"bold"}>
            주요 출연진
          </Typography>
          <ProfileImgList list={cast} width="138px" />
        </Section>
      </Container>

      <YoutubeDialog />
    </>
  );
};

export default Details;
