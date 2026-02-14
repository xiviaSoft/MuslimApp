import { ROUTES } from "@muc/constants";
import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface ListProps {
  name?: string;
  img?: string;
  bio?: string;
  uid?: string; // 👈 Add uid prop
}

const CustomUserLIst = ({ img, name, bio, uid }: ListProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (uid) {
      navigate(`/${ROUTES.USER_INFO}/${uid}`); // 👈 Navigate to user profile
    }
  };

  return (
    <List sx={{ width: "100%", maxWidth: 300 }}>
      <ListItem
        alignItems="flex-start"
        onClick={handleClick}
        sx={{
          cursor: uid ? "pointer" : "default", // 👈 Show pointer cursor
          "&:hover": uid ? { bgcolor: "action.hover" } : {}, // 👈 Hover effect
        }}
      >
        <ListItemAvatar>
          <Avatar alt={name} src={img} />
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                sx={{ color: "text.primary", display: "inline" }}
              >
                {bio}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
  );
};

export default CustomUserLIst;
