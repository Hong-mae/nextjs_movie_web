"use client";

import { useYTDialogStore } from "@/stores/YoutubeDialogStore/provider";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Dialog as MuiDialog,
  styled,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import * as LocalStorage from "@/utils/localStorage";
import dayjs, { ManipulateType } from "dayjs";

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

interface AlertDialogProps {
  title: string;
  content: string;
  expires?: {
    value: number;
    type: ManipulateType; // d: day(date), m: month, y: year
  };
}

export const AlertDialog = ({
  title,
  content,
  expires = { value: 1, type: "d" },
}: AlertDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleClickNoShow = () => {
    const expDate = dayjs().add(expires.value, expires.type).toString();
    LocalStorage.setItem("WM_DIALOG_CHECK", expDate);
    setOpen(false);
  };

  useEffect(() => {
    if (
      LocalStorage.getItem("WM_DIALOG_CHECK") &&
      !dayjs().isAfter(LocalStorage.getItem("WM_DIALOG_CHECK")) // 스토리지에 값이 있고, 만료되지 않았으면 안열고
    ) {
      setOpen(false);
    } else {
      // 스토리지에 값이 없거나 만료되었으면 보여준다
      LocalStorage.removeItem("WM_DIALOG_CHECK"); // 혹시 모를 오류를 방지하기 위해 스토리지 삭제
      setOpen(true);
    }
  }, []);

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-content"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-content">
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleClickNoShow}>
          이해 했습니다
        </Button>
      </DialogActions>
    </Dialog>
  );
};
