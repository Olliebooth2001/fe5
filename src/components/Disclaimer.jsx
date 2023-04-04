import React from 'react'
import moneyLogo from '../media/mooney.gif'
import Button from '@mui/material/Button';
import {AiOutlineClose,AiOutlineMenu,AiOutlineDashboard,AiOutlineInfoCircle,AiOutlineUpload,AiOutlineCaretDown,AiOutlineMessage} from 'react-icons/ai'
import Analytics from './Analytics'
import {Link} from 'react-scroll'
import diagram from '../media/OCR.png'




const Disclaimer = () => {
    return (
        <div>
          
          <div className="flex flex-row flex-wrap py-2 pt-9 bg-orange-700" id='dis'>

               
              
          <main role="main" className="w-full sm:w-2/3 md:w-3/12 pt-50 px-2 flex items-top justify-center ">
                  

                        <AiOutlineMessage className='text-stone-50 pt-2 pb-6'size={160}/>

                    </main>
                    <aside className="w-full sm:w-1/3 md:w-3/4 px-2">
                    <p className='text-[#fff] font-bold flex items-center text-3xl pb-5'>DISCLAIMER&nbsp; <AiOutlineInfoCircle size={30}/> </p>
                    <div className=''>
                  <p className='pb-5 text-[#fff]'>
                     &nbsp;Bank statements are not stored once they are uploaded and they are not accessible to anyone including the admin of this site
                  </p>
                  </div>
                    </aside>
                    
                    </div>
    
        </div>
      )
}

export default Disclaimer
