import { Box, Container, Tab, Tabs as MTabs } from "@mui/material";
import React, { ReactNode, SyntheticEvent, useState } from "react";

const tabProps = (v: number) => {
  return {
    id: `tab-${v}`,
    "aria-controls": `tabpanel-${v}`,
    "data-label": v,
  };
};

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const CustomTabPanel = (props: TabPanelProps) => {
  const { children, index, value, ...other } = props;

  return (
    <Box
      role="tabpanel"
      id={`tabpanel-${index}`}
      hidden={value !== index}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      <Box sx={{ py: 2 }}>{children}</Box>
    </Box>
  );
};

interface Props {
  data: object;
}

const Tabs = ({ data }: Props) => {
  const [tabs, setTabs] = useState(0);

  const handleChange = (e: SyntheticEvent, v: number) => {
    setTabs(v);
  };
  return (
    <Container fixed>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <MTabs value={tabs} onChange={handleChange} aria-label="media tabs">
          {Object.entries(data).map(([key, value], i) => {
            return <Tab label={key} {...tabProps(i)} />;
          })}
        </MTabs>
      </Box>
      {Object.entries(data).map(([key, value], i) => {
        if (value.length === 0)
          return (
            <CustomTabPanel value={tabs} index={i}>
              등록된 정보가 없습니다.
            </CustomTabPanel>
          );

        return (
          <CustomTabPanel value={tabs} index={i}>
            {value.toString()}
          </CustomTabPanel>
        );
      })}
      {/* {data.keys.map((e: string, i: number) => {
        // e가 포스터, 배경일 경우 이미지 리스트
        // e가 비디오 일 경우 유튜브 리스트
        return (
          <CustomTabPanel value={tabs} index={i}>
            {e}
          </CustomTabPanel>
        );
      })} */}
    </Container>
  );
};

export default Tabs;
