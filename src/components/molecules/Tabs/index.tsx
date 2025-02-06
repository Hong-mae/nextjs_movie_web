"use client";

import { Box, Tabs as MuiTabs, Tab } from "@mui/material";
import React, { useState } from "react";
import ImageList from "../ImageList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = ({
  children,
  value,
  index,
  ...other
}: TabPanelProps) => {
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      minHeight={"180px"}
      my={2}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tablpanel-${index}`,
  };
};

interface TabsProps {
  videos: ReadonlyArray<any>;
  posters: ReadonlyArray<any>;
  backdrops: ReadonlyArray<any>;
}

const Tabs = ({ videos, posters, backdrops }: TabsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (e: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MuiTabs value={value} onChange={handleChange} aria-label="Media Tabs">
          <Tab
            label={`Videos ${videos.length}`}
            sx={{ textTransform: "none" }}
            {...a11yProps(0)}
          />
          <Tab
            label={`Backdrops ${backdrops.length}`}
            sx={{ textTransform: "none" }}
            {...a11yProps(1)}
          />
          <Tab
            label={`Posters ${posters.length}`}
            sx={{ textTransform: "none" }}
            {...a11yProps(2)}
          />
        </MuiTabs>
        <CustomTabPanel value={value} index={0}>
          {videos.length === 0 ? (
            "등록된 정보가 없습니다."
          ) : (
            <ImageList list={videos} width="320px" />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {backdrops.length === 0 ? (
            "등록된 정보가 없습니다."
          ) : (
            <ImageList list={backdrops} width="300px" />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {posters.length === 0 ? (
            "등록된 정보가 없습니다."
          ) : (
            <ImageList list={posters} width="158px" />
          )}
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default Tabs;
