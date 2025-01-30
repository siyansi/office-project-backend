import express, { Request, Response, NextFunction } from "express";
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const DBconnect = require("../src/config/dt");
import studentRoutes from "./routes/studentRoutes";
// import attendanceRoutes from"./routes/attendanceRoutes";
const userRoutes = require("./routes/userRoutes");

dotenv.config();
const app = express();
const myMiddleware = (req: Request, res: Response, next: NextFunction) => {
  next();
};
app.use(myMiddleware);
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(express.json());

DBconnect();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.json());

// app.use("/api/country", contryRoutes);

app.use("/auth/user", userRoutes);
app.use("/api/students", studentRoutes);
// app.use('/api/attendance', attendanceRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));