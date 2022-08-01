const express = require('express');
const dotenv = require('dotenv').config()
const app = express();
const db = require('./config/db')
const cors = require('cors')
const PORT = process.env.PORT || 8080
/************************************* */


/* Database connection */
db()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use(async (req,res,next) => {
    if(req.headers['x-access-token']){
        const token = req.headers['x-access-token']
        const {userId,exp} = await jwt.verify(token, process.env.JWT_SECRET)
        
        if (exp < Date.now().valueOf() / 1000) { 
            return res.status(401).json({ error: "JWT token has expired, please login to obtain a new one" });
           } 
        
        res.locals.loggedInUser = await User.findById(userId)

    }else{
        next()
    }
})
app.use('/', require('./routes/userRoutes'))
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})