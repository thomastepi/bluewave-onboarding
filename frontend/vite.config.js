import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const allowedHost = env.VITE_BASE_URL;

  return {
    base: "/",
    plugins: [react()],
    server: {
      host: "0.0.0.0",
      port: 4173,
      allowedHosts: [allowedHost],
      watch: {
        usePolling: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler",
        },
      },
    },
    test: {
      globals: true,
      environment: "jsdom",
      include: ["src/tests/**/*.test.jsx"],
      css: {
        modules: {
          classNameStrategy: "non-scoped",
        },
      },
      server: {
        deps: {
          inline: ["mui-color-input"],
        },
      },
    },
    resolve: {
      alias: {
        "@components": "/src/components",
      },
    },
  };
});
