const models = require('../model/weCareModle')

exports.genUserId = async () => {
    let count = await models.UserModel.find().count()
    count = String(count + 1)

    let id
    if (count.length == 1) {
        id = "UI-000" + count
    } else if (count.length == 2) {
        id = "UI-00" + count
    } else if (count.length == 3) {
        id = "UI-0" + count
    } else {
        id = "UI-" + count
    }
    return id
} 

exports.genCoachId = async () => {
    let count = await models.CoachModel.find().count()
    count = String(count + 1)

    let id
    if (count.length == 1) {
        id = "CI-000" + count
    } else if (count.length == 2) {
        id = "CI-00" + count
    } else if (count.length == 3) {
        id = "CI-0" + count
    } else {
        id = "CI-" + count
    }
    return id
} 

exports.genBookingId = async () => {
    let count = await models.BookingModel.find().count()
    count = String(count + 1)

    let id
    if (count.length == 1) {
        id = "BI-000" + count
    } else if (count.length == 2) {
        id = "BI-00" + count
    } else if (count.length == 3) {
        id = "BI-0" + count
    } else {
        id = "BI-" + count
    }
    return id
} 

