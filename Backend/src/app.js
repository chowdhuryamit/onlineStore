import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url"

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../dist")));


import userRoutes from "./routes/user.auth.routes.js";
import productRoutes from "./routes/user.product.route.js";
import orderRoutes from "./routes/user.order.routes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);

app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

export default app;
