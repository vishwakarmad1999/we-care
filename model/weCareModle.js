const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/weCare", 
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(res => {
    console.log("Connected to DB successfully")
})

const userSchema = new mongoose.Schema(
    {
        userID: String,
        name: String,
        password: String,
        gender: String,
        dateOfBirth: Date,
        email: String,
        mobileNumber: Number,
        pinCode: Number,
        city: String,
        state: String,
        country: String
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

const coachSchema = new mongoose.Schema(
    {
        coachID: String,
        name: String,
        password: String,
        gender: String,
        dateOfBirth: Date,
        mobileNumber: Number,
        speciality: String
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

const bookingSchema = new mongoose.Schema(
    {
        bookingID: String,
        userID: String,
        coachID: String,
        appointmentDate: Date,
        slot: String
    },
    {
        timestamps: {
            createdAt: true,
            updatedAt: true
        }
    }
)

exports.UserModel = mongoose.model('users', userSchema)
exports.CoachModel = mongoose.model('coaches', coachSchema)
exports.BookingModel = mongoose.model('bookings', bookingSchema)