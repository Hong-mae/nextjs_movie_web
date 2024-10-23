import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";
import React, { useState } from "react";

interface Props {
  imgUrl: string;
  title: string;
}

const ImageCard = ({ imgUrl, title }: Props) => {
  const [isEnter, setIsEnter] = useState(false);
  const _onMouseEnter = (e: any) => {
    console.log("Enter", e.target.title);
    setIsEnter(true);
  };

  const _onMouseLeave = (e: any) => {
    console.log("Leave", e.target.title);
    setIsEnter(false);
  };

  return (
    <Card
      sx={{ maxWidth: 448 }}
      onMouseEnter={_onMouseEnter}
      onMouseLeave={_onMouseLeave}
    >
      <CardActionArea>
        <CardMedia image={imgUrl} title={title} component={"img"} />
      </CardActionArea>
    </Card>
  );
};

export default ImageCard;
