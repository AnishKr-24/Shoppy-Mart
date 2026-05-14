const User = require("../model/User");

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({ message: "User already exists" });    
        }
        // TODO: Hash the password before saving to the data base
        // TODOS: Implement JWT token generation for authentication
        // TODO: OTP send for email verification for email confirmation
        // TODOS: WELCOME MAIL after successful registration

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = User.create({name, email, password: hashedPassword});
        if(user) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();; // Generate a 6-digit OTP
            
            const message = `Your OTP for email verification is: ${otp}`;
            await sendEmail(email, "Email Verification OTP", message);
            return res.status(201).json({
                
            });
        }
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
};

