const Datasource = require('../datasources/Datasource');
const { pushNotif } = require('../helpers/push-notification');

exports.addSubscription = async(req,res,next)=>{
    const input = req.body.data;
    const result = await Datasource().SubscriptionDatasource.addSubscription(input);
    if(result.success){
        //SEND NOTIFICATION
        pushNotif(input,{
            title:`SUBSCRIBED`,
            body:`We will notify your document updates!`,
            url:'/'
        })
        res.status(200).json({
            success:true,
            message:'Subscribed successfully'
        })
    }else{
        res.status(500).json({
            success:false,
            message:result.message
        })
    }
}

exports.deleteSubscription = async(req,res,next)=>{
    const input = {
        endpoint : req.body.endpoint
    };

    const result = await Datasource().SubscriptionDatasource.deleteSubscription(input);
    if(result.success){
        res.status(200).json({
            success:true,
            message:'You have unsubscribe from MOSHELP Notification'
        })
    }else{
        result.status(500).json({
            success:false,
            message:result.message
        })
    }
}
