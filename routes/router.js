const express = require('express')
const router = express.Router()

const myController = require('../controller/myController')

router.post("/users", myController.createUser)
router.post("/login/users", myController.loginUser)
router.post("/coaches", myController.createCoach)
router.post("/coaches/login", myController.loginCoach)
router.get("/coaches/all", myController.getCoaches)
router.get("/coaches/:coachId", myController.getCoachByID)
router.get("/users/:userId", myController.getUserByID)
router.post("/users/booking/:userId/:coachId", myController.createBooking)
router.put("/booking/:bookingId", myController.updateBooking)
router.delete("/booking/:bookingId", myController.cancelBooking)
router.get("/coaches/booking/:coachId", myController.getBookingsByCoach)
router.get("/users/booking/:userId", myController.getBookingsByUser)
router.all("*", myController.invalid)

module.exports = router