import { useAuthStore } from "@/stores/auth/authStore";
import { AccountCircle } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React from "react";

const AccountIcon = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <IconButton
      size="large"
      aria-label="account"
      sx={{ color: "white" }}
      href={user ? "/my" : "/sign-in"}
    >
      {user == null ? (
        <AccountCircle fontSize="inherit" />
      ) : (
        <Avatar
          alt={user.email}
          src={user.profileUrl}
          sx={{ width: 28, height: 28 }}
        />
      )}
    </IconButton>
  );
};

export default AccountIcon;
