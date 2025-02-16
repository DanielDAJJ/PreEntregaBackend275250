import Controller from "./controller.manager.js";
import { userService } from "../services/user.services.js";

class UserController extends Controller {
    constructor() {
        super(userService);
    }
    register = async (req, res, next) => {
        try{
            const user = await this.service.register(req.body);
            res.json(user);
        }catch(err){
            next(err)
        }
    }
    login = async (req, res, next) => {
        try{
            const user = await this.service.login(req.body);
            res.json(user);
        }catch(err){
            next(err)
        }
    }
    privateData = async (req, res, next) => {
        try {
            const userId = req.user.id;
            const userData = await this.service.getById(userId);
            res.json({
                success: true,
                data: userData
            });
        } catch (error) {
            next(error);
        }
    }
}

export const userController = new UserController();
