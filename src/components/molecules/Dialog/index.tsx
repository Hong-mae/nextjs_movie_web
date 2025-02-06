"use client";

import { useYTDialogStore } from "@/stores/yt-dialog-store-provider";
import {
  DialogContent,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  styled,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import React from "react";
import ReactPlayer from "react-player";

export const Dialog = () => {
  return <div>Dialog</div>;
};

const StyledYoutubeDialog = styled(MuiDialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: 0,
    height: "90vh",
  },
}));

export const YoutubeDialog = () => {
  const { title, vId, open, Close } = useYTDialogStore((state) => state);

  const handleClose = () => {
    Close();
  };
  return (
    <StyledYoutubeDialog
      open={open}
      onClick={handleClose}
      aria-labelledby="youtube-dialog-title"
      fullWidth={true}
      maxWidth="xl"
    >
      {/* <div>
        title: {title} vId: {vId} open: {open ? "open" : "close"}
      </div> */}
      <DialogTitle sx={{ m: 0, p: 2 }} id="youtube-dialog-title">
        {title}
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        {/* <YouTube
          videoId={vId}
          opts={{
            width: "100%",

            playerVars: {
              autoplay: 0, //자동재생 O
              rel: 0, //관련 동영상 표시하지 않음 (근데 별로 쓸모 없는듯..)
              modestbranding: 1, // 컨트롤 바에 youtube 로고를 표시하지 않음
            },
          }}
          onEnd={(e) => {
            e.target.stopVideo(0);
          }}
        /> */}
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${vId}`}
          width={"100%"}
          height={"100%"}
        />
      </DialogContent>
    </StyledYoutubeDialog>
  );
};
