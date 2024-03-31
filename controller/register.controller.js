const userModel = require("../model/user.model")

module.exports = async (req, res) => {
    try {
        const { name, email, phone, password,rePassword } = req.body
        const user = await userModel.findOne({ email })
        if (user) {
            res.json({ message: 'email already exist' })
        } else {
            await userModel.insertMany({ name, email, phone, password })
            res.json({message:'done',token})
        }
    } catch (error) {
        res.json({ message: 'error in code' })
    }
}