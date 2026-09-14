import path from "node:path";
import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { visualEdits } from "@emergentbase/visual-edits/vite";

const hotReloadDisabled = process.env.DISABLE_HOT_RELOAD === "true";
const isProduction = process.env.NODE_ENV === "production";

// Emergent preview tooling is disabled for production deployments.
const visualEditsDisabled =
  isProduction || process.env.DISABLE_VISUAL_EDITS === "true";
const emergentOverlayDisabled =
  isProduction || process.env.DISABLE_EMERGENT_OVERLAY === "true";

async function loadEmergentOverlay() {
  if (emergentOverlayDisabled) return null;

  try {
    const mod = await import("@emergentbase/overlay/vite");
    return mod.emergentOverlay();
  } catch (e) {
    console.warn(
      "[emergent-overlay] plugin failed to load; using Vite's overlay instead:",
      e instanceof Error ? e.message : e,
    );
    return null;
  }
}

if (!hotReloadDisabled) {
  process.env.CHOKIDAR_USEPOLLING = "true";
}

export default defineConfig(async () => {
  const emergentOverlay = await loadEmergentOverlay();

  return {
    plugins: [
      react(),
      tailwindcss(),
      ...(visualEditsDisabled ? [] : [visualEdits()]),
      ...(emergentOverlay ? [emergentOverlay] : []),
    ],

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },

    optimizeDeps: {
      include: [
        "@base-ui/react/button",
        "@base-ui/react/checkbox",
        "@base-ui/react/dialog",
        "@base-ui/react/input",
        "@base-ui/react/menu",
        "@base-ui/react/merge-props",
        "@base-ui/react/popover",
        "@base-ui/react/select",
        "@base-ui/react/tabs",
        "@base-ui/react/use-render",
        "@tanstack/react-query",
        "class-variance-authority",
        "clsx",
        "date-fns",
        "lucide-react",
        "motion/react",
        "next-themes",
        "react",
        "react-day-picker",
        "react-dom/client",
        "react-is",
        "react-router-dom",
        "recharts",
        "sonner",
        "tailwind-merge",
      ],
    },

    server: {
      host: true,
      port: 3000,
      allowedHosts: true,
      cors: true,

      hmr: hotReloadDisabled
        ? false
        : { overlay: !emergentOverlay },

      watch: hotReloadDisabled
        ? null
        : { usePolling: true, interval: 300 },

      proxy: {
        "/api": {
          target: "http://localhost:8001",
          changeOrigin: true,
        },
      },
    },
  } satisfies UserConfig;
});
