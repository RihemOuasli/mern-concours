import { Table, Modal, Button } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';



export default function DashConcours() {
  const { currentUser } = useSelector((state) => state.user);
  const [userConcours, setUserConcours] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [concoursIdToDelete, setConcoursIdToDelete] = useState('');

   useEffect(() => {
       const fetchConcours = async () => {
        try {
          const res = await fetch(`/api/post/getconcours?userId=${currentUser._id}`)
          const data = await res.json()
         if(res.ok){
          setUserConcours(data.concours);
          if(data.concours.length < 9){
            setShowMore(false);
          }
         }
        } catch (error) {
          console.log(error.message)
        }
       };
      if(currentUser.isAdmin) {
        fetchConcours();
      }
   }, [currentUser._id])

  const handleShowMore = async () => {
    const startIndex = userConcours.length;
    try {
      const res = await fetch(`/api/post/getconcours?userId=${currentUser._id}&startIndex=${startIndex}`);
      const data = await res.json();
      if (res.ok){
               setUserConcours((prev) => [...prev, ...data.concours]);
          if (data.concours.length < 9) {
              setShowMore(false)
          }     
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteConcours = async () => {
       setShowModal(false);
       try {
        const res = await fetch(`/api/post/deleteconcours/${concoursIdToDelete}/${currentUser._id}`, {
           method: 'DELETE',
        }
        );
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          setUserConcours((prev) => 
             prev.filter((concours) => concours._id !== concoursIdToDelete)
          );
        }
       } catch (error) {
          console.log(error.message);
       }
  }

  return (
     <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
     
    {currentUser.isAdmin && userConcours.length > 0 ? (
       <>
      <Table hoverable className='shadow-md'>
        <Table.Head>
          <Table.HeadCell>Date updated</Table.HeadCell>
          <Table.HeadCell>Concours image</Table.HeadCell>
          <Table.HeadCell>Concours Title</Table.HeadCell>
          <Table.HeadCell>Speciality</Table.HeadCell>
          <Table.HeadCell>Post number</Table.HeadCell>
          <Table.HeadCell>Start date</Table.HeadCell>
          <Table.HeadCell>End date</Table.HeadCell>

          {/*<Table.HeadCell>content</Table.HeadCell>*/}

          <Table.HeadCell>Delete</Table.HeadCell>
          <Table.HeadCell>
            <span>Edit</span>
          </Table.HeadCell>
        </Table.Head>
        {userConcours.map((concours) => (
          <Table.Body className='divide-y'>
            <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
              <Table.Cell>
                {new Date(concours.updatedAt).toLocaleDateString()}
                </Table.Cell>
            <Table.Cell>
              <Link to={`/post/${concours.slug}`}>
                <img 
                  src={concours.image}
                  alt={concours.title}
                  className='w-20 h-10 object-cover bg-gray-500' />
              </Link>
            </Table.Cell>
               <Table.Cell>
                 <Link className='font-medium text-gray-900 dar:text-white' to={`/post/${concours.slug}`}>{concours.title}</Link>
               </Table.Cell>
               <Table.Cell>{concours.speciality}</Table.Cell>
               <Table.Cell>{concours. postNumber}</Table.Cell>
               <Table.Cell>{concours.dateStart}</Table.Cell>
              <Table.Cell>{concours.dateEnd}</Table.Cell>
              {/*<Table.Cell>{concours.content}</Table.Cell>*/}
        
               <Table.Cell>
                   <span onClick={() => {
                         setShowModal(true);
                         setConcoursIdToDelete(concours._id);
                   }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                    Delete
                   </span>
                </Table.Cell>
                <Table.Cell>
                  <Link className='text-teal-500 hover:underline' to={`/update-concours/${concours._id}`}>
                  <span>Edit</span>
                  </Link>
                   
                </Table.Cell>

            </Table.Row>
          </Table.Body>
        ) )}
      </Table>
      {
        showMore && (
         <button onClick={handleShowMore} className='w-full text-teal-500 self-center text-sm py-7'>
             show more
         </button>
        ) 
      }
      </>
    ) : (
      <p> You have no concours yet !</p>
    )}
<Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
           <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
           <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete this concours ?</h3>
           <div className='flex justify-center gap-4'>
            <Button color='failure' onClick={handleDeleteConcours}>Yes, I'm sure</Button>
            <Button color='gray' onClick={() => setShowModal(false)}>No, cancel</Button>
           </div>
            </div>
            </Modal.Body>

  
         
       </Modal>
    </div>
  );
}
