const mongoose = require("mongoose");
const { toJSON } = require("./plugins");

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    venue: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    organizer: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    coverImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    eventType: {
      type: String,
      default: "party",
    },
    noOfGuest: {
      type: Number,
      default: 0,
    },
    details: {
      type: JSON,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
eventSchema.plugin(toJSON);

/**
 * @typedef Event
 */
const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
