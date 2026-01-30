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

app.use(router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).send("Something went wrong!");
});

// 404 handler
app.use((req, res) => {
  res.status(404).send("Page not found");
});

const startServer = () => {
  return new Promise((resolve, reject) => {
    const server = app
      .listen(PORT)
      .on("listening", () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        resolve(server);
      })
      .on("error", (err) => {
        // Checking if PORT available
        if (err.code === "EADDRINUSE") {
          console.log(`Port ${PORT} is busy, trying port ${PORT + 1}`);
          PORT++;
          server.close();
          resolve(startServer());
        } else {
          reject(err);
        }
      });


    process.on("SIGTERM", () => {
      server.close(() => {
        console.log("Server closed");
        process.exit(0);
      });
    });
  });
};

// Start server only if not in Vercel environment
if (process.env.VERCEL !== '1') {
  startServer().catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });
}

export default app;