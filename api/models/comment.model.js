import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    },
    concoursId: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    likes: {
        type: Array,
        default: [],
    },
    numberOfLikes: {
        type: Number,
        default: 0,
    },
}, { timestamps: true}
);

const Commentaire = mongoose.model('Commentaire', commentSchema);
export default Commentaire;