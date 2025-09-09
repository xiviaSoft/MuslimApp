import { useState } from "react";
import {
  Paper,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useAuth } from "@muc/context";
import { LoginDialogBox } from "@muc/components";
import { useNavigate } from "react-router";
import { ROUTES } from "@muc/constants";
import FavoriteIcon from '@mui/icons-material/Favorite';

type UserProfielCardProps = {
  // img: string;
  name: string;
  location?: string;
  age: number;
  countryFlag?: string;
  id: string
  likes?: string[]; // Array of user IDs that this user has liked
  onLike?: () => void;
  onRemoveLike?: () => void;
  isLiked: boolean;
  onVisit?: () => void;
};

const UserProfileCard = ({
  // img,
  name,
  location,
  age,
  id,
  // likes = [],
  isLiked,
  onLike,
  onRemoveLike,
  onVisit,
}: UserProfielCardProps) => {
  const { user, } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [intendedAction, setIntendedAction] = useState<"like" | "message" | null>(null);
  const navigate = useNavigate()
  const handleProtectedClick = (action: "like" | "message") => {
    if (!user) {
      setIntendedAction(action);
      setDialogOpen(true);
    } else {
      if (action === "like") {
        // perform like logic
        console.log("liked");
      } else if (action === "message") {
        // open messaging
        console.log("message");
      }
    }
  };

  const handleLoginSuccess = () => {

    if (intendedAction === "like") {
      console.log("liked after login");
    } else if (intendedAction === "message") {
      console.log("message after login");
    }
    setIntendedAction(null);
  };
  const calculateAge = (dobString: number) => {
    const dob = new Date(dobString);
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  };

  // const isLiked = user ? likes?.includes(user?.uid) : false;


  return (
    <Box onClick={onVisit}>
      <Paper

        elevation={3}
        sx={{
          height: 420,
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
          // backgroundImage: `url('assets/images/girl-img.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          coursor: 'pointer',
          "&:hover": {
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
          }
        }}

      >
        <Box component={'img'} src="assets/images/girl-img.jpg" alt={name} sx={{ height: '100%', objectFit: 'cover', width: '100%', }}
          onClick={() => navigate(`${ROUTES.USER_INFO}/${id}`)}

        />
        <Box

          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            color: "#fff",
            p: 2,
            background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
          }}
        >
          <Box display="flex" alignItems="center" gap={1}>
            <Typography fontWeight={600} fontSize={18} textTransform={'capitalize'}>
              {name}
            </Typography>
            <CheckCircleIcon fontSize="small" sx={{ color: "#3EA6FF" }} />
          </Box>

          <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
            <LocationOnIcon fontSize="small" />
            <Typography fontSize={13}>{location}</Typography>
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Box display="flex" gap={1}>
              <IconButton
                sx={{ color: "#fff", bgcolor: "rgba(0,0,0,0.3)" }}
                onClick={() => handleProtectedClick("message")}
                aria-label="message"
              >
                <ChatBubbleOutlineIcon onClick={() => navigate(ROUTES.MESSAGES)} />
              </IconButton>

              <IconButton
                sx={{ color: "#fff", bgcolor: "rgba(0,0,0,0.3)" }}
                onClick={() => handleProtectedClick("like")}
                aria-label="like"
              >
                {isLiked ? <FavoriteIcon onClick={onRemoveLike} sx={{ color: 'red' }} /> : <FavoriteBorderIcon onClick={onLike} />}
              </IconButton>
            </Box>

            <Typography fontWeight={700} fontSize={20}>
              {calculateAge(age)} <span style={{ fontSize: '10px' }}>years old</span>
            </Typography>
          </Box>
        </Box>
      </Paper>

      <LoginDialogBox
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setIntendedAction(null);
        }}
        onLoginSuccess={() => {
          handleLoginSuccess();
          setDialogOpen(false);
        }}
      />
    </Box>
  );
};

export default UserProfileCard;
