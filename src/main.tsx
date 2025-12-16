import { createRoot } from "react-dom/client";
import App from "./core/App/App";
import "./styles/_common.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, ToastProvider } from "@muc/context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create QueryClient instance outside render
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
        <QueryClientProvider client={queryClient}>
              <ToastProvider>

            <AuthProvider>
                {/* <AllUserProvider myUid={auth.currentUser?.uid??""}> */}

                <App />
                {/* </AllUserProvider> */}
            </AuthProvider>
              </ToastProvider>

        </QueryClientProvider>
    </BrowserRouter>
);
