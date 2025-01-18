const Booking = require('../models/booking');

exports.createBooking = async (req, res) => {
  const { trainType, from, to, departureDate, departureTime, classType, returnDate, returnTime } = req.body;
  const userId = req.user.id;

  try {
    let price = trainType === 'Express' ? 2000 : 1000;
    if (classType === 'Premium') price *= 2;
    if (returnDate && returnTime) price *= 2;

    const booking = await Booking.create({
      userId,
      trainType,
      from,
      to,
      departureDate,
      departureTime,
      classType,
      returnDate,
      returnTime,
      price,
    });

    res.status(201).json({ message: 'Booking created successfully', booking });
  } catch (error) {
    res.status(500).json({ message: 'Booking creation failed', error });
  }
};
