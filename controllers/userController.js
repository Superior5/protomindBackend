import User from "../models/userModel.js";

export async function getUsers(req, res) { 

    try {
        const users = await User.find({role: "SECRETARY"});
        res.json({
            users,
            total: users.length,
        })
    } catch (error) {

        console.log(error)
        res.status(400).json({
            message: 'Ошибка при получении данных',
        })
    }

}