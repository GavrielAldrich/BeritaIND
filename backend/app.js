import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import router from "./routes/index.route.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
let PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, "../views")));
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));

// Routes
app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});
// ...existing code...

const MAX_PORT_ATTEMPTS = 10;
let currentServer = null;

const startServer = async () => {
  let attempts = 0;
  let currentPort = PORT;

  while (attempts < MAX_PORT_ATTEMPTS) {
    try {
      if (currentServer) {
        await new Promise(resolve => currentServer.close(resolve));
      }

      currentServer = await new Promise((resolve, reject) => {
        const server = app
          .listen(currentPort)
          .once("listening", () => {
            console.log(`Server is running on http://localhost:${currentPort}`);
            resolve(server);
          })
          .once("error", (err) => {
            if (err.code === "EADDRINUSE") {
              currentPort++;
              resolve(null);
            } else {
              reject(err);
            }
          });
      });

      if (currentServer) {
        break;
      }

      attempts++;
    } catch (err) {
      console.error(`Failed to start server on port ${currentPort}:`, err);
      attempts++;
    }
  }

  if (!currentServer) {
    throw new Error(`Could not find an available port after ${MAX_PORT_ATTEMPTS} attempts`);
  }

  return currentServer;
};

// Cleanup function
const cleanup = () => {
  if (currentServer) {
    currentServer.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
};

// Handle process termination
process.on("SIGTERM", cleanup);
process.on("SIGINT", cleanup);

// Start server only if not in Vercel environment
if (process.env.VERCEL !== "1") {
  startServer().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
}

export default app;
