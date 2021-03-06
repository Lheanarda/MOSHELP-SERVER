//Database
const {moshelpPG} = require('../config/moshelpPGDB');

//Datasource
const JabatanDatasource = require('./JabatanDatasource');
const UsersDatasource = require('./UserDatasource');
const ProjectDatasource = require('./ProjectDatasource');
const AksesDatasource = require('./AksesDatasource');
const NomorDokumenDatasource = require('./NomorDokumenDatasource');
const DRFDatasource = require('./DRFDatasource');
const DocumentDatasource = require('./DocumentDatasource');
const ApprovalDatasource = require('./ApprovalDatasource');
const DFTDatasource = require('./DFTDatasource');
const UATDatasource = require('./UATDatasource');
const ALLDatasource = require('./ALLDatasource');
const MagangDatasource = require('./MagangDatasource');
const DraftDatasource = require('./DraftDatasource');
const SubscriptionDatasource = require('./SubscriptionDatasource');
const MappingDatasource = require('./MappingDatasource');

//initiate database
const moshelpPGDB = moshelpPG();

//initiate datasource
const Datasource = ()=>({
    JabatanDatasource : new JabatanDatasource({moshelpPGDB}),
    UsersDatasource : new UsersDatasource({moshelpPGDB}),
    ProjectDatasource : new ProjectDatasource({moshelpPGDB}),
    AksesDatasource : new AksesDatasource({moshelpPGDB}),
    NomorDokumenDatasource : new NomorDokumenDatasource({moshelpPGDB}),
    DRFDatasource : new DRFDatasource({moshelpPGDB}),
    DocumentDatasource : new DocumentDatasource({moshelpPGDB}),
    ApprovalDatasource : new ApprovalDatasource({moshelpPGDB}),
    DFTDatasource : new DFTDatasource({moshelpPGDB}),
    UATDatasource : new UATDatasource({moshelpPGDB}),
    ALLDatasource : new ALLDatasource({moshelpPGDB}),
    MagangDatasource : new MagangDatasource({moshelpPGDB}),
    DraftDatasource : new DraftDatasource({moshelpPGDB}),
    SubscriptionDatasource : new SubscriptionDatasource({moshelpPGDB}),
    MappingDatasource : new MappingDatasource({moshelpPGDB})
});

module.exports = Datasource;