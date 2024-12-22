exports.logoutCon = async (req, res)=>{
    try{
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
        });

        return res.status(200).json({ success: true, message: "Logged out successfully" });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Logging out failed"
        });
    }
}