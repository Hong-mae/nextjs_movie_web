import { Box } from "@mui/material";
import React, { ComponentProps } from "react";

interface SectionProps {
  children: React.ReactNode;
}

const Section = ({ children }: SectionProps) => {
  return (
    <Box component={"section"} sx={{ my: 2 }}>
      {children}
    </Box>
  );
};

export default Section;
