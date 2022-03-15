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
      message: "Communicate with the administrator",
    });
  }
};

const eventsUpdateEvent = async (req, res) => {
  const { id } = req.params;
  const { body, uid } = req;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        ok: false,
        message: "Event not found",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: "Not authorized",
      });
    }
    const newEvent = {
      ...body,
      user: uid,
    };
    const eventUpdated = await Event.findByIdAndUpdate(id, newEvent, {
      new: true,
    });
    res.status(200).json({
      ok: true,
      event: eventUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Communicate with the administrator",
    });
  }
};

const eventsDeleteEvent = async (req, res) => {
  const { id } = req.params;
  const { uid } = req;
  try {
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({
        ok: false,
        message: "Event not found",
      });
    }
    if (event.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        message: "Not authorized",
      });
    }
    await Event.findByIdAndDelete(id);
    res.status(200).json({
      ok: true,
      message: "Event deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: "Communicate with the administrator",
    });
  }
};

module.exports = {
  eventsGetEvents,
  eventsCreateEvent,
  eventsUpdateEvent,
  eventsDeleteEvent,
};
