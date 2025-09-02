import { createRoot } from "react-dom/client";
import App from "./core/App/App";
import "./styles/_common.css";
import { BrowserRouter } from "react-router";
import { AuthProvider } from "@muc/context";
createRoot(document.getElementById("root")!).render(



    <BrowserRouter>
        <AuthProvider>

            <App />
        </AuthProvider>
    </BrowserRouter>


);
