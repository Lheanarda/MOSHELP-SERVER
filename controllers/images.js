
const dotenv = require('dotenv');
dotenv.config({path:'../config/config.env'});

//@desc     Insert Images
//@route    POST /api/v1/images
exports.addImages = (req,res,next)=>{
    if(!req.files){
        res.status(400).json({
            "messages":"Please upload a file"
        });
        return;
    }

    const file = req.files.file;
    //Make sure a photo
    // if(file.size>1000000){
    //     res.status(400).json({
    //         "messages":"Please upload  image less than 1000000"
    //     });
    //     return
    // }

    //create custom filename
    file.name= `${Date.now()}_${file.name}`;
    file.mv(`public/images/${file.name}`,async err=>{
        if(err){
            console.error(err);
            res.status(400).json({
                success:false,
                messages:'Problem with file upload'
            });
            return
        }
        res.status(200).json({
            success:true,
            data:{
                imageUrl:`${process.env.ENDPOINT}/images/${file.name}`
            }
        })
    })
}