const User = require('../model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const hashPassword = require('../utils/hashPassword')
const { generateToken } = require('../utils/generateJWT')



const signup = async (req, res) => {
    const {email,password,role} = req.body

    const hashedPassword = await hashPassword(password)

    const newUser = await User.create({
        email,
        password:hashedPassword,
        role: role || "basic",
    })

    newUser.accessToken = generateToken(newUser.id)
    await newUser.save()

    res.json({
        data: newUser,
        accessToken
    })

}

const login = async (req, res,next) => {
    try{
        const {email,password} = req.body
        const user = await User.findOne({email})
        if(!user) throw new Error("User not found")
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch) throw new Error("Password is incorrect")
        const accessToken = generateToken(user.id)
        await User.findByIdAndUpdate(user.id,{accessToken})
        res.status(200).json({
            data: user,
            accessToken,
        })
    }catch(error){
        next(error)
    }
}

const allUsers = async (req, res) => {
    const users = await User.find({})
    return res.status(200).json({
        data: users,
    })
}

const userById = async (req, res) => {
    const user = await User.findById(req.params.id)
    return res.status(200).json({
        data: user,
    })
}

const updateUser = async (req, res) => {
    const {email,password,role} = req.body
    const user = await User.findByIdAndUpdate(req.params.id,{
        email,
        password,
        role,
    })
    return res.status(200).json({
        data: user,
        message:'user updated successfully'
    })
}

const deleteUser = async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({
        data:null,
        message: 'user deleted successfully'
    })
}
module.exports = {
    signup,
    login,
    allUsers,
    userById,
    updateUser,
    deleteUser,

}