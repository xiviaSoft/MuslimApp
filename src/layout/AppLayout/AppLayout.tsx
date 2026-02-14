import { Box } from "@mui/material";
import { Footer, Navbar } from "../layout";
import { ScrollToTopButton } from "@muc/components";
import { useMessageNotifications } from "../../hooks/useMessageNotifications";

const AppLayout = ({ children }: any) => {
  useMessageNotifications(); // 👈 Global listener
  return (
    <>
      <Navbar />
      {/* <LandingNavbar /> */}
      <Box sx={{ position: "relative" }}>
        {children}
        <ScrollToTopButton />
      </Box>
      <Footer />
    </>
  );
};

export default AppLayout;
