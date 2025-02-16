import MongoDao from "./Mongo.dao.js";
import { UserModel } from "../models/user.model.js";

class UserDaoMongo extends MongoDao {
    constructor() {
        super(UserModel);
    }
    async register(user){
        try {
            return await this.model.create(user);
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getById(id){
        try {
            return await this.model.findById(id).populate("Cart");
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getByEmail(email){
        try {
            return await this.model.findOne({ email });
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
export const userDao = new UserDaoMongo();