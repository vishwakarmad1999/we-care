const models = require('../model/weCareModle')

exports.validateName = (name) => {
    if (name.length >= 3 && name.length <= 50) return true
    return false
}

exports.validatePassword = (pass) => {
    if (pass.length >= 5 && pass.length <= 10) return true
    return false
}

exports.validateAge = (dob) => {
    const age = new Date().getFullYear() - dob.getFullYear()
    if (age >= 20 && age <= 100) return true
    return false
}

exports.validateGender = (gender) => {
    if (gender === "M" || gender === "F") return true
    return false
}

exports.validatePhone = (phone) => {
    if (String(phone).length === 10) return true
    return false
}

exports.validateEmail = (email) => {
    const pattern = new RegExp(".+@.+\.com")
    if (pattern.test(email)) return true
    return false
}

exports.validatePin = (pin) => {
    if (String(pin).length === 6) return true
    return false
}

exports.validateAddress = (val) => {
    if (val.length >= 3 && val.length <= 20) return true
    return false
}

exports.doesEmailExist = async (email) => {
    const elist = await models.UserModel.find({}, {_id: 0, email: 1})
    for (let i = 0; i < elist.length; i++) {
        if (email === elist[i].email) return true
    }
    return false
}

exports.validateSpeciality = (val) => {
    if (val.length >= 10 && val.length <= 50) return true
    return false
}

exports.doesCoachNameExist = async (name) => {
    const result = await models.CoachModel.find({}, {_id:0, name: 1})
    for (let i = 0; i < result.length; i++) {
        if (name = result[i].name) return true
    }
    return false
}

exports.doesUserExist = async (id) => {
    const result = await models.UserModel.findOne({userID: id})
    if (result) return true
    return false
}

exports.doesCoachExist = async (id) => {
    const result = await models.CoachModel.findOne({coachID: id})
    if (result) return true
    return false
}

exports.doesBookingExist = async (id) => {
    const result = await models.BookingModel.findOne({bookingID: id})
    if (result) return true
    return false
}

exports.doesAppointmentExist = async (slot, appointmentDate) => {
    const result = await models.BookingModel.find({slot: slot, appointmentDate: appointmentDate}).count()
    if (result > 0) return true
    return false
}

exports.validateAppointment = (appointmentDate) => {
    const msDay = 86400000
    if ((appointmentDate - new Date()) < (7 * msDay)) return true
    return false
}