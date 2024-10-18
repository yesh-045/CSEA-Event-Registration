import mongoose from 'mongoose';
const CodeRushSchema = new mongoose.Schema({
    teamName : 
    {
        type : String,
        required : true
    },

    teamMembers: [{
        studentName: {
            type: String,
            required: true
        },
        department: {
            type: String,
            required: true
        },
        yearOfStudy: {
            type: Number,
            enum: [1, 2],
            required: true
        }
    }],
}, {
    timestamps: true
});
const CodeRush = mongoose.model('Code-Rush', CodeRushSchema);
export default CodeRush;