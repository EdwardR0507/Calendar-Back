/*
    Event Routes
    /api/events
*/
const { Router } = require("express");
const { check } = require("express-validator");
const {
  eventsGetEvents,
  eventsCreateEvent,
  eventsUpdateEvent,
  eventsDeleteEvent,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");
const { validateFields } = require("../middlewares/fieldValidator");
const { validateJWT } = require("../middlewares/jwtValidator");

const router = Router();

router.use(validateJWT);

router.get("/", eventsGetEvents);

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("start", "Start date is required").custom(isDate),
    check("end", "End date is required").custom(isDate),
    validateFields,
  ],
  eventsCreateEvent
);

router.put("/:id", eventsUpdateEvent);

router.delete("/:id", eventsDeleteEvent);

module.exports = router;
