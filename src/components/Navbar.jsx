import React, {useState} from 'react'
import {AiOutlineClose,AiOutlineMenu,AiOutlineDashboard,AiOutlineInfoCircle,AiOutlineUpload} from 'react-icons/ai'
import {Link} from 'react-scroll'
import mLog from '../media/m..png'

const Navbar = () => {


    const [nav, setNav] = useState(false)

    const navHandler = () =>{
        setNav(!nav)
    }
  return (
    <div className='flex justify-between items-center h-24 max-w-[1240] px-4 text-white'>
        <img src={mLog} style={{ width: 60, height: 60 }}></img>
        <ul className='hidden md:flex'>

    

            <p className="m-16 relative group">
            <li className='p-4 font-bold tracking-widest flex items-center cursor-pointer'>UPLOAD <AiOutlineUpload size={20}/></li>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-blue-400 transition-all group-hover:w-full"></span>
            </p>

            <p className="m-16 relative group">
                <li className='p-4 font-bold tracking-widest flex items-center cursor-pointer'><Link activeClass="active" to="info" spy={true} smooth={true}>INFORMATION</Link><AiOutlineInfoCircle size={20}/></li>
                <span className="absolute -bottom-1 left-0 w-0 h-1 bg-blue-400 transition-all group-hover:w-full"></span>
            </p>

            <p className="m-16 relative group">
            <li className='p-4 font-bold tracking-widest flex items-center cursor-pointer'><Link activeClass="active" to="analytics" spy={true} smooth={true}>DASHBOARD</Link>  <AiOutlineDashboard size={20}/></li>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-blue-400 transition-all group-hover:w-full"></span>
            </p>
            


        </ul>

        {/* <div onClick={navHandler} className='block md:hidden'>
            {!nav ? <AiOutlineClose size={20}/>:<AiOutlineMenu size={20}/>}
            
        </div>
        <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500':'fixed left-[-100%]'}>
        <h1 className='w-full text-3xl font-bold text-[#00df9a] m-4'>MOOLAH.</h1>

            <ul className='uppercase p-4'>
            <li className='p-4 border-b border-gray-600  flex items-center' >UPLOAD <AiOutlineUpload size={20}/></li>
            <li className='p-4 border-b border-gray-600 flex items-center'>INFORMATION <AiOutlineInfoCircle size={20}/></li>
            <li className='p-4 border-gray-600 flex items-center'>DASHBOARD<AiOutlineDashboard size={20}/></li>
        
            </ul>
        </div> */}
    </div>
  )
}

export default Navbar
