import { Button, Spinner } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';


export default function ConcoursPage() {
    const { concoursSlug } = useParams();
    const [ loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [concours, setConcours] = useState(null);
    const [recentConcours, setRecentConcours] = useState(null); 


    useEffect(() => {
      const fetchConcours = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/post/getconcours?slug=${concoursSlug}`);
            const data = await res.json();
            if(!res.ok){
                setError(true);
                setLoading(false);
                return;
            }
            if(res.ok){
               setConcours(data.concours[0]);
               setLoading(false);
               setError(false);

            }
        } catch (error) {
           setError(true);
           setLoading(false); 
        }
      }
      fetchConcours();
    }, [concoursSlug]);


useEffect(() => {
     try {
      const fetchRecentConcours = async () => {
      const res = await fetch(`/api/post/getconcours?limit=3`);
      const data = await res.json();
       if (res.ok){
        setRecentConcours(data.concours);
       }
      }
      fetchRecentConcours();
     } catch (error) {
       console.log(error.message);
     }
}, [])


    if (loading) return (
       <div className='flex justify-center items-center min-h-screen'>
         <Spinner size='xl'/>
       </div> 
    )





  return (
  <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
    <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{concours && concours.title}</h1>
     <Link to={`/search?speciality=${concours && concours.speciality}`} className='self-center mt-5' >
       <Button color='gray' pill size='xl'>{concours && concours.speciality}</Button>
     </Link>
     <img src={concours && concours.image} alt={concours && concours.title} className='mt-10 p-3 max-h-[600px] w-full object-cover'/>  
       <div className='flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
        <span>{concours && new Date(concours.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{concours && (concours.content.length /1000).toFixed(0)} mins read</span>
        </div>
        
        <span className='p-3 max-w-xl font-serif mx-auto w-full post-content'>Date d'ouverture de l'inscription en ligne : {concours && concours.dateStart}</span>
        <span className='p-3 max-w-xl font-serif mx-auto w-full post-content'>Date de clôture de l'inscription en ligne :  {concours && concours.dateEnd}</span>
        <span className='p-3 max-w-xl font-serif mx-auto w-full post-content'> Nombre de poste : {concours && concours.postNumber}</span>
{/**<span className='text-xl p-1 font-serif max-w-xl mx-auto lg:text-xl'> Nombre de poste : {concours && concours.postNumber}</span> */}
        <div className='p-3 max-w-xl font-serif mx-auto w-full post-content' dangerouslySetInnerHTML={{__html: concours && concours.content}}>

        </div>
       
            <div className='max-w-4xl mx-auto w-full'>
                  <CallToAction />
            </div>
       <CommentSection concoursId={concours._id}/>

       <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Concours récents</h1>
        <div className=''>
           {
            recentConcours &&
            recentConcours.map((concours) => <PostCard key={concours._id} concours={concours}/>
           )}
        </div>
       </div>

       
        </main>
  );
}
