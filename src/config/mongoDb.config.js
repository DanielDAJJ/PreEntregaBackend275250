import mongoose from "mongoose";
export  const connectMongoDB = async () => {
    try {
        mongoose.connect('mongodb+srv://danieldajj:Drie950211@danieljaimescoderhouse.khe3r.mongodb.net/EntregaFinal')
    } catch (error) {
        console.log(error);
    }
};
