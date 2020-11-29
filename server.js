const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

//ROUTE FILE
const images = require('./routes/imagesRoute');
const jabatan = require('./routes/jabatanRoute');
const users = require('./routes/usersRoute');
const project = require('./routes/projectRoute');
const authProject = require('./routes/authProjectRoute');
const akses = require('./routes/aksesRoute');
const usersAndJobs = require('./routes/usersJobRoute');
const DRF = require('./routes/DRFRoute');
const DFT = require('./routes/DFTRoute');
const UAT = require('./routes/UATRoute');
const document = require('./routes/documentRoute');
const approval = require('./routes/approvalRoute');

dotenv.config({path:'./config/config.env'});

//MIDDLEWARE
app.use(fileupload());
app.options('*',cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public'))) //set static folder

//route
app.use('/api/v1/images',images);
app.use('/api/v1/jabatan',jabatan);
app.use('/api/v1/users',users);
app.use('/api/v1/project',project);
app.use('/api/v1/auth-project',authProject);
app.use('/api/v1/akses',akses);
app.use('/api/v1/user-job',usersAndJobs);
app.use('/api/v1/DRF',DRF);
app.use('/api/v1/DFT',DFT);
app.use('/api/v1/UAT',UAT);
app.use('/api/v1/document',document);
app.use('/api/v1/approval',approval);

app.listen(process.env.PORT,console.log(`Server running on ${process.env.ENDPOINT}`));