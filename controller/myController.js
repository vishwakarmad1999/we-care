const validator = require('../utils/validators')
const models = require('../model/weCareModle')
const helper = require('../utils/helper')

const mongoSanitize = require('mongo-sanitize')

exports.createUser = async (req, res) => {
    try {
        console.log(req.body)

        const {name, password, dateOfBirth, gender, mobileNumber, email, pincode, city, state, country} = req.body
        
        if (!validator.validateName(name)) {
            res.status(400).json({message: "Name should have minimum 3 and maximum 50 characters"})
            return 
        }

        console.log("name validated")

        if (!validator.validatePassword(password)) {
            res.status(400).json({message: "Password should have minimum 5 and maximum 10 characters"})
            return
        }

        console.log("password validated")

        if (!validator.validateAge(new Date(dateOfBirth))) {
            res.status(400).json({message: "Age should be greater than 20 and less than 100"})
            return
        }

        console.log("age validated")

        if (!validator.validateGender(gender)) {
            res.status(400).json({message: "Gender should be either M or F"})
            return
        }

        console.log("gender validated")

        if (!validator.validatePhone(mobileNumber)) {
            res.status(400).json({message: "Mobile Number should have 10 digits"})
            return
        }

        console.log("mobileNumber validated")

        if (!validator.validateEmail(email)) {
            res.status(400).json({message: "Email should be a valid one"})
            return
        }

        console.log("email validated")

        if (!validator.validatePin(pincode)) {
            res.status(400).json({message: "Pincode should have 6 digits"})
            return
        }

        console.log("pincode validated")

        if (!validator.validateAddress(city) || !validator.validateAddress(state) || !validator.validateAddress(country)) {
            res.status(400).json({message: "City should have minimum 3 and maximum 20 characters"})
            return
        }

        console.log("city validated")

        const flag = await validator.doesEmailExist(email)
        if (flag) {
            res.status(400).json({message: "User exists with this email id"})
            return
        }

        const uId = await helper.genUserId()

        const data = await models.UserModel.create({
            userID: uId,
            name,
            password,
            dateOfBirth: new Date(dateOfBirth),
            gender,
            mobileNumber,
            email,
            pincode,
            city,
            state,
            country 
        })

        console.log(data)

        res.status(201).json({message: uId})

    } catch (err) {
        res.status(500).json({message: err.errmsg})
    }
}

exports.loginUser = async (req, res) => {
    try {
        const {id, password} = req.body

        const result = await models.UserModel.findOne({userID: id, password: password})

        console.log(result)

        if (result) {
            res.status(200).send("true")
        } else {
            res.status(400).json({message: "Incorrect user id or password"})
        }
    } catch (err) {
        console.log(err)
    }
}   

exports.createCoach = async (req, res) => {
    try {
        console.log(req.body)
        const {name, password, dateOfBirth, gender, mobileNumber, speciality} = req.body

        if (!validator.validateName(name)) {
            res.status(400).json({message: "Name should have minimum 3 and maximum 50 characters"})
            return
        }

        console.log("name validated")

        if (!validator.validatePassword(password)) {
            res.status(400).json({message: "Password should have minimum 5 and maximum 10 characters"})
            return
        }

        console.log("password validated")

        if (!validator.validateAge(new Date(dateOfBirth))) {
            res.status(400).json({message: "Age should be greater than 20 and less than 100"})
            return
        }

        console.log("age validated")

        if (!validator.validateGender(gender)) {
            res.status(400).json({message: "Gender should be either M or F"})
            return
        }

        console.log("gender validated")

        if (!validator.validatePhone(mobileNumber)) {
            res.status(400).json({message: "Mobile Number should have 10 digits"})
            return
        }

        console.log("mobile validated")

        if (!validator.validateSpeciality(speciality)) {
            res.status(400).json({message: "Specialty should have 10 to 50 characters"})
            return
        }

        console.log("speciality validated")

        const flag = await validator.doesCoachNameExist(name)
        if (flag) {
            res.status(400).json({message: "Coach exists with this name"})
            return
        }

        console.log("name check validated")

        const cId = await helper.genCoachId()

        const result = await models.CoachModel.create({
            coachID: cId,
            name,
            password,
            dateOfBirth: new Date(dateOfBirth),
            gender,
            mobileNumber,
            speciality
        })

        if (result) {
            res.status(201).json({message: cId})
        }
    } catch (err) {
        console.log(err)
    }
}

exports.loginCoach = async (req, res) => {
    let {id, password} = req.body

    console.log(id, password)

    // console.log(mongoSanitize(id))
    // console.log(mongoSanitize(password))

    // id = mongoSanitize(id)
    // password = mongoSanitize(password)

    const result = await models.CoachModel.findOne({coachID: id, password: password})
    console.log(result)

    if (result) {
        res.status(200).send("true")
    } else {
        res.status(404).json({ message: "Incorrect coach id or password" })
    }
}

exports.getCoaches = async (req, res) => {
    const result = await models.CoachModel.find({})
    res.status(200).json(result)
}

exports.getCoachByID = async (req, res) => {
    const coachId = req.params.coachId
    const result = await models.CoachModel.findOne({coachID: coachId})

    if (result) {
        res.status(200).json(result)
    } else {
        res.status(400).json({message: "Coach Id doesn't exist"})
    }
}

exports.getUserByID = async (req, res) => {
    const userId = req.params.userId
    const result = await models.UserModel.findOne({userID: userId})

    if (result) {
        res.status(200).json(result)
    } else {
        res.status(400).json({message: "User Id does not exist"})
    }
}

exports.createBooking = async (req, res) => {
    try {
        const {userId, coachId} = req.params
        const {slot, appointmentDate} = req.body

        let flag = await validator.doesUserExist(userId)
        if (!flag) {
            res.status(400).json({message: "User Id does not exist"})
            return
        }

        flag = await validator.doesCoachExist(coachId)
        if (!flag) {
            res.status(400).json({message: "Coach Id does not exist"})
            return
        }

        flag = await validator.doesAppointmentExist(slot, new Date(appointmentDate))
        if (flag) {
            res.status(400).json({message: "There is an appointment in this slot already"})
            return
        }

        if (!validator.validateSlot(slot)) {
            res.status(400).json({message: "Slot should be a valid one"})
        }

        if (!validator.validateAppointment(new Date(appointmentDate))) {
            res.status(400).json({message: "Date should be any upcoming 7 days"})
            return
        }

        const bId = await helper.genBookingId()

        const result = await models.BookingModel.create({
            userID: userId,
            coachID: coachId,
            bookingID: bId,
            slot,
            appointmentDate: new Date(appointmentDate)
        })

        res.status(200).send("true")
    } catch (err) {
        console.log(err)
    }
}

exports.updateBooking = async (req, res) => {
    try {
        const {bookingId} = req.params
        const {slot, appointmentDate} = req.body

        let flag = await validator.doesBookingExist(bookingId)
        if (!flag) {
            res.status(400).json({message: "Booking Id doesn't exist"})
        }

        flag = await validator.doesAppointmentExist(slot, appointmentDate)
        if (flag) {
            res.status(400).json({message: "There is an appointment in this slot already"})
            return
        }

        if (!validator.validateAppointment(new Date(appointmentDate))) {
            res.status(400).json({message: "Date should be any upcoming 7 days"})
            return
        }
        
        if (!validator.validateSlot(slot)) {
            res.status(400).json({message: "Slot should be a valid one"})
        }

        const result = await models.BookingModel.findOneAndUpdate({bookingID: bookingId}, {
            bookingID: bookingId,
            slot, 
            appointmentDate
        })

        res.status(200).send("true")
    } catch (err) {
        console.log(err)
    }
}

exports.cancelBooking = async (req, res) => {
    try {
        const {bookingId} = req.params

        const flag = await validator.doesBookingExist(bookingId)
        if (!flag) {
            res.status(400).json({message: "Could not delete this appointment"})
            return
        }

        const result = await models.BookingModel.deleteOne({bookingID: bookingId})

        res.status(200).send(true)
    } catch (err) {
        console.log(err)
    }
}

exports.getBookingsByCoach = async (req, res) => {
    try {
        const {coachId} = req.params

        const flag = await validator.doesCoachExist(coachId)
        if (!flag) {
            res.status(400).json({message: "Coach Id does not exist"})
            return
        }

        const result = await models.BookingModel.find({coachID: coachId})

        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(400).json({message: "Couldn't find any bookings"})
        }
    } catch (err) {
        console.log(err)
    }
}

exports.getBookingsByUser = async (req, res) => {
    try {
        const {userId} = req.params

        const flag = await validator.doesUserExist(userId)
        if (!flag) {
            res.status(400).json({message: "User Id does not exist"})
            return
        }

        const result = await models.BookingModel.find({userID: userId})

        if (result.length > 0) {
            res.status(200).json(result)
        } else {
            res.status(400).json({message: "Couldn't find any appointment details"})
        }
    } catch (err) {
        console.log(err)
    }
}

exports.invalid = async (req, res) => {
    res.status(404).json({message: "Invalid path"})
}