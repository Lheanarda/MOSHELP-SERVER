const webpush = require('web-push');

const publicVapidKey = 'BMEbPdHi2xX82hsEzd0OzbAOSvpKPX22_-gw_N_qbS2hoIzYcWdKKdz0DM4S5bQ4cUubVSoMLDZp7-Wb41E0Gwk';
const privateVapidKey = 'CGld2UpQ6x8o0R_vGhP7l-TsvDJlWvkFFwK539UCUIo';

exports.pushNotif = (subAuth,content)=>{
    const sub = {
        endpoint:subAuth.endpoint,
        expirationTime:null,
        keys:{
            auth:subAuth.auth,
            p256dh:subAuth.p256dh
        }
    }
    const payload = {
        notification:{
            title:content.title,
            body:content.body,
            badge:`${process.env.ENDPOINT}/images/logo-enseval.png`,
            icon:`${process.env.ENDPOINT}/images/logo-enseval.png`,
            vibrate:[100,50,100],
            requiredInteraction:true,
            renotify:true,
            tag:'test',
            data:{
                    url:content.url
                }
            },
           
    }
    webpush.setVapidDetails('mailto:alexanderleo0499@gmail.com',publicVapidKey,privateVapidKey);
    webpush.sendNotification(sub,JSON.stringify(payload))
}

exports.getSignDRRFName = (input,level)=>{
    switch (level){
        case 1:
            return input.request_by_name;
            break;
        case 2:
            return input.request_approved_name;
            break;
        case 3:
            return input.developed_by_name;
            break;
        case 4:
            return input.development_approved_name;
            break;
        case 5:
            return input.approved_name;
            break;
        default:
            return input.request_by_name
    }
}

exports.getSignDFT_UATName = (input,level)=>{
    switch (level){
        case 1:
            return input.user1;
        case 2:
            return input.user2;
            break;
        case 3:
            return input.checked_by_name;
            break;
        case 4:
            return input.request_by_name;
            break;
        case 5:
            return input.approved_by_name;
            break;
        case 6:
            return input.approved_name;
            break;
    }
}