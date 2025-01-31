import ModeSwitch from "@/components/molecules/ModeSwitch";
import {
  AccountCircle,
  Inbox,
  Mail,
  MovieFilter,
  Settings,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import React, { useState } from "react";

const navItems = [
  {
    title: "상영 중",
    href: "/movie/now_playing",
  },
  {
    title: "인기 영화",
    href: "/movie/popular",
  },
  {
    title: "최고 평점",
    href: "/movie/top_rated",
  },
  {
    title: "개봉 임박",
    href: "/movie/upcoming",
  },
];
const settings = ["내 정보", "Logout"];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  const DrawerList = (
    <Box
      sx={{ width: 300, bgcolor: "#303030", color: "white", height: "100%" }}
      role="presentation"
      // onClick={toggleDrawer}
    >
      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <Inbox /> : <Mail />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem>
          <ModeSwitch />
        </ListItem>
      </List>
    </Box>
  );
  return (
    <AppBar component={"nav"} sx={{ bgcolor: "#303030" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <IconButton
              size="large"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "white",
              }}
              aria-label="logo"
            >
              <MovieFilter fontSize="inherit" />
            </IconButton>
          </Link>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Link
                variant="button"
                key={item.title}
                href={item.href}
                underline="none"
              >
                <Button sx={{ color: "white" }}>{item.title}</Button>
              </Link>
            ))}
            <IconButton
              size="large"
              aria-label="account"
              sx={{ color: "white" }}
            >
              <AccountCircle fontSize="inherit" />
            </IconButton>
            <IconButton
              size="large"
              aria-label="settings"
              sx={{ color: "white" }}
              onClick={toggleDrawer}
            >
              <Settings fontSize="inherit" />
            </IconButton>
            <Drawer open={open} onClose={toggleDrawer} anchor="right">
              {DrawerList}
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
