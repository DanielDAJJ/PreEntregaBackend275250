//? Dependencias
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import MongoStore from 'connect-mongo';

//? Rutas
import productsRoutes from './router/products.routes.js';
import cartsRoutes from './router/carts.routes.js';
import { connectMongoDB } from './config/mongoDb.config.js';
import usersRouter from "./router/user.routes.js";
import 'dotenv/config'

//? Conexion a Mongo y gestion de sesiones
connectMongoDB();
const storeConfig ={
    store: MongoStore.create({
        mongoUrl: process.env.URL_MONGO,
        crypto: {secret: process.env.SECRET_KEY},
        ttl: 180,
    }),
    secret: process.env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1800000 },
}

//? Manejo de rutas con express
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(session(storeConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use('/api/products', productsRoutes);
app.use('/api/carts', cartsRoutes);
app.use('/api/users', usersRouter);


//? Puerto en Linea
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
