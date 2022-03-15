const Event = require("../models/Event");
const eventsGetEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("user", "name");
    res.status(200).json({
      ok: true,
      message: "Get events",
      events,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Communicate with the administrator",
    });
  }
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
