import { Button } from 'flowbite-react'
import React from 'react'

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center item-center rounded-tl-3xl rounded-br-3xl
    text-center'>
        <div className='flex-1 justify-center flex flex-col'>
            <h2 className='text-2xl'>
               <b>Want to get some career guidance?</b> 
            </h2>
            <p className='text-gray-500 my-2'>
            Unlock your potential with expert career guidance—gain industry insights, perfect your resume, ace interviews,
            and connect with professional networks.
            </p>
            <Button gradientDuoTone ='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
            <a href="#" target='_blank' rel='noopener noreferrer'>
                Learn More
            </a>
            </Button>
        </div>
        <div className='p-7 flex-1'>
            <img src="https://gradicominds.com/wp-content/uploads/2022/03/career-guidance.jpg"/>
        </div>
    </div>
  )
}
