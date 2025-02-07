import express, { Request, Response, } from "express";
import bcrypt from "bcryptjs";
const router = express.Router();
import jwt from "jsonwebtoken";
// import authenticateToken from "../controller/authenticateToken";
import Student from "../models/studentdModals"; // Import the updated student model
import User from "../models/userModels";

const dotenv = require("dotenv");

dotenv.config();

router.post(
  "/register",  
  async (req: Request, res: Response) => {
    try {
      const { username, password, email,role } = req.body;
      console.log(role);
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(hashedPassword);
      const user = new User({ username, email,password: hashedPassword, role });
      console.log(user);
      await user.save();
      console.log("User saved successfully");
      res.status(200).json({ message: "User registered successfully", user });
    } catch (error) {
      res.status(500).json({ error: "Error registering user" });
    }
  }
);
// ✅ LOGIN ROUTE
router.post("/login", async (req: Request, res: Response):Promise<void> => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email }); // ✅ Check Admins & Managers first
    let role = "Admin";

    if (!user) {
      user = await Student.findOne({ email }); // ✅ Check Students collection
      role = "Student";
    }

    if (!user) {
       res.status(400).json({ error: "User not found" });
        return;
    }

    // ✅ Compare Password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
       res.status(400).json({ error: "Invalid password" });
        return;
    }

    // ✅ Generate Token
    const token = jwt.sign(
      { id: user._id, role },
      process.env.JWT_SECRET || "simonpeter@246",
      { expiresIn: "1d" }
    );

    // ✅ Return token & role
    res.json({ token, role });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// router.post("/login", login);

// router.get(
//   "/userDetails",
//   authenticateToken,
//   async (req: Request, res: Response): Promise<void> => {
//     try {
//       const user = await User.findById(req.user.id);
//       if (!user) {
//         res.status(404);
//       }
//       if (!user) {
//         res.status(404).json({ error: "User not found" });
//         return;
//       }
//       const id = user._id;
//       const findUser = await User.findOne({ _id: id });
//       res.json(findUser);
//     } catch (error) {
//       console.error("Error fetching user details:", error);
//       res.sendStatus(500);
//     }
//   }
// );

export default router