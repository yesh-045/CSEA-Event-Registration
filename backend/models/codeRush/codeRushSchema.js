import mongoose from 'mongoose';

const CodeRushSchema = new mongoose.Schema({
    teamName: {
        type: String,
        required: true
    },
    teamMembers: [
        {
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
                enum: [1, 2], // Allows only 1 or 2 as values
                required: true
            },
            roll_no: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

const CodeRush = mongoose.model('CodeRush', CodeRushSchema);
export default CodeRush;
