import React from 'react'

export default function About() {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-3 text-center'>
        <div>
          <h1 className='text-5xl font-semibold text-center my-7'>About Aakash's Blog</h1>
          <div className='text-lg text-gray-500 flex flex-col gap-6'>
          <p>
            Welcome to Aakash's Blog! <br /> Created by Aakash Choudhary,
            this blog serves as a personal project where he shares his thoughts and
            ideas with the world. Aakash, a passionate developer, loves writing about
            technology, coding, and everything in between. <br />
          </p>
          <p>
            On this blog, you'll find weekly articles and tutorials on topics
            such as web development, software engineering, and programming languages.
            Aakash is always learning and exploring new technologies, so be sure to check 
            back often for new content! <br />
          </p>
          <p>
            We encourage you to leave comments on our posts and engage with other readers.
            You can like other people's comments and reply to them as well.
            We believe that a community of learners can help each other grow and improve.
          </p>
            
          </div>
        </div>
      </div>
    </div>
  )
}
