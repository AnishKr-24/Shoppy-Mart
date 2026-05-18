const express = require("express")
const router = express.Router()
const { registerUser, loginUser, getUsers } = require("../controllers/authController");
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", protect, admin, getUsers);

// router.post("/verify-email", async(req, res) => {
//     try {
//         const {email} = req.body;
        
//         if (!email) {
//             return res.status(400).json({message: "Email is required"});
//         }
        
//         // TODO: Add email verification logic (send verification link, etc.)
        
//         res.status(200).json({message: "Verification email sent"});
//     } catch (error) {
//         res.status(500).json({message: "Error verifying email", error: error.message});
//     }
// });

module.exports = router;