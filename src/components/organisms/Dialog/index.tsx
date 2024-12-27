import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import * as LocalStorage from "@/utils/localStorage";

interface Props {
  title: string;
  content: string;
}

const AlertDialog = ({ title, content }: Props) => {
  const [open, setOpen] = useState(false);
  const [isNoShow, setIsNoShow] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickNoShow = () => {
    LocalStorage.setItem("WM_DIALOG_CHECK", "1");
    setOpen(false);
  };

  useEffect(() => {
    if (LocalStorage.getItem("WM_DIALOG_CHECK")) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, []);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-title"
      aria-describedby="alert-description"
    >
      <DialogTitle id="alert-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-description">{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClickNoShow}>오늘 하루 안보기</Button>
        <Button variant="contained" onClick={handleClose}>
          이해했습니다
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
