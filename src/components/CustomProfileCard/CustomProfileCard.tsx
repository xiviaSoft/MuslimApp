
import {
  Paper,
  Box,
  Typography,
  IconButton,
  // CircularProgress,
} from "@mui/material";

import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
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
  // likeLoading: boolean
};

const UserProfileCard = ({
  // img,
  name,
  // location,
  age,
  id,
  // likes = [],
  isLiked,
  onLike,
  // likeLoading,
  onRemoveLike,
  onVisit,
}: UserProfielCardProps) => {
  const navigate = useNavigate()
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




  return (
    <Box onClick={onVisit}>
      <Paper

        elevation={3}
        sx={{
          height: 420,
          borderRadius: 4,
          overflow: "hidden",
          position: "relative",
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

          {/* <Box display="flex" alignItems="center" gap={0.5} mt={0.5}>
            <LocationOnIcon fontSize="small" />
            <Typography fontSize={13}>{location}</Typography>
          </Box> */}

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mt={2}
          >
            <Box display="flex" gap={1}>
              <IconButton
                sx={{ color: "#fff", bgcolor: "rgba(0,0,0,0.3)" }}

                aria-label="message"
              >
                <ChatBubbleOutlineIcon onClick={() => navigate(`${ROUTES.MESSAGES}/${id}`)} />
              </IconButton>

              <IconButton
                sx={{ color: "#fff", bgcolor: "rgba(0,0,0,0.3)" }}

                aria-label="like"
              >
                {isLiked ? <FavoriteIcon onClick={onRemoveLike} sx={{ color: 'red' }} /> :
                  < FavoriteBorderIcon onClick={onLike} />}
              </IconButton>
            </Box>

            <Typography fontWeight={700} fontSize={20}>
              {calculateAge(age)} <span style={{ fontSize: '10px' }}>years old</span>
            </Typography>
          </Box>
        </Box>
      </Paper>

    </Box>
  );
};

export default UserProfileCard;
