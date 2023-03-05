import React from 'react'
import Chart from '../media/chart.png'
import {AiOutlineClose,AiOutlineMenu,AiOutlineDashboard,AiOutlineInfoCircle,AiOutlineUpload} from 'react-icons/ai'
import diagram from '../media/OCR.png'


const Information = () => {
  return (
    <div>
      
      <div className='w-full bg-white py-16 px-4 z-10' id='info'>
          <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>

              <img className ='w-[600px] h-[600px]mx-auto my-10'src={diagram} alt="/"/>
              <div className='flex flex-col justify-center'>

                  <p className='text-[#00df90] font-bold flex items-center text-3xl pb-5'>HOW THE APPLICATION WORKS&nbsp; <AiOutlineInfoCircle size={30}/> </p>
                    <div className=''>
                  <p className='pb-5'>
                    <strong className='text-[#00df90]'>1.</strong>  &nbsp; Your bank statement is uploaded and is sent to be processed by Azure Form Recognizer.
                  </p>
                  <p className='pb-5'>
                    <strong className='text-[#00df90]'>2.</strong>  &nbsp; Azure Form Recogniser then user Optical Character Recognition to process your bank statement and pick out key value pairs. 
                  </p>
                  <p className='pb-5'>
                    <strong className='text-[#00df90]'>3.</strong>  &nbsp; Key value pairs are then processed and assigned to JavaScript variables. These are then presented to you in the form of charts and graphs via your dashboard below.
                  </p>
                  </div>
              </div>
          </div>
        
      </div>

    </div>
  )
}

export default Information
