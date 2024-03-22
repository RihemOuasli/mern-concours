import { Alert, Button, FileInput, Label, Select, TextInput } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';




export default function UpdateConcours() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { concoursId } = useParams();

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);
  
  useEffect(() => {
   try {
    const fetchConcours = async () => {
    const res = await fetch(`/api/post/getconcours?concoursId=${concoursId}`);
    const data = await res.json();
    if (!res.ok) {
        console.log(data.message);
        setPublishError(data.message);
        return;
    }
    if(res.ok){
        setPublishError(null);
        setFormData(data.concours[0]);
    }
};
    fetchConcours();
} catch (error) {
      console.log(error.message);
   }
  }, [concoursId]);

  const handleUploadImage = async () => {
   try {
    if(!file) {
      setImageUploadError('Please select an image');
      return;
    }
    setImageUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + '-' + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageUploadError('Image upload failed');
        setImageUploadProgress(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUploadProgress(null);
          setImageUploadError(null);
          setFormData({ ...formData, image: downloadURL});
        });
      }
    );
   } catch (error) {
    setImageUploadError('Image upload failed');
    setImageUploadProgress(null);
    console.log(error);
   }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/post/updateconcours/${formData._id}/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if(!res.ok){
        setPublishError(data.message)
        return
      }
     
      if (res.ok){
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      
      <h1 className='text-center text-3xl my-7 font-semibold'>Update concours</h1>
    <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
    <Label value='Title of speciality'/>
      <div className='flex flex-col gap-4 sm:flex-row justify-between'>
        <TextInput type='text' placeholder='Title' required id='title'className='flex-1' onChange={(e) => setFormData({ ...formData, title: e.target.value })}
         value={formData.title}
        
        />
         
         <Select onChange={(e) => setFormData({ ...formData, speciality: e.target.value })}
          value={formData.speciality}
         >
          <option value="uncategorized">Select a speciality</option>
          <option value="Informatique">Informatique</option>
          <option value="Gestion">Gestion</option>
          <option value="Comptabilité">Comptabilité</option>
          <option value="Iconomie">Iconomie</option>
          <option value="Droit">Droit</option>
          <option value="Mécanique">Mécanique</option>
          <option value="Electrique">Electrique</option>
         </Select>
      </div>

      <Label value='Number of post'/>
      <div className='flex flex-col gap-4 sm:flex-row'>
       <TextInput type='number' placeholder='Number of post' required id='title'className='flex-1' onChange={(e) => 
       setFormData({ ...formData, postNumber: e.target.value })}  
       value={formData.postNumber}/>
        </div>

        <Label value='Start Date'/>
        <div className='flex flex-col gap-4 sm:flex-row'>
        <TextInput type='date' placeholder='Start date' required id='date'className='flex-1' onChange={(e) => 
            setFormData({ ...formData, dateStart: e.target.value })} 
            value={formData.dateStart}/>   
        </div>
        
        <Label value='End Date'/>
      <div className='flex flex-col gap-4 sm:flex-row'>
        <TextInput type='date' placeholder='End date' required id='date'className='flex-1' onChange={(e) => 
            setFormData({ ...formData,  dateEnd: e.target.value })} 
            value={formData.dateEnd}/>
        </div>


      <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
        <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])}/>
        <Button type='button' gradientDuoTone='purpleToBlue' size='sm' outline onClick={handleUploadImage} disabled={imageUploadProgress}>
       {imageUploadProgress ? (
        <div className='w-16 h-16'>
        <CircularProgressbar value={imageUploadProgress || 0} text={`${imageUploadProgress}%`} />
        </div>
        ) : (
          'Upload Image'
      )}
        </Button>
        </div>
         {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>} 
        {formData.image && (
          <img
          src={formData.image}
          alt='upload'
          className='w-full h-72 object-cover'
          />
        )}
        
        <ReactQuill theme='snow'  value={formData.content} placeholder='write something...' className='h-72 mb-12' required onChange={(value) => 
            setFormData({ ...formData, content: value })} 
           
            />  
        <Button type='submit' gradientDuoTone='purpleToPink'>Update concours</Button>
    {
      publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>
    }
    </form>
    
    
    </div>
  )
}








