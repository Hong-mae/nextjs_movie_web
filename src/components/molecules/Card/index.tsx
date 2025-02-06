"use client";

import { LibraryBooks } from "@mui/icons-material";
import {
  Box,
  Card as MuiCard,
  CardActionArea,
  CardMedia,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface CardProps {
  imgUrl: string;
  title: string;
  overview: string;
  id: number;
}

export const Card = ({ imgUrl, title, id }: CardProps) => {
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
        href={`/movie/details/${id}`}
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

interface ImageCardProps {
  name?: string;
  src: string;
}

export const ImageCard = ({ name, src }: ImageCardProps) => {
  return <Box component={"img"} src={src} alt={name} loading="eager" />;
};
