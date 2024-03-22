import mongoose from "mongoose";

const concoursSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        default: 'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    speciality: {
        type: String,
        default: 'uncategorized',
    },
    dateStart: {
        type: String,
        required: true,
        unique: true,
    },
    dateEnd: {
        type: String,
        required: true,
        unique: true,
    },

    postNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
    },

}, { timestamps: true }
);

const Concours = mongoose.model('Concours', concoursSchema);

export default Concours;