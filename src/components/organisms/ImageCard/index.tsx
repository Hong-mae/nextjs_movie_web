import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import React from "react";

interface Props {
  imgUrl: string;
  title: string;
}

const ImageCard = ({ imgUrl, title }: Props) => {
  return (
    <Card sx={{ maxWidth: 448 }}>
      <CardActionArea>
        <CardMedia image={imgUrl} title={title} component={"img"} />
      </CardActionArea>
    </Card>
  );
};

export default ImageCard;
