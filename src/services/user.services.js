import { createHash, isValidPassword } from "../utils.js";
import Services from "./service.manager.js";
import { userDao } from "../dao/mongoDao/user.dao.js";
import jwt from "jsonwebtoken";
import { cartDao } from "../dao/mongoDao/carts.dao.js";
import "dotenv/config";

class UserService extends Services{
    constructor() {
        super(userDao);
    }
    generateToken = (user)=>{
        const playload ={
            id: user._id,
            username: user.username,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role,
            cartID: user.cartID
        }
        return jwt.sign(playload, process.env.SECRET_KEY, { expiresIn: '1h' });
    }
    getUserByEmail = async (email)=>{
        try{
            return await this.dao.getByEmail(email);
        } catch (error){
            throw new Error(error.message);
        }
    }
    register = async (user)=>{
        try{
            const {email, password} = user;
            const existUser = await this.getUserByEmail(email);
            if(existUser) throw new Error('El correo ya se encuentra registrado');
            const cartUser = await cartDao.create();
            const newUser = await this.dao.register({
                ...user,
                password: createHash(password),
                cartID: cartUser._id
            });
            return newUser;
        }catch (error){
            throw error;
        }
    }
    login = async (user)=>{
        try{
            const {email, password} = user;
            const existUser = await this.getUserByEmail(email);
            if(!existUser) throw new Error('El correo no se encuentra registrado');
            const isPasswordValid = isValidPassword(password, existUser.password);
            if(!isPasswordValid) throw new Error('Contraseña incorrecta');
            const token = this.generateToken(existUser);
            return token;
        } catch (error){
            throw error;
        }
    }
}
export const userService = new UserService();