const Payment = require('../models/payment');

exports.payForBooking = async (req, res) => {
  const { bookingId, amount } = req.body;

  try {
    const payment = await Payment.create({ bookingId, userId: req.user.id, amount });
    res.status(201).json({ message: 'Payment successful', payment });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error });
  }
};
