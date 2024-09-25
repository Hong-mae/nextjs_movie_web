import React from "react";
import {
  Button,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Card as MCard,
  Typography,
  CardMediaProps,
  styled,
} from "@mui/material";
import { getImageUrl } from "@/utils/tmdbController";

interface Props {
  poster_path?: string;
  title?: string;
  overview?: string;
}

const CustomCardMedia = styled(CardMedia)<CardMediaProps>(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    backgroundColor: "#ff0",
  },
  [theme.breakpoints.up("sm")]: {
    backgroundColor: "#f00",
  },
  [theme.breakpoints.up("md")]: {
    backgroundColor: "#0f0", // 425px
  },
  [theme.breakpoints.up("lg")]: {
    backgroundColor: "#00f",
  },
}));

const Card = (props: Props) => {
  const { title, overview, poster_path = "/no_img.png" } = props;
  const moviePoster = getImageUrl(poster_path, 342);

  return (
    <MCard
      sx={{
        bgcolor: "#dedede",
        boxShadow: "1px 2px 5px 0px",
      }}
    >
      <CardActionArea sx={{ p: 2 }}>
        <CustomCardMedia
          component="img"
          image={moviePoster}
          sx={{
            borderRadius: "5px",
            height: "340px",
            objectFit: "cover",
          }}
        />
        <CardContent sx={{ px: 0, py: 2 }}>
          <Typography
            gutterBottom
            variant="h5"
            sx={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
          >
            {overview}
          </Typography>
        </CardContent>
      </CardActionArea>
    </MCard>
  );
};

export default Card;
