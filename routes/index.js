const express = require('express');
const authRouter = require('./authRoutes');
const cvRouter = require('./cvRoutes');
const recRouter = require('./recRoutes');
const app = express();
app.use(express.json());
app.use('/auth', authRouter);
app.use('/cv', cvRouter);
app.use('/recommendation', recRouter); 

module.exports = app;