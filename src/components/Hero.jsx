import React from 'react'
import moneyLogo from '../media/mooney.gif'
import Button from '@mui/material/Button';
import {AiOutlineClose,AiOutlineMenu,AiOutlineDashboard,AiOutlineInfoCircle,AiOutlineUpload,AiOutlineCaretDown} from 'react-icons/ai'
import Analytics from './Analytics'
import {Link} from 'react-scroll'




const Hero = () => {
  return (
    
    <div className='text-white bg-gradient-to-t from-gray-700 via-black to-black' id='hero'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>USING OCR TO ANALYSE BANK STATEMENTS</p>
        
        <div id='middle'>
            <img src={moneyLogo} className='mx-auto'></img>
            <p className ='md:text-5xl sm:text-4xl text-xl font-bold py-4'> Track Spending and Cut Costs</p>
        </div>

        <p className='md:text-2xl text-xl font-bold text-gray-500 p-top p-4' >Upload your bank statement now to visualise your spending   </p>
        
        {/* <a className='bg-[#00df9a] w-[300px] rounded-md font-bold my-6 mx-auto py-6 text-black flex flex-row justify-center  hover:bg-gray-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'><Link activeClass="active" to="heading1" spy={true} smooth={true}>UPLOAD NOW </Link><AiOutlineArrowDown size={20}/></a>  */}
       
        <div class="flex justify-center">

        <button id ='scrollToUploadBtn'class="bg-[#00B27B] hover:bg-[#004731] text-white font-bold py-2 px-4 rounded-full w-40">
        <Link activeClass="active" to="heading1" spy={true} smooth={true}>Upload </Link>  <div class="flex justify-center">
            <AiOutlineCaretDown style={{alignText:'center'}}size={30}/></div>
            
        </button>
        </div>
      
      
      
       </div>
    </div>
  )
}

export default Hero
