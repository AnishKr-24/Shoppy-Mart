const User = require("../model/User");

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });    
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
}