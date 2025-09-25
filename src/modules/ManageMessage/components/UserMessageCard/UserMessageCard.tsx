// components/UserMessageCard/UserMessageCard.tsx
import { COLORS } from "@muc/constants";
import { auth, } from "@muc/libs";
import { Close, MoreHoriz } from "@mui/icons-material";
import { Box, Stack, Typography, IconButton, Menu, MenuItem } from "@mui/material";

import { useNavigate } from "react-router";
import { useState } from "react";
import { useMarkAsRead } from "@muc/hooks";

interface UserMessageCardProps {
  firstName: string;
  lastName: string;
  lastMessageText: string;
  uid: string;
  threadId?: string;
  unread?: number;
  isActive?: boolean;
}

const UserMessageCard = ({
  firstName,
  lastMessageText,
  lastName,
  uid,
  threadId,
  unread = 0,
  isActive = false,
}: UserMessageCardProps) => {
  const navigate = useNavigate();
  const myUid = auth.currentUser?.uid;
  const { markThreadAsRead, markThreadAsUnread } = useMarkAsRead();

  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(menuAnchor);

  const handleOpenMenu = (e: React.MouseEvent<HTMLButtonElement>) => setMenuAnchor(e.currentTarget);
  const handleCloseMenu = () => setMenuAnchor(null);

  const markReadLocal = async () => {
    if (!myUid || !threadId) return;
    await markThreadAsRead(threadId, myUid);
  };

  const markUnreadLocal = async () => {
    if (!myUid || !threadId) return;
    await markThreadAsUnread(threadId, myUid);
  };

  const handleClick = () => {
    if (threadId && !isActive) {
      markReadLocal();
    }
    navigate(`/messages/${uid}`);
  };

  return (
    <Stack
      direction={"row"}
      sx={{
        width: "100%",
        maxWidth: 320,
        padding: "10px",
        height: "70px",
        gap: "15px",
        borderBottom: "#d3d3d3 solid 1px",
        cursor: "pointer",
        position: "relative",
        backgroundColor: isActive ? COLORS.gray.lightDarkGray : "transparent",
        '&:hover': {
          backgroundColor: COLORS.gray.lightDarkGray,
        }
      }}
      onClick={handleClick}
    >
      <Box
        component={"img"}
        src="/assets/images/girl-img.jpg"
        sx={{
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          border: unread > 0 ? `2px solid ${COLORS.secondary.main}` : 'none'
        }}
      />

      <Stack width={"60%"} overflow="hidden">
        <Typography
          sx={{
            color: COLORS.green.lightGreen,
            overflow: "hidden",
            fontWeight: unread > 0 ? 600 : 400
          }}
        >
          {firstName} {lastName}
        </Typography>

        <Typography
          variant="body2"
          fontSize={"11px"}
          color={unread > 0 ? COLORS.gray.main : COLORS.gray.darkGray}
          height={"20px"}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            fontWeight: unread > 0 ? 600 : 400,
            color: unread > 0 ? COLORS.dark.main : COLORS.dark.darkblack
          }}
        >
          {lastMessageText}
        </Typography>
      </Stack>

      <Stack sx={{ justifyContent: "space-around", alignItems: "end", ml: "auto" }}>
        <IconButton size="small">
          <Close sx={{ fontSize: "16px" }} />
        </IconButton>
        <IconButton size="small" onClick={handleOpenMenu}>
          <MoreHoriz sx={{ fontSize: "20px" }} />
        </IconButton>
        <Typography sx={{ fontSize: "10px" }}>Fri</Typography>
      </Stack>

      <Menu anchorEl={menuAnchor} open={open} onClose={handleCloseMenu} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {unread > 0 ? (
          <MenuItem onClick={() => { handleCloseMenu(); markReadLocal(); }}>Mark as read</MenuItem>
        ) : (
          <MenuItem onClick={() => { handleCloseMenu(); markUnreadLocal(); }}>Mark as unread</MenuItem>
        )}
      </Menu>

      {/* Unread badge */}
      {unread > 0 && (
        <Box
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
          }}
        >
          <Box
            sx={{
              bgcolor: COLORS.secondary.main,
              color: COLORS.white.main,
              borderRadius: "50%",
              minWidth: 20,
              height: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 600,
              px: 0.5,
            }}
          >
            {unread > 99 ? "99+" : unread}
          </Box>
        </Box>
      )}
    </Stack>
  );
};

export default UserMessageCard;