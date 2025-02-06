import { convertThumbnailURL } from "@/utils/urlController";
import { Box, ImageListItem, ImageList as MuiImageList } from "@mui/material";
import React from "react";
import { ImageCard, YoutubeCard } from "../Card";

interface ImageListProps {
  list: ReadonlyArray<ImageProps>;
  width?: string;
}

const ImageList = ({ list, width = "auto" }: ImageListProps) => {
  return (
    <MuiImageList
      key={`${list.length}_${width}`}
      sx={{
        gridAutoFlow: "column",
        gridTemplateColumns: `repeat(auto-fill, ${width}) !important`,
        margin: 0,
      }}
    >
      {list.map((e, i) => {
        if (e.site) {
          return (
            <ImageListItem key={e.name} sx={{ width: width }}>
              <YoutubeCard name={e.name} src={e.src} vId={e.key} />
            </ImageListItem>
          );
        }
        return (
          <ImageListItem key={e.name} sx={{ width: width }}>
            <ImageCard name={e.name} src={e.src} />
          </ImageListItem>
        );
      })}
    </MuiImageList>
  );
};

export default ImageList;
