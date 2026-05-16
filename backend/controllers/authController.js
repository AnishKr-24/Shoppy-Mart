const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail");
const gernerateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // TODO: Hash the password before saving to the data base
        // TODOS: Implement JWT token generation for authentication
        // TODO: OTP send for email verification for email confirmation
        // TODOS: WELCOME MAIL after successful registration

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({ name, email, password: hashedPassword });
        if (user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();; // Generate a 6-digit OTP

            const message = `Your OTP for email verification is: ${otp}`;
            await sendEmail(email, "Email Verification OTP", message);
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: gernerateToken(user._id),
            });
        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};


// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if(user && (await bcrypt.compare(password, user.password) )) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: gernerateToken(user._id)
            });
        } else {
            res.status(400).json({ message: 'Invalid email or password'});
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error'})
    }

};

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error'});
    }
};

module.exports = {
    registerUser,
    loginUser,
    getUsers
};