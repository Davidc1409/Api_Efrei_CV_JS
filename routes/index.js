const express = require('express');
const authRouter = require('./authRoutes');
//const cvRouter = require('./cv');
//const recRouter = require('./rec');
const app = express();
app.use(express.json());
app.use('/auth', authRouter);
/*router.use('/cv', cvRouter);
router.use('/recommendation', recRouter); */

module.exports = app;