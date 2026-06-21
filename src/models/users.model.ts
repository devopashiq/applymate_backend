import mongoose, { InferSchemaType } from "mongoose";



const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    }
},{
    timestamps: true
})


export type UserDocument = InferSchemaType<typeof userSchema>

const UserModel = mongoose.model<UserDocument>("User",userSchema)


export default  UserModel;