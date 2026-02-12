import { Box } from "@mui/material";
import { Footer, Navbar } from "../layout";
import { ScrollToTopButton } from "@muc/components";

const AppLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      {/* <LandingNavbar /> */}
      <Box sx={{ position: 'relative' }}>{children}
        <Box sx={{ position: 'absolute', bottom: '2%', right: '2%', height: '100vh' }}>
          <ScrollToTopButton />
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default AppLayout;
