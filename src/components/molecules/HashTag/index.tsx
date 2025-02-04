import { Chip, Stack } from "@mui/material";
import React from "react";

interface HashTagProps {
  genres: ReadonlyArray<genresObj>;
}

const HashTag = ({ genres }: HashTagProps) => {
  return (
    <Stack direction={"row"} spacing={1}>
      {genres.map((e: genresObj, i: number) => {
        return (
          <Chip
            key={i}
            label={`#${e.name}`}
            variant="outlined"
            sx={{
              color: "white",
            }}
            clickable
          />
        );
      })}
    </Stack>
  );
};

export default HashTag;
