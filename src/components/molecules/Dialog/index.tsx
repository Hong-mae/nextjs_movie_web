"use client";

import { useYTDialogStore } from "@/stores/YoutubeDialogStore/provider";
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
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${vId}`}
          width={"100%"}
          height={"100%"}
        />
      </DialogContent>
    </StyledYoutubeDialog>
  );
};
