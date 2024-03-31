const jwt = require("jsonwebtoken")
const userModel = require("../model/user.model")

module.exports = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (user) {
            if (password == user.password) {
                const token = jwt.sign({ name: user.name, id: user._id, role: user.role }, 'Secret_token')
                res.json({ message: 'done' ,token})
            } else {
                res.json({message:'password not correct'})
            }
        } else {
            res.json({ message: 'email not found' })
        }
    } catch (error) {
        res.json({ message: 'error in code' })
    }
}