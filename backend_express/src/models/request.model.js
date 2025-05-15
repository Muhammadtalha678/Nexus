import mongoose from 'mongoose'

const RequestSchema = new mongoose.Schema({
    investorId:  { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    enterpreneurId:  { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
    status: {
        type:String,enum: ['Pending', 'Accepted', 'Rejected'],required:true,
    }
},
    {
    timestamps:true
})

const RequestModel = mongoose.model('requests', RequestSchema)

export default RequestModel