import React from 'react'
import { Button } from 'flowbite-react';
export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
       <div className='flex-1 justify-center flex flex-col'>
        <h2 className='text-2xl'>
        Veux-tu participer à ce concours ?
        </h2>
        <p className='text-gray-500 my-2'> 
        Cliquez sur ce bouton pour participer au concours
        </p>
        <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>Participez à ce concours </Button>
       </div>
       <div className='p-7 flex-1'>
        
        <img src='https://www.mlfmonde.org/wp-content/uploads/2018/10/recrutement-enseignants-banniere-18-19.gif' />
        
        </div> 
    </div>
  )
}
