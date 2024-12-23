exports.logoutCon = async (req, res)=>{
    try{
        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
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