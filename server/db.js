const mongoose = require("mongoose");
const MONGO_URI = "mongodb+srv://ansarikatib647:AwtThL2fOVmgydyl@cluster0.8yxpb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const MongoDB = async () => {

    try {
        await mongoose.connect(MONGO_URI);
            console.log("connected to MongoDB successfully :) "); 
    } catch (error) {
       console.log("error while connectig to DB : " , error.message);
    }

}

module.exports = MongoDB ;