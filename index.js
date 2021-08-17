#!/usr/bin/env node
const express = require('express');
const cors = require('cors');
const formData = require("express-form-data");
const routes = require('./routes');
const errorMiddleware = require('./middleware/error');
const appConfig = require('./config');
const PORT = appConfig.listenPort;

const app = express();
//app.use(formData.parse());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(cors());
app.set("view engine", "ejs");

app.use('/', routes);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});








