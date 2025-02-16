import mongoose from "mongoose";
import 'dotenv/config'

export  const connectMongoDB = async () => {
    try {
        mongoose.connect(process.env.URL_MONGO)
        console.log('Conectado a MongoDB')
    } catch (error) {
        throw new Error
    }
};
