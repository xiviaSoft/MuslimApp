import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useNavigate } from "react-router";
import { Typography } from "@mui/material";
import { COLORS } from "@muc/constants";
import { useAuth } from "@muc/context";

const AccountMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const completion = 20;
  const circumference = 2 * Math.PI * 20;
  const progress = ((100 - completion) / 100) * circumference;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
          cursor: "pointer",
          ml: 1,
        }}
        onClick={handleClick}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Box sx={{ position: "relative", width: 48, height: 48 }}>
          <svg
            width="48"
            height="48"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke="#e0e0e0"
              strokeWidth="4"
              fill="none"
            />
            <circle
              cx="24"
              cy="24"
              r="20"
              stroke={completion < 50 ? "red" : completion < 100 ? "orange" : "green"}
              strokeWidth="4"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={progress}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 0.3s ease" }}
            />
          </svg>

          <Tooltip title="Account settings">
            <Avatar
              sx={{
                width: "40px",
                height: "40px",
                position: "absolute",
                top: "4px",
                left: "4px",
                textTransform: "capitalize",
              }}
            >
              {user?.firstName.charAt(0)}
            </Avatar>
          </Tooltip>
        </Box>

        <Typography
          sx={{
            fontSize: "10px",
            color: COLORS.secondary.main,
            textTransform: "capitalize",
          }}
        >
          {user
            ? `${user.firstName ?? ""} ${user.lastName ? user.lastName : ""}`
            : "NA"}
        </Typography>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/user_setting/edit-profile")}>
          <Avatar src={user?.firstName} /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => navigate("/user_setting/notifications")}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default AccountMenu;
