const Event = require("../models/Event");
const eventsGetEvents = (req, res) => {
  res.json({
    ok: true,
    message: "Get events",
  });
};

const eventsCreateEvent = async (req, res) => {
  const event = new Event(req.body);
  try {
    event.user = req.uid;
    const eventSave = await event.save();
    res.status(201).json({
      ok: true,
      message: "Event created",
      event: eventSave,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Error creating event",
    });
  }
};

const eventsUpdateEvent = (req, res) => {
  res.json({
    ok: true,
    message: "Update event",
  });
};

const eventsDeleteEvent = (req, res) => {
  res.json({
    ok: true,
    message: "Delete event",
  });
};

module.exports = {
  eventsGetEvents,
  eventsCreateEvent,
  eventsUpdateEvent,
  eventsDeleteEvent,
};
