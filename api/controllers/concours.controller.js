import Concours from "../models/concours.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async (req, res, next) => {
    
  
    if(!req.user.isAdmin){
        return next(errorHandler(403, 'You are not allowed to create a post'));
    }
    if(!req.body.title || !req.body.content) {
        return next(errorHandler(400, 'Please provide all required fields'))
    }
    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');
    const newConcours = new Concours ({
        ...req.body, slug, userId: req.user.id
    
    });
    try {
        const savedConcours = await newConcours.save();
        res.status(201).json(savedConcours);
    } catch (error) {
        next(error);
    }
};



export const getconcours = async (req, res, next) => {
   try {
    const startIndex = parseInt(req.query.startIndex) || 0 ; 
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1 ;
    const concours = await Concours.find({
          ...(req.query.userId && { userId: req.query.userId }),
          ...(req.query.speciality && { speciality: req.query.speciality }),
          ...(req.query.slug && { slug: req.query.slug }),
          ...(req.query.concoursId && { _id: req.query.concoursId }),
          ...(req.query.searchTerm && {
               $or: [
                { title: { $regex: req.query.searchTerm, $options: 'i'} },
                { content: { $regex: req.query.searchTerm, $options: 'i'} },
               ],
           }), 
        }).sort({ updatedAt: sortDirection }).skip(startIndex).limit(limit);
       
        const totalConcours = await Concours.countDocuments();

         const now = new Date();

         const oneMonthAgo = new Date(
            now.getFullYear(),
            now.getMonth(),
            now.getDate()
         );

        const lastMonthConcours = await Concours.countDocuments({
            createdAt: { $gte: oneMonthAgo },
        }); 
      
        res.status(200).json({
            concours,
            totalConcours,
            lastMonthConcours,    
        });

   } catch (error) {
    next(error);
   } 
}

//Supprimer concours
export const deleteconcours = async (req, res, next) => {
   if (!req.user.isAdmin || req.user.id !== req.params.userId) {
       return next(errorHandler(403, 'You are not allowed to delete this concours'));
   } 
   try {
    await Concours.findByIdAndDelete(req.params.concoursId);
    res.status(200).json('The post has been deleted');
   } catch (error) {
    next(error);
   }
};

//Modifier concours

export const updateconcours = async (req, res, next) => {
    if (!req.user.isAdmin || req.user.id !== req.params.userId) {
           return next(errorHandler(403, 'You are not allowed to update this post'));

    }
    try {
        const updatedConcours = await Concours.findByIdAndUpdate(
            req.params.concoursId,
            {
                $set: {
                   title: req.body.title,
                   content: req.body.content,
                   speciality: req.body.speciality,
                   dateStart: req.body.dateStart,
                   dateEnd: req.body.dateEnd,
                   postNumber: req.body.postNumber,
                   image: req.body.image,
                }}, { new: true})
            res.status(200).json(updatedConcours) 
            }
        
     catch (error) {
        next(error);
    }
};