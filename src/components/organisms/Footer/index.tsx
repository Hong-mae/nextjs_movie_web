import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backgroundColor: "rgba(45,45,45,1)",
        color: "white",
      }}
    >
      <Typography variant="body1">
        © 2023, Park Han Bin. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
