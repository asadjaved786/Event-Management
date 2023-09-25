const catchAsync = require("../utils/catchAsync");
const Event = require("../models/event.model");

const createEvent = catchAsync(async (req, res) => {
  console.log(req.body);
  const eventData = req.body;
  const userId = req.body.id;
  eventData.userId = userId;
  const event = await Event.create({
    title: req?.body.title,
    venue: req?.body.venue,
    organizer: req?.body.organizer,
    date: req?.body?.date,
    description: req?.body.description,
    price: req?.body.price,
    profileImage: req?.body.profileImage,
    coverImage: req?.body.coverImage,
    noOfGuest: req?.body?.noOfGuest,
    eventType: req?.body?.eventType,
  });
  return res.json(event);
});
const updateEvent = catchAsync(async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.findById(eventId);
  event.details = req?.body?.eventDetails;
  const savedEvent = await event.save();
  return res.json(savedEvent);
});

const approveEvent = catchAsync(async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.findById(eventId);
  event.isApproved = true;
  const savedEvent = await event.save();
  console.log(event);
  return res.json(savedEvent);
});

const getAllApprovedEvents = catchAsync(async (req, res) => {
  const events = await Event.find({ isApproved: true });
  return res.json(events);
});
const getAllEvents = catchAsync(async (req, res) => {
  const events = await Event.find();
  return res.json(events);
});

const getAllNotApprovedEvents = catchAsync(async (req, res) => {
  const events = await Event.find({ isApproved: false });
  return res.json(events);
});

const getEventById = catchAsync(async (req, res) => {
  const eventId = req.params.eventId;
  const event = await Event.findById(eventId);
  return res.json(event);
});

module.exports = {
  updateEvent,
  createEvent,
  approveEvent,
  getAllApprovedEvents,
  getAllNotApprovedEvents,
  getAllEvents,
  getEventById,
};
