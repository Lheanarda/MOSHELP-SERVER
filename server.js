const express = require('express');
const app = express();
const fileupload = require('express-fileupload');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');
const { createServer } = require('https');
const http = require('http')
const fs = require('fs');

//CERITIFICATE KEY
const Certificate = 'www_emos_id.crt'
const CertificateKey = 'www_emos_id.key'

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
const auth = require('./routes/authRoute');
const ALL = require('./routes/ALLRoute');
const magang =require('./routes/magang');
const draft = require('./routes/draftRoute');
const subscription = require('./routes/subscriptionRoute');
const mapping = require('./routes/mappingRoute');

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
app.use('/api/v1/auth',auth);
app.use('/api/v1/ALL',ALL);
app.use('/api/v1/magang',magang);
app.use('/api/v1/draft',draft);
app.use('/api/v1/subscription',subscription);
app.use('/api/v1/mapping',mapping);

//SSL CONFIGURATION
let server
if(process.env.SSL==='true'){
    server = createServer({
        key:fs.readFileSync(CertificateKey),
        cert:fs.readFileSync(Certificate)
    },app)
}else{
    server = http.createServer(app);
}
server.listen(process.env.PORT,console.log(`Server running on ${process.env.ENDPOINT}`));