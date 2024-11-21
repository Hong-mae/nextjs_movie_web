import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from "@mui/material";
import { LibraryBooks } from "@mui/icons-material";
import React, { useState } from "react";

interface Props {
  imgUrl: string;
  title: string;
  overview: string;
  id: number;
}

const ImageCard = ({ imgUrl, title, overview, id }: Props) => {
  const [isEnter, setIsEnter] = useState(false);
  const _onMouseEnter = (e: any) => {
    setIsEnter(true);
  };

  const _onMouseLeave = (e: any) => {
    setIsEnter(false);
  };

  return (
    <Card
      sx={{
        maxWidth: 448,
      }}
      onMouseEnter={_onMouseEnter}
      onMouseLeave={_onMouseLeave}
    >
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
              p: 2,
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
    </Card>
  );
};

export default ImageCard;
