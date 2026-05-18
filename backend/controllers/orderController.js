const Order = require('../model/Order');

const sendEmail = require('../utils/sendEmail');

//create a new order
const createorder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;
        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: 'Invalid order data' });

        }
        else {
            const order = new order({
                user: req.user._id,
                items,
                totalAmount,
                address,
                paymentId
            });
            await order.save();
            const message = `
                Dear ${req.user.name},

                Thank you for your order!

                Your order has been successfully created with the following details:

                Order ID: ${order._id}
                Total Amount: $${totalAmount}
                Shipping Address: ${address}

                We will notify you once your order is shipped.

                Best regards,
                ShopNest Team
                `;
            await sendEmail(req.user.email, 'Order Created', message);
            res.status(201).json({ message: 'Order created successfully', order });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
};