import { ThemeProvider } from "@emotion/react";
import Routes from "../Routes/Routes";
import { theme } from "@muc/styles";
import { CssBaseline } from "@mui/material";
import { AllUserProvider, useAuth } from "@muc/context";

const App = () => {
  const { user } = useAuth()
  return (
    <AllUserProvider myUid={user?.uid ?? ""}>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </ThemeProvider>
    </AllUserProvider>
  );
};

export default App;
