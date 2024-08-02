import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import cors from 'cors';

// import cloudinary from 'cloudinary';
import connectCloudinary from './config/cloudinary.js';

// mongoDB connectDB
import connectDB from './config/mongoDB.js';

//middleware
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

//router
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';
import songRouter from './routers/songRouter.js';
import albumRouter from './routers/albumRouter.js';

//public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

import cookieParser from 'cookie-parser';


// app config
dotenv.config();
const app = express();
const port = process.env.PORT || 5100;
connectDB();
connectCloudinary();


const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/song', authenticateUser, songRouter);
app.use('/api/v1/album', authenticateUser, albumRouter);


app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

// cấu hình để deploy
app.use(express.static(path.resolve(__dirname, '../admin-web/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../admin-web/dist', 'index.html'));
});



try {
    app.listen(port, () => {
        console.log(`Server running on PORT ${port}....`);
    });
} catch (error) {
    console.log(error);
    process.exit(1);
}

