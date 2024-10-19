const express = require('express');
const authRouter = require('./authRoutes');
const cvRouter = require('./cvRoutes');
const recRouter = require('./recRoutes');
const userRouter=require('./userRoutes');
const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/cv', cvRouter);
app.use('/recommendation', recRouter); 
app.use('/user', userRouter);

module.exports = app;