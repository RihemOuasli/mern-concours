import React from 'react'
import { Link } from 'react-router-dom'

export default function PostCard({ concours }) {
  return (
    <div>
      <Link to={`/post/${concours.slug}`}>
        <img src={concours.image} alt='post cover' className='h-[260px]'/>
      </Link>

    </div>
  )
}
