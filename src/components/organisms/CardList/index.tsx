import { Container, Grid2 as Grid } from "@mui/material";
import React, { useMemo } from "react";
import Card from "../Card";

interface Props {
  list: ReadonlyArray<any>;
}

const CardList = ({ list }: Props) => {
  return (
    <Container sx={{ flexGrow: 1 }}>
      <Grid container spacing={4} columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}>
        {list.map((e, i) => {
          return (
            <Grid key={i} size={1} data-id={e.id}>
              <Card {...e} />
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default CardList;
