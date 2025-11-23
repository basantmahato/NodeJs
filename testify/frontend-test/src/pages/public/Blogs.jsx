import React, { useEffect, useState } from 'react'
import api from '../../api/axios'

export default function Blogs(){
  const [blogs, setBlogs] = useState([])

  useEffect(()=>{
    api.get('/content/blogs')
      .then(res => setBlogs(res.data))
      .catch(()=>{})
  },[])

  return (
    <div className='page'>
      <h2>Blogs</h2>
      <div>
        {blogs.length === 0 && <p>No blogs yet.</p>}
        {blogs.map(b => (
          <article key={b._id} className='card'>
            <h3>{b.title}</h3>
            <p>{b.content.slice(0,200)}...</p>
            <small>By: {b.author?.username || 'Unknown'}</small>
          </article>
        ))}
      </div>
    </div>
  )
}
