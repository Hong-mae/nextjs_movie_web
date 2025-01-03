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
import dayjs, { ManipulateType } from "dayjs";

interface Props {
  title: string;
  content: string;
  expires?: {
    value: number;
    type: ManipulateType; // d: day(date), m: month, y: year
  };
}

const AlertDialog = ({
  title,
  content,
  expires = { value: 1, type: "d" },
}: Props) => {
  const [open, setOpen] = useState(false);
  const [isNoShow, setIsNoShow] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

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
      // onClose={handleClose}
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
