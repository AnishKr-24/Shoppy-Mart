const Order = require('../model/Order');

const sendEmail = require('../utils/sendEmail');

//create a new order
const createorder = async (req, res) => {
    try {
        const products = req.body.products || req.body.items;
        const { totalAmount, address, paymentId } = req.body;
        if (!products || products.length === 0 || !totalAmount || !address) {
            return res.status(400).json({ message: 'Invalid order data' });

        }
        else {
            const order = new Order({
                user: req.user._id,
                products,
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

const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('products.productId', 'name price');
        res.status(200).json(orders);
    } catch (error){
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'name email');
        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .populate('products.productId', 'name price');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Not authorized to view this order' });
        }

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const order = await Order.findById(req.params.id);
        if(order) {
            order.status = status;
            await order.save();
            res.json({message: 'order status updated', order});
        }
        else {
            res.status(400).json({message: 'Order not found'});
        }
    } catch(error) {
        res.status(500).json({message: 'Error updating order status', error});
    }
};

module.exports = {
    createOrder: createorder,
    myOrders,
    getOrders,
    getOrderById,
    updateOrderStatus,
};