import { Router } from "express";
import { login, registration, users } from "../controllers/authController.js";
import { check } from "express-validator";
const router = Router();

router.post('/registration', [
    check('username', 'Никнейм не должен быть пустым').notEmpty(),
    check('username', 'ФИО не должно быть пустым').notEmpty(),
    check('password', 'Пароль должен содержать больше 6 символов').isLength({min: 6})
], registration);
router.post('/login', login);
router.post('/users', users);

export default router;