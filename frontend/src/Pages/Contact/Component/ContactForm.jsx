import React from 'react'

export default function ContactForm() {
  return (
    <div className='bg-gradient-to-b  from-[#C6D8FD] to-[#207EFF] p-[1px] rounded-xl flex '> 
        <form className='px-4 py-10 rounded-xl bg-white space-y-6 w-full flex flex-col h-full'>
            <div className='flex flex-col '>
                <label htmlFor="name">Name <span className='text-red-500'>*</span></label>
                <input type="text" name="name" id="name" className='border border-primary-blue p-1 rounded' />
            </div>
             <div className='flex flex-col '>
                <label htmlFor="EmailAddress">Email Address<span className='text-red-500'>*</span></label>
                <input type="email" name="EmailAddress" id="EmailAddress" className='border border-primary-blue p-1 rounded' />
            </div>

            <div className='flex flex-col '>
                <label htmlFor="message">Message <span className='text-red-500'>*</span></label>
                <textarea name="message" id="message" cols="30" rows="5" className='border border-primary-blue p-1 rounded'></textarea>
            </div>

            <button className='bg-[#207EFF] w-[60%] max-[418px]:w-[100%] xl:w-[50%] block mx-auto py-1 px-4 rounded border  border-primary-blue shadow-xl text-sm font-medium text-primary-white hover:bg-white hover:text-primary-blue transition-all ease-in-out duration-300'>Send us a message</button>
        </form>
    </div>
  )
}
