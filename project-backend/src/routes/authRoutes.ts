// import { Router, Request, Response } from 'express';
// import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
// import { Student } from '../models/userModels'; // Ensure correct import
// import {User} from "../models/userDal"; // Removed as it is not exported
// import { promises } from 'dns';
// const router: Router = Router();

// // Login Route
// router.post('/login', async (req: Request, res: Response): Promise<void> => {
//   const { username, password } = req.body;

//   try {
//     // Check if username and password are provided
//     if (!username || !password) {
//        res.status(400).json({ message: 'Username and password are required' });
//        return
//     }

//     // Find the student by username
//     const student = await Student.findOne({ username });

//     if (!student) {
//        res.status(400).json({ message: 'Invalid username or password' });
//        return
//        console.log('Received username:', username);

//     }

//     // Compare the provided password with the hashed password in the DB
//     const isMatch = await bcrypt.compare(password, student.password);
//     if (!isMatch) {
//        res.status(400).json({ message: 'Invalid username or password' });
//        return

//     }
    

//     // Generate JWT token with user details and role
//     const token = jwt.sign(
//       { id: student._id, role: student.role },
//       process.env.JWT_SECRET || 'secretKey', // Use environment variable for JWT secret
//       { expiresIn: '1h' }
//     );

//     // Send the response with token and student details
//     res.json({
//       message: 'Login successful',
//       token,
//       studentDetails: student.details || {}, // Ensure 'details' exists or provide a default
//       role: student.role,
//     });
//   } catch (err) {
//     console.error('Error in /login route:', err);
//     res.status(500).json({ message: 'Server error', error: err instanceof Error ? err.message : 'Unknown error' });
//   }
// });

// // Register Route   

// router.post('/register', async (req: Request, res: Response):Promise<void> => {
//     const { username, password } = req.body;

//     // Check if both username and password are provided
//     if (!username || !password) {
//          res.status(400).json({ message: 'Username and password are required' });
//          return
//     }

//     try {
//         // Check if username already exists
//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//              res.status(400).json({ message: 'Username already taken' });
//              return
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user object with hashed password
//         const userData = {
//             username,
//             password: hashedPassword,
//             role: 'student', // Default role
//         };

//         // Create a new instance of the User model
//         const storeUser = new User(userData);

//         // Save the new user to the database
//         await storeUser.save();

//         // Respond with success message
//         res.status(200).json({ message: 'User registered successfully', user: storeUser });
//     } catch (err) {
//         console.error('Error during user registration:', err);
//         res.status(500).json({ message: 'Server error', error: err });
//     }
// });


// export { router as authRoutes };


// routes/authRoutes.ts
// import express from 'express';
// import { signup }  from '../controller/authenticateToken';
// import { login } from '../controller/authenticateToken';
// const router = express.Router();

// // POST /api/auth/signup - Signup Route
// router.post('/signup', signup);

// // POST /api/auth/login - Login Route
// router.post('/login', login);

// export default router;
