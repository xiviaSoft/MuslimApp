import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@muc/components": path.resolve(
        __dirname,
        "src/components/components.ts"
      ),
      // "@muc/constants": path.resolve(__dirname, "src/constants/constants.ts"),
      "@muc/modules": path.resolve(__dirname, "src/modules/modules.ts"),
      "@muc/screens": path.resolve(__dirname, "src/screens/screens.ts"),
      "@muc/types": path.resolve(__dirname, "src/types/types.ts"),
        "@muc/constants": path.resolve(__dirname, "src/constants/constants.ts"),
      // "@muc/routes": path.resolve(__dirname, "src/constants/routes.ts"),
      "@muc/router": path.resolve(__dirname, "src/core/core.ts"),
      "@muc/styles": path.resolve(__dirname, "src/styles/theme.ts"),
      "@muc/layout": path.resolve(__dirname, "src/layout/layout.ts"),
      "@muc/hooks": path.resolve(__dirname, "src/hooks/hooks.ts"),
      "@muc/hoc": path.resolve(__dirname, "src/hoc/hoc.ts"),
      "@muc/providers": path.resolve(__dirname, "./src/providers/providers.ts"),
      "@muc/context": path.resolve(__dirname, "./src/context/context.ts"),
      "@muc/libs": path.resolve(__dirname, "./src/libs/libs.ts"),
      "@muc/collections": path.resolve(__dirname, "./src/collections/collections.ts"),
      "@muc/validations": path.resolve(
        __dirname,
        "src/validations/validations.ts"
      ),
      "@muc/utils": path.resolve(__dirname, "./src/utils/utils.ts"),
    },
  },
});
