import mongoose from "mongoose";

const diseaseSchema = new mongoose.Schema({
    name:{
        type:String,
        require : true,
        trim :true,
    },
},{timestamps:true});

export default mongoose.model("Disease", diseaseSchema);