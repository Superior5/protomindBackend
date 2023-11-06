import { validationResult } from "express-validator";
import Role from "../models/roleModel.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import secret from "../config.js";
import jwt from "jsonwebtoken";

const generateAccessToken = (id, name, username, role) => {
    const payload = {
        id,
        name,
        username,
        role,
    };
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}


export async function login(req, res) { 

    try {
        const {login, password} = req.body;
        const user = await User.findOne({login});
       
        if(!user) {
            console.log(login)

            return res.status(400).json({
                message: 'Неверные логин или пароль',
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword) {


            return res.status(400).json({
                message: 'Неверные логин или пароль',
            })
        }
        


        const token = generateAccessToken(user._id, user.name, user.username, user.role);

        res.json({
            token,
        })
    } catch (error) {

        console.log(error)
        res.status(400).json({
            message: 'Ошибка при регистрации пользователя',
        })
    }

}

export async function registration(req, res) { 
    try {
        const validationErrors = validationResult(req);
        
        console.log(req.body)
        if(!validationErrors.isEmpty()) {
            return res.status(400).json({message: 'Ошибка при регистрации, не валидные данные', errors: validationErrors.errors})
        }

        const {username, login, name, password} = req.body;
        let candidate = await User.findOne({username});
        if(candidate) {
            return res.status(409).json({
                message: 'Пользователь с таким никнеймом уже существует, укажите другой',
            })
        }
        
        candidate = await User.findOne({login});

        if(candidate) {
            return res.status(410).json({
                message: 'Пользователь с такой почтой уже существует, укажите другую',
            })
        }
        
        const hashPassword = await bcrypt.hash(password, 7);    
        const userRole = await Role.findOne({value: 'SECRETARY'})

        const user = new User({username, login, name, password: hashPassword, role: 'SECRETARY'})
        
        await user.save();

        return res.json({
            message: 'Пользователь успешно зарегистрирован',
        });

    } catch (error) {

        console.log(error)
        res.status(400).json({
            message: 'Ошибка при регистрации',
        })
    }
}



export async function users(req, res) { 
    try {

        
        res.json({
            msg: 'ok',
        })
    } catch (error) {
        res.json({
            msg: 'not ok',
        })
    }
}

