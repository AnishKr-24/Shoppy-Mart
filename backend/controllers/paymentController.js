const Razorpay = require("razorpay");
const crypto = require("crypto");
dotenv = require("dotenv").config();

const createdOrder = async (req, res) => {
    try {
        const instance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const options = {
            amount: req.body.amount * 100, // amount in the smallest
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };
        const order = await instance.orders.create(options);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
}; 

const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // Create HMAC SHA256 hash
        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generated_signature = hmac.digest("hex");

        // Verify signature
        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        res.status(200).json({ success: true, message: "Payment verified successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

module.exports = { createdOrder, verifyPayment };