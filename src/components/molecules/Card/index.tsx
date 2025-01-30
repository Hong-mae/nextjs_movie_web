"use client";

import { Card, CardActionArea, CardMedia } from "@mui/material";
import React, { useState } from "react";

interface CardProps {
  imgUrl: string;
  title: string;
  overview: string;
  id: number;
}

export const SimpleCard = ({ imgUrl, title, id }: CardProps) => {
  const [isEnter, setIsEnter] = useState(false);

  const handleMouseEnter = () => {
    setIsEnter(true);
  };

  const handleMouseLeave = () => {
    setIsEnter(false);
  };

  return (
    <Card
      sx={{
        mr: 1,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardActionArea
        href={`/movie/details/${id}`}
        sx={{ position: "relative" }}
      >
        <CardMedia image={imgUrl} title={title} component={"img"} />
      </CardActionArea>
    </Card>
  );
};

export const BasicCard = () => {
  return <div>SimpleCard</div>;
};
