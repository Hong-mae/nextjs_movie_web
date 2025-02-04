"use client";

import { styled, Rating as MuiRating } from "@mui/material";
import React from "react";

const StyledRating = styled(MuiRating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
  "& .MuiRating-iconEmpty": {
    color: "white",
  },
});

interface RatingProps {
  vote_average: number;
}

const Rating = ({ vote_average }: RatingProps) => {
  return (
    <StyledRating
      name="size-large"
      size="large"
      precision={0.5}
      value={Math.round(vote_average / 2)}
      readOnly
    />
  );
};

export default Rating;
