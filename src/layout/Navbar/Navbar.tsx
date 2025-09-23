import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { NavLink, useNavigate } from "react-router-dom";
import { Badge, Divider, Stack, Typography } from "@mui/material";
import { COLORS } from "@muc/constants";
import {
  Favorite,

  HomeOutlined,
  Mail,
  MessageOutlined,
  PhotoLibraryOutlined,
} from "@mui/icons-material";
import { AccountMenu, LoginDialogBox } from "@muc/components";
import { useAuth } from "@muc/context";


const drawerWidth = 320;

const navItems = [
  {
    title: "HOME",
    path: "/",
    icon: <HomeOutlined sx={{ fontSize: "33px" }} />,
    requiresAuth: false,
  },
  {
    title: "Following",
    path: "/following",
    icon: <PhotoLibraryOutlined sx={{ fontSize: "33px" }} />,
    requiresAuth: false,
  },
  // {
  //   title: "Stories",
  //   path: "/stories",
  //   icon: <FeedOutlined sx={{ fontSize: "33px" }} />,
  //   requiresAuth: false,
  // },
  {
    title: "Likes",
    path: "/likes",
    icon: <Favorite sx={{ fontSize: "33px" }} />,
    requiresAuth: true,
  },
  {
    title: "Messages",
    path: "/messages",
    icon: <MessageOutlined sx={{ fontSize: "33px" }} />,
    requiresAuth: true,
  },
];

export default function Navbar(props: any) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = React.useState(false);
  const [pendingPath, setPendingPath] = React.useState<string | null>(null);

  const navigate = useNavigate();
  const { user, } = useAuth(); // assuming useAuth exposes login()

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const handleNavClick = (item: typeof navItems[number], e: React.MouseEvent) => {
    if (item.requiresAuth && !user) {
      e.preventDefault();
      setPendingPath(item.path);
      setLoginDialogOpen(true);
    }

  };

  const handleLoginSuccess = () => {

    if (pendingPath) {
      navigate(pendingPath);
    }
    setPendingPath(null);
  };

  const drawer = (
    <Box
      bgcolor={"black"}
      padding={"30px"}
      justifyContent={"center"}
      height={"100%"}
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
    >
      <List>
        {navItems.map((item,) => (
          <ListItem key={item.title} disablePadding>
            <NavLink
              to={item.path}
              onClick={(e) => handleNavClick(item, e)}
              style={{
                textDecoration: "none",
                width: "100%",
                color: "white",
                fontSize: "14px",
                fontWeight: 600,
                fontFamily: "Fira Sans",
                padding: "10px 20px",
              }}
            >
              <ListItemText primary={item.title} />
              <Divider />
            </NavLink>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar
        component="nav"
        position="sticky"
        sx={{
          backgroundColor: COLORS.white.main,
          height: 65,
          alignItems: "center",
          transition: "allow-discrete",
        }}
      >
        <Box width={{ lg: 1200, md: 900, xs: "100%" }} mx={"auto"}>
          <Toolbar sx={{ height: 65 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              {/* logo */}
              <Box
                component={"img"}
                src="/assets/images/single-muslim-logo.png"
                alt="Logo"
                width={252}
                sx={{ height: "100%", width: "193px" }}
              />

              <Box
                sx={{
                  display: { xs: "none", sm: "flex", alignItems: "center" },
                }}
              >
                {navItems.map((item, i) => (
                  <>

                    <NavLink
                      to={item.path}
                      key={item.title}
                      onClick={(e) => handleNavClick(item, e)}
                      style={({ isActive }) => ({
                        textDecoration: "none",
                        padding: "0 6px",
                        border: "none",
                        borderBottom: isActive
                          ? `2px solid ${COLORS.primary.main}`
                          : "none",
                        color: i === 2 ? "red" : COLORS.secondary.main,
                        backgroundColor: isActive ? "#e2f2f9" : "transparent",
                      })}
                    >
                      <Stack
                        sx={{
                          alignItems: "center",
                          height: 65,
                          justifyContent: "space-evenly",
                          padding: "10px",
                        }}
                      >
                        {i === 3 && <Badge badgeContent={4} color="primary" sx={{ display: i === 3 ? 'block' : 'none' }}>

                          {item.icon}
                        </Badge>}
                        {i != 3 && <Box sx={{ display: i != 3 ? 'block' : 'none' }}>
                          {item.icon}
                        </Box>}

                        <Typography
                          sx={{
                            color: i === 2 ? "red" : COLORS.secondary.main,
                            fontSize: "10px",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Stack>
                    </NavLink>
                  </>
                ))}

                <AccountMenu />
              </Box>
            </Box>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon sx={{ color: COLORS.primary.main }} />
            </IconButton>
          </Toolbar>
        </Box>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          anchor="right"
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            bgcolor: "transparent",
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <LoginDialogBox
        open={loginDialogOpen}
        onClose={() => {
          setLoginDialogOpen(false);
          setPendingPath(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
