const SahyogList = require("../models/SahyogList");

exports.createSahyog = async(req, res)=>{
    try{
        const {name, user, description, amount, isCompleted, nomineeAccount1No, nomineeAccount1ifsc, nomineeAccount2No, nomineeAccount2ifsc, nomineeName} = req.body;
        if(!name ||  !user || !description ||  !amount){
            return res.status(401).json({
                success: false,
                messgage: "Fill all details carefully"
            })
        }

        const createdSahyog = await  SahyogList.create({name, user, description, amount, isCompleted, nomineeAccount1No, nomineeAccount1ifsc, nomineeAccount2No, nomineeAccount2ifsc, nomineeName});

        return res.status(200).json({
            sucess: true,
            message: "Sahyog created successfully",
            createdSahyog
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: true,
            message: "Sahyog cannot be created! Internal server error"
        })
    }
}