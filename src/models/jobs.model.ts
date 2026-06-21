import mongoose, { InferSchemaType } from "mongoose";




const jobSchema = new mongoose.Schema({

    company:{
        type:String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status:{
        type: String,
        default: "Applied",
        enum:["Applied", "Interview", "Offer", "Rejected"]
    },
    //,
    // connections:{
    //     type:[mongoose.Schema.Types.ObjectId],
    //     ref:"Connection",
    //     defalut: []
    // },

    userId:{
         type:mongoose.Schema.Types.ObjectId,
          ref:"User",
          required: true
   

    }

    
},{
    timestamps: true
});

export type  JobDocument = InferSchemaType<typeof jobSchema>


const JobModel = mongoose.model<JobDocument>("Job", jobSchema);
export default JobModel;