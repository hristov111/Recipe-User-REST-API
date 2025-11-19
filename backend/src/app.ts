import express from "express";
import cors from "cors";
import usersRouter from "./routes/user.routes";
import recipeRouter from "./routes/recipe.routes";
import { connectDB } from "./config/db";
import cookieParser from "cookie-parser";
const PORT = process.env.PORT || 3000;

const app = express();
connectDB();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/recipes", recipeRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log(`App is running:http://localhost:${PORT}`);
});
