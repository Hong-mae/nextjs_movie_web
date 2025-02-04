"use client";

import React, { ReactElement } from "react";
import { useScrollTrigger } from "@mui/material";

interface ElevationScrollProps {
  children: ReactElement<any>;
}

const ElevationScroll: React.FC<ElevationScrollProps> = ({ children }) => {
  const bgColorBefore = "transparent";
  const bgColorAfter = "#303030";
  const fadeIn = "0.2s ease-in";
  const fadeOut = "0.2s ease-out";
  const paddingBefore = "1.5rem";
  const paddingAfter = "0";

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: 0,
    style: {
      color: "red",
      transition: trigger ? fadeIn : fadeOut,
      padding: trigger ? `${paddingAfter} 0` : `${paddingBefore} 0`,
      backgroundColor: trigger ? bgColorAfter : bgColorBefore,
      backgroundImage: "linear-gradient(180deg, rgba(48,48,48,1), transparent)",
    },
  });
};

export default ElevationScroll;
