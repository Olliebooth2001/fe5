import React from 'react'
import Chart from '../media/chart.png'
import { Chart as ChartJS } from 'chart.js/auto'
import {Doughnut} from 'react-chartjs-2'


const data = {

  labels: ["Red","Blue","Yellow","Green","Purple","Orange"],
  datasets:[{
      data:[12,19,3,5,2,3]
  }]

};
const Analytics = () => {
  return (
    <div>
    <div className='z-50 text-[#fff] opacity-[1]  flex items-center justify-center '>You must upload a pdf statement to view your dashboard</div>

    {/* <div className='w-full bg-black py-16 px-4 opacity-[.05] z-40'> */}
   
      <div className='w-full bg-white py-16 px-4 z-10' id='analytics'>
          <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>

            <div className='w-6/12'>
             <Doughnut data={data} /> 

             </div>

                  <p className='text-[#00df90] font-bold'>STATEMENT DASHBOARD</p>
                  <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>View Your Statement Breakdown</h1>
                  <p className=''>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam sit doloribus voluptates cum hic quia laudantium ducimus adipisci fugiat ex eius error animi fugit voluptate atque, blanditiis in molestiae et.
                  </p>

                

              </div>
          </div>
        
      </div>
  )
}

export default Analytics
