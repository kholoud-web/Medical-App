import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessage, clearSuccess, clearError } from '@/RiduxToolkit/Slices/SystemSettingSlice'

export default function ContactForm() {
  const dispatch = useDispatch()
  const { loading, error, successMessage } = useSelector((state) => state.systemSetting)
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    dispatch(sendMessage(formData))
      .unwrap()
      .then(() => {
        // Clear form on success
        setFormData({
          fullName: '',
          email: '',
          message: ''
        })
        // Auto-clear success message after 5 seconds
        setTimeout(() => dispatch(clearSuccess()), 5000)
      })
      .catch((err) => {
        console.error('Send message failed:', err)
        // Auto-clear error after 5 seconds
        setTimeout(() => dispatch(clearError()), 5000)
      })
  }

  return (
    <div className='bg-gradient-to-b from-[#C6D8FD] to-[#207EFF] p-[1px] rounded-xl flex'> 
      <form onSubmit={handleSubmit} className='px-4 py-10 rounded-xl bg-white space-y-6 w-full flex flex-col h-full'>
        {/* Success Message */}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {successMessage}
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {typeof error === 'string' ? error : JSON.stringify(error)}
          </div>
        )}

        <div className='flex flex-col'>
          <label htmlFor="fullName">Name <span className='text-red-500'>*</span></label>
          <input 
            type="text" 
            name="fullName" 
            id="fullName" 
            value={formData.fullName}
            onChange={handleChange}
            required
            className='border border-primary-blue p-1 rounded' 
          />
        </div>
        
        <div className='flex flex-col'>
          <label htmlFor="email">Email Address<span className='text-red-500'>*</span></label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            required
            className='border border-primary-blue p-1 rounded' 
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor="message">Message <span className='text-red-500'>*</span></label>
          <textarea 
            name="message" 
            id="message" 
            cols="30" 
            rows="5" 
            value={formData.message}
            onChange={handleChange}
            required
            className='border border-primary-blue p-1 rounded'
          ></textarea>
        </div>

        <button 
          type="submit"
          disabled={loading}
          className='bg-[#207EFF] w-[60%] max-[418px]:w-[100%] xl:w-[50%] block mx-auto py-1 px-4 rounded border border-primary-blue shadow-xl text-sm font-medium text-primary-white hover:bg-white hover:text-primary-blue transition-all ease-in-out duration-300 disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {loading ? 'Sending...' : 'Send us a message'}
        </button>
      </form>
    </div>
  )
}
