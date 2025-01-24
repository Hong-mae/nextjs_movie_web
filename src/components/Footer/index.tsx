import React from "react";
import Copyright from "./Copyright";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Copyright />
    </Box>
  );
};

export default Footer;
