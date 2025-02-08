"use client";

import { useYTDialogStore } from "@/stores/yt-dialog-store-provider";
import { LibraryBooks, PlayArrowRounded } from "@mui/icons-material";
import {
  Box,
  Card as MuiCard,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
} from "@mui/material";
import React, { useState } from "react";

interface CardProps {
  imgUrl: string;
  title: string;
}

interface MovieCardProps extends CardProps {
  overview: string;
  mId: number;
}

export const Card = ({ imgUrl, title, mId }: MovieCardProps) => {
  const [isEnter, setIsEnter] = useState(false);

  const handleMouseEnter = () => {
    setIsEnter(true);
  };

  const handleMouseLeave = () => {
    setIsEnter(false);
  };

  return (
    <MuiCard onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <CardActionArea
        href={`/movie/details/${mId}`}
        sx={{ position: "relative" }}
      >
        <CardMedia image={imgUrl} title={title} component={"img"} />
        {isEnter && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backdropFilter: "blur(2px)",
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              p: 1,
            }}
          >
            <Typography
              variant="h5"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Typography>
            <Box sx={{ position: "absolute", bottom: 0, right: 0, p: 2 }}>
              <Typography
                sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <LibraryBooks fontSize="small" />
                more
              </Typography>
            </Box>
          </Box>
        )}
      </CardActionArea>
    </MuiCard>
  );
};

export const ImageCard = ({ imgUrl, title }: CardProps) => {
  return <Box component={"img"} src={imgUrl} alt={title} loading="lazy" />;
};

interface YoutubeCardProps extends CardProps {
  vId: string;
}

export const YoutubeCard = ({ title, imgUrl, vId }: YoutubeCardProps) => {
  const [isEnter, setIsEnter] = useState(false);
  const { isOpen } = useYTDialogStore((state) => state);

  const handleMouseEnter = () => {
    setIsEnter(true);
  };

  const handleMouseLeave = () => {
    setIsEnter(false);
  };

  const handleOpenDialog = () => {
    isOpen(title, vId, true);
  };

  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleOpenDialog}
      sx={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "100%",
        width: "320px",
        height: "180px",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
    >
      {isEnter && (
        <Box
          width={64}
          height={64}
          sx={{
            borderRadius: "50%",
            bgcolor: "rgba(30,30,30, 0.8)",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <PlayArrowRounded fontSize="large" sx={{ transform: "scale(1.5)" }} />
        </Box>
      )}
    </Box>
  );
};

interface ProfileCardProps extends CardProps {
  character?: string;
}

export const ProfileCard = ({
  imgUrl,
  title: name,
  character,
}: ProfileCardProps) => {
  return (
    <MuiCard sx={{ maxWidth: 138 }}>
      <CardMedia component={"img"} alt={name} image={imgUrl} />
      <CardContent sx={{ p: 1 }}>
        <Typography gutterBottom variant="h6" component={"div"}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {character}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};
