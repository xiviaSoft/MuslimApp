import { createRoot } from "react-dom/client";
import App from "./core/App/App";
import "./styles/_common.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@muc/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create QueryClient instance outside render
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {/* <AllUserProvider myUid={auth.currentUser?.uid??""}> */}

                <App />
                {/* </AllUserProvider> */}
            </AuthProvider>
        </QueryClientProvider>
    </BrowserRouter>
);
