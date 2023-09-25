const express = require("express");
const validate = require("../../middlewares/validate");
const eventValidation = require("../../validations/event.validation");
const eventController = require("../../controllers/event.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.get("/notApprovedEvents", eventController.getAllNotApprovedEvents);
router.get("/approvedEvents", eventController.getAllApprovedEvents);
router.post("/approve/:eventId", eventController.approveEvent);
router
  .route("/:eventId")
  .get(eventController.getEventById)
  .put(eventController.updateEvent);
router
  .route("/")
  .get(eventController.getAllEvents)
  .post(eventController.createEvent);

module.exports = router;
