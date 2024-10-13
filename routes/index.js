const express = require('express');
const authRouter = require('./authRoutes');
const cvRouter = require('./cvRoutes');
const userRouter = require('./userRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cv', cvRouter);
// router.use('/recommendation', recRouter);

module.exports = app;