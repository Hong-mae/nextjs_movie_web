import { convertThumbnailURL } from "@/utils/urlController";
import {
  Box,
  ImageListItem,
  ImageList as MuiImageList,
  Typography,
} from "@mui/material";
import React from "react";
import { ImageCard, ProfileCard, YoutubeCard } from "../Card";

interface ImageListProps {
  children: React.ReactElement[];
}

interface CustomImgListProps extends ImageListProps {
  width: string;
}

const CustomImageList = ({ children, width, ...other }: CustomImgListProps) => {
  return (
    <MuiImageList
      sx={{
        gridAutoFlow: "column",
        gridTemplateColumns: `repeat(auto-fill, ${width}) !important`,
        margin: 0,
      }}
      {...other}
    >
      {children}
    </MuiImageList>
  );
};

interface BasicImgListProps {
  list: ReadonlyArray<ImageProps>;
  width?: string;
}

export const BasicImgList = ({ list, width = "auto" }: BasicImgListProps) => {
  return list.length !== 0 ? (
    <CustomImageList width={width}>
      {list.map((e, i) => {
        return (
          <ImageListItem key={i} sx={{ width: width }}>
            <ImageCard title={e.name} imgUrl={e.src} />
          </ImageListItem>
        );
      })}
    </CustomImageList>
  ) : (
    <Typography variant="body1">등록된 정보가 없습니다.</Typography>
  );
};

export const YoutubeImgList = ({ list, width = "auto" }: BasicImgListProps) => {
  return list.length !== 0 ? (
    <CustomImageList width={width}>
      {list.map((e, i) => {
        return (
          <ImageListItem key={i} sx={{ width: width }}>
            <YoutubeCard title={e.name} imgUrl={e.src} vId={e.key} />
          </ImageListItem>
        );
      })}
    </CustomImageList>
  ) : (
    <Typography variant="body1">등록된 정보가 없습니다.</Typography>
  );
};

export const ProfileImgList = ({
  list,
  width = "138px",
}: BasicImgListProps) => {
  return list.length !== 0 ? (
    <CustomImageList width={width}>
      {list.map((e, i) => {
        return (
          <ImageListItem key={i} sx={{ width: width }}>
            <ProfileCard
              title={e.name}
              imgUrl={e.src}
              character={e.character}
            />
          </ImageListItem>
        );
      })}
    </CustomImageList>
  ) : (
    <Typography variant="body1">등록된 정보가 없습니다.</Typography>
  );
};
