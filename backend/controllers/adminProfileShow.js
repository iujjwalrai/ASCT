const Admin = require("../models/Admin");


exports.adminProfileShow = async(req, res)=>{
    try{
        console.log(req.admin);
        const id = req.admin.id;

        let foundAdmin = await Admin.findById(id);

        if(!foundAdmin){
            return res.status(403).json({
                success: false,
                message: "Admin not found"
            })
        }
        else{
            console.log(foundAdmin);
            foundAdmin = foundAdmin.toObject();

            foundAdmin.password = undefined;

            return res.status(200).json({
                success: true,
                messgae: "Admin found successfully",
                admin: foundAdmin
            })

        }
    }
    catch(error){
        return res.status(500).json({
            success: false,
            messgae: "Internal Serevr Error"
        })
    }
}