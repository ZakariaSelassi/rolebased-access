const mongoose = require('mongoose')

const uri = process.env.MONGO_URI


const connection = async () => {
    try{
        const connection = await mongoose.connect(uri)
        if(connection){
            console.log('Connected to MongoDB')
        }else{
            console.log('Error connecting to MongoDB')
        }
    }catch(error){  
        await mongoose.disconnect()
    }
}

module.exports = connection
