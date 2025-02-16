import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    last_name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    age:{
        type:Number,
    },
    password:{
        type:String,
        required: true,
        default:''
    },
    cartID:{
        type: Schema.Types.ObjectId,
        ref: 'Cart',
        default: null
    },
    role:{
        type:String,
        default: 'user'
    }
});

export const UserModel = model("users", UserSchema);