const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATA_BASE_URL)
        console.log(`connected successfully to db to ${conn.connection.host}`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
    
}

module.exports = connectDB