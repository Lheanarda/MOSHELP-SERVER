// const webpush = require('web-push');

const pushNotif = require("./helpers/push-notification");

// // console.log(webpush.generateVAPIDKeys());

// const publicVapidKey = 'BMEbPdHi2xX82hsEzd0OzbAOSvpKPX22_-gw_N_qbS2hoIzYcWdKKdz0DM4S5bQ4cUubVSoMLDZp7-Wb41E0Gwk';
// const privateVapidKey = 'CGld2UpQ6x8o0R_vGhP7l-TsvDJlWvkFFwK539UCUIo';

// const sub = {
//     endpoint:'https://fcm.googleapis.com/fcm/send/cJghtFa5buo:APA91bFoThgQzdlVD7cNJZ08yLZs0cwXlDU0n-GzCeET_PUNYBMzKgSCfzjqDeDbaq5BWPJ82JH4tIb652UVlO6_KKMKoXL3GPxHnzN-AoJ4mQfkNw4LC943VGeFwUumgkIucGjHVJHG',
//     expirationTime:null,
//     keys:{
//         auth:'AHk-dhoBrf_hziB_ds-T8w',
//         p256dh:'BJ-Mmy6lXcvYnlYXydqTKY5iPD0QflQt3gJPePcNEplg6TnZU19EuOegFNl-GxX8DQfhWsdapFv3ThcnJU-F2gI'
//     }
// };

// const payload = {
//     notification:{
//         title:'New Push Message',
//         body:'Success',
//         vibrate:[100,50,100],
//         data:{
//             url:'https://medium.com/@arjenbrandenburgh/angulars-pwa-swpush-and-swupdate-15a7e5c154ac'
//         }
//     }
// }

// webpush.setVapidDetails('mailto:alexanderleo0499@gmail.com',publicVapidKey,privateVapidKey);

// webpush.sendNotification(sub,JSON.stringify(payload))

pushNotif({
    endpoint:'https://fcm.googleapis.com/fcm/send/e4HWZIMl9uw:APA91bFtBoyulZEigkJWl1tLXC4hOby_AlwoBTkoMUmNesV6giSJHAwMvb7GXdnCjVxWiG6W8qGccLFf1wDuouFHpwgrhz9LJBVYrRxunMbvIb2QV42VCwq8ZUn_DptVFLtw6hv3nI9X',
    auth:'CFkh_WIb0yv5ItO9-joQNQ',
    p256dh:'BH1vMdvGDoBdZl4cYEcNf_fITj3nunFKQ7VKliwnqO_yUCFLcbkF4PsNbjWLelWLvg1hmJ62OUXDFmSgEX18Lak'
},{
    title:'Server',
    body:'Hello World',
    url:'/#/sign'
})