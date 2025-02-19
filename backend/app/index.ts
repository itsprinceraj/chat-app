// setup server
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "reflect-metadata";
import passport from "passport";
import { Request, Response, NextFunction } from "express";
import { setupSwagger } from "./common/config/swagger.config";
import { loadConfig } from "./common/helper/config.helper";
// initializing swagger docs;
import swaggerUi from "swagger-ui-express";
dotenv.config();
loadConfig();
const PORT = process.env.PORT || 4000;

//  import routes;
import routes from "./routes";
import { initDb } from "./common/services/database.service";

//  now create app
const app = express();

setupSwagger(app);

app.use(
  cors({
    origin: ["http://localhost:5173/"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(passport.initialize());

// default route

app.get("/", (req, res) => {
  res.json({
    message: `App is running on port: ${PORT}`,
  });
});

// now create routes;
app.use("/api/v1", routes);

//  database connection;
initDb();

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
