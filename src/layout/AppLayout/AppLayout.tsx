import { Box } from "@mui/material";
import { Footer, Navbar } from "../layout";
import { ScrollToTopButton } from "@muc/components";
// import { ScrollToTopButton } from "@muc/components";

const AppLayout = ({ children }: any) => {
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
