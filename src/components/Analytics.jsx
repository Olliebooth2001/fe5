import React from 'react';
import Chart from '../media/chart.png';
import { Chart as ChartJS, BarElement,CategoryScale,LinearScale, Tooltip,Legend } from 'chart.js/auto';
import {Doughnut,Bar,Pie,Line} from 'react-chartjs-2';
import {AiOutlineClose,AiOutlineMenu,AiOutlineDashboard,AiOutlineInfoCircle,AiOutlineUpload} from 'react-icons/ai';
import { useState } from "react";
// import * as os from 'os';
// import {TmpFilesystem, awaitWriteFinish} from "like-fs";

const { DocumentAnalysisClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

// const fs = new TmpFilesystem({
// 	tmpDirectory: os.tmpdir() + '/my-project'
// });



function getNotUnique(array) {
  var map = new Map();
  array.forEach(a => map.set(a, (map.get(a) || 0) + 1));
  return array.filter(a => map.get(a) > 1);

}

const endpoint = "https://ollie-testfrom.cognitiveservices.azure.com/";
  const apiKey = "717032a4a8ea4d928a7401618329be07";
  const modelId = "d03e2758-8b7a-4d62-a953-eec10b1bd7ec";
  const path = "../media/document-4.pdf";
  //const readStream = fs.createReadStream('../media/chart.png');
 var readStream = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII";
  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

var month = "";
const map1 = new Map();
map1.set('week1', 0);
map1.set('week2', 0);
map1.set('week3', 0);
map1.set('week4', 0);



async function testSubmit2(){
  readStream="https://bankstatements.net/wp-content/uploads/2021/10/Halifax-Bank-Statement-BankStatements.net_.jpg"

  const poller = await client.beginAnalyzeDocument(modelId, readStream, {
    onProgress: ({ status }) => {
      console.log(`status: ${status}`);
    },
  });

  // There are more fields than just these three
  const { documents, pages, tables } = await poller.pollUntilDone();

  console.log("Documents:");
  for (const document of documents || []) {
    console.log(`Type: ${document.docType}`);
    console.log("Fields:");
    for (const [name, field] of Object.entries(document.fields)) {
      console.log(
        `Field ${name} has value '${field.value}' with a confidence score of ${field.confidence}`
      );
    }
  }
  console.log("Pages:");
  for (const page of pages || []) {
    console.log(`Page number: ${page.pageNumber} (${page.width}x${page.height} ${page.unit})`);
  }

  console.log("Tables:");
  for (const table of tables || []) {
    console.log(`- Table (${table.columnCount}x${table.rowCount})`);
    for (const cell of table.cells) {
      console.log(`  - cell (${cell.rowIndex},${cell.columnIndex}) "${cell.content}"`);
    }
  }
}
 

async function testSubmit() {
  


  const poller = await client.beginAnalyzeDocument(modelId, readStream, {
    onProgress: ({ status }) => {
      console.log(`status: ${status}`);
    },
  });
  const { documents, pages, tables } = await poller.pollUntilDone();
  console.log("Documents:");
  for (const document of documents || []) {
    console.log(`Type: ${document.docType}`);
    console.log("Fields:");
    for (const [name, field] of Object.entries(document.fields)) {
      console.log(
        `Field ${name} has value '${field.value}' with a confidence score of ${field.confidence}`
      );
    }
  }
  console.log("Pages:");
  for (const page of pages || []) {
    console.log(`Page number: ${page.pageNumber} (${page.width}x${page.height} ${page.unit})`);
  }
  const fruits = [];
  const moneyIn = [];
  console.log("Tables:");
  var totalSpent = 0;
  var totalMoneyIn = 0;
  var largest = fruits[0];
  var week1=0;var week2=0;var week3=0;var week4=0;
  var week1No=0;var week2No=0;var week3No=0;var week4No=0;
 
  var commonExpendature = [];
  for (const table of tables || []) {
    console.log(`- Table (${table.columnCount}x${table.rowCount})`);
    for (const cell of table.cells) {
      console.log(`  - cell (${cell.rowIndex},${cell.columnIndex}) "${cell.content}"`); 
      if(cell.columnIndex == 0 &&  cell.content != "" && cell.content.length <= 6 && cell.content.length>4){       
        month = cell.content.split(" ").pop();
        if(parseInt(cell.content.substring(0,2))<=7){
          week1 += parseInt(cell.content.substring(0,2));
          week1No+=1;
          var current1 = map1.get('week1');
          map1.set('week1',week1No);
        }
        else if(parseInt(cell.content.substring(0,2))>7 && parseInt(cell.content.substring(0,2))<=14){
          week2 += parseInt(cell.content.substring(0,2));
          week2No+=1;
          var current2 = map1.get('week2');
          map1.set('week2',week2No);
        }
        else if(parseInt(cell.content.substring(0,2))>14  && parseInt(cell.content.substring(0,2))<=23){
          week3 += parseInt(cell.content.substring(0,2));
          week3No+=1;
          map1.set('week3',week3No);
        }
        else if(parseInt(cell.content.substring(0,2))>23  && parseInt(cell.content.substring(0,2))<29){
          week4 += parseInt(cell.content.substring(0,2));
          week4No+=1;
          map1.set('week4',week4No);
        }
       }
      if(cell.columnIndex == 1 &&  cell.content != "" && cell.content.length>10){
        commonExpendature.push(cell.content);
       }
      if(cell.columnIndex == 2 && cell.content.toLowerCase().indexOf("£") === -1 && cell.content != ""){
       fruits.push(cell.content);
      }
      if(cell.columnIndex == 3 && cell.content.toLowerCase().indexOf("£") === -1 && cell.content != ""){
        moneyIn.push(cell.content);
      }
    }
    fruits.forEach(item =>{
      totalSpent +=parseFloat(item);
    });
    moneyIn.forEach(item =>{
      totalMoneyIn +=parseFloat(item);
    });
    console.log('brooooo '+totalSpent/2);
    var monthlyIncome = totalMoneyIn/2;
    var monthExpendature = (totalSpent/2)/30;
    var averageDailyMoneyIn = (totalMoneyIn/2)/30;
    var netBalanceIncreaseDecrease =  totalMoneyIn-totalSpent;
    document.getElementById('totalExpendature').innerText='Total Expendature over the month - £' + (totalSpent/2).toFixed(2);
    document.getElementById('averageExpendature').innerText='Average Daily Expendature over the month - £' +  monthExpendature.toFixed(2);
    document.getElementById('totalMoneyIn').innerText='Total Money In over the month - £' +  monthlyIncome.toFixed(2);
    document.getElementById('averageMoneyIn').innerText='Average Money In over the month - £' +  averageDailyMoneyIn.toFixed(2);

    if(  monthExpendature >monthlyIncome){
      document.getElementById('netSpend').innerText='Net spend over the month - £' +  netBalanceIncreaseDecrease.toFixed(2);
    }
    else{
      document.getElementById('netSpend').innerText='Net spend over the month - £' +  netBalanceIncreaseDecrease.toFixed(2);
    }

    const uniqueSet = new Set(moneyIn);
    const filteredElements = moneyIn.filter(currentValue => {
          if (uniqueSet.has(currentValue)) {
             uniqueSet.delete(currentValue);
          }
          else {
             return currentValue;
          }
       }
    );
    console.log('ello ello' + filteredElements)
    console.log(getNotUnique(moneyIn))
    let mf = 1;
    let m = 0;
    let item;

    for (let i=0; i<commonExpendature.length; i++)
      {
        for (let j=i; j<commonExpendature.length; j++)
        {
                if (commonExpendature[i] == commonExpendature[j])
                 m++;
                if (mf<m)
                {
                  mf=m; 
                  item = commonExpendature[i];
                }
        }
        m=0;
    }
    var numberOfCommonTrans = mf;
    document.getElementById('commonSpend').innerText=`Most common transaction: ${item} ( ${mf} times )  `;
    document.getElementById('percentOfTotalTransactions').innerHTML = ((numberOfCommonTrans/commonExpendature.length)*100).toFixed(2) +'% of total transactions'


    if(month == "Jan"){
      month="January";
    }else if(month == "Feb"){
      month="February";
    }else if(month == "Mar"){
      month="March";
    }else if(month == "Apr"){
      month="April";
    }else if(month == "Jun"){
      month="June";
    }else if(month == "Jul"){
      month="July";
    }else if(month == "Aug"){
      month="August";
    }else if(month == "Sep"){
      month="September";
    }else if(month == "Oct"){
      month="October";
    }else if(month == "Nov"){
      month="November";
    }else if(month == "Dec"){
      month="December";
    }
    document.getElementById('weeklySpending').innerHTML = ' Month of '+ month + ' number of transactions per week \n</br>' + month + ' 1<sup>st</sup> - 7<sup>th</sup>:  \n' + map1.get('week1')+'</br>  ' + month + ' 7<sup>th</sup> - 14<sup>th</sup>:  \n' + map1.get('week2')+'</br>  ' + month + ' 14<sup>th</sup> - 21<sup>st</sup>:  \n' + map1.get('week3')+'</br>  ' + month + ' 21<sup>st</sup> - End Of Month:  \n' + map1.get('week4')+'</br>  ' 
  }
  
}


testSubmit().catch((err) => {
  console.error("The sample encountered an error:", err);
});


var data = {
  labels: ["1-7","7-14","14-21","21-End Of the Month"],
  datasets:[
    {
      label:"July",
      data:[6,10,4,6],
      backgroundColor:'#75485E',
      borderColor:'#75485E',
      borderWidth:2,
    },
    {
      label:"July",
      data:[5,19,3,5],
      backgroundColor:'#CB904D ',
      borderColor:'#CB904D',
      borderWidth:2,
      
    },
]
};
var netSpendMonth1 = {
  labels: ["Money In","Money Out"],
  datasets:[
    {
      label:"July",
      data:[500,400],  
    }
]
};
var netSpendMonth2 = {
  labels: ["Money In (£)","Money Out (£)"],
  datasets:[
    {
      label:"July",
      data:[800,200],  
    }
]
};

var mostCommon1 = {
  labels: ["June","July"],
  datasets:[
    {
      label:"Most Common Transaction",
      data:[70,50],  
    },
    {
      label:"All Other Transactions",
      data:[100,100],  
    }
]
};
var expensive = {
  labels: ["June","July"],
  datasets:[
    {
      label:"Most Expensive Transaction (£)",
      data:[750,350],  
    },
    {
      label:"Average Transaction Cost (£)",
      data:[100,100],  
    }
]
};





const Analytics = () => {

  var chartReference = {};

const data2 = {
  labels: ["1-7","7-14","14-21","21-End Of the Month"],
  datasets:[
    {
      label:"July",
      data:[6,10,4,6],
      backgroundColor:'#75485E',
      borderColor:'#75485E',
      borderWidth:2,
    },
    {
      label:"July",
      data:[5,19,3,5],
      backgroundColor:'#CB904D ',
      borderColor:'#CB904D',
      borderWidth:2,
      
    },
]
};

var data3 = {
  labels: ["1-7","7-14","14-21","21-End Of the Month"],
  datasets:[
    {
      label: month,
      data:[map1.get('week1'),map1.get('week2'),map1.get('week3'),map1.get('week4')],
      backgroundColor:'#75485E',
      borderColor:'#75485E',
      borderWidth:2,
    },
    {
      label:"July",
      data:[5,19,3,5],
      backgroundColor:'#CB904D ',
      borderColor:'#CB904D',
      borderWidth:2,
      
    },
]
};

const options2 = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const [datav, setData] = useState(data2); // REMOVED BRACKETS
const [options, setOptions] = useState(options2); // REMOVED BRACKETS

const updatePlot = () => {
  setData(data3);
  setOptions(options2); // This is redundant for the purpose
};


  return (
    <div>

      <input type='file' onChange={testSubmit}/>

      <div className='flex flex-auto justify-center' id='dash'>
            <button onClick={testSubmit} className ='bg-[#00df9a] w-[300px] rounded-md font-bold my-6 mx-auto py-6 text-black flex flex-row justify-center hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'> <AiOutlineUpload size={30}></AiOutlineUpload>UPLOAD FIRST STATEMENT</button>
            <button onClick={testSubmit2} className ='bg-[#00df9a] w-[300px] rounded-md font-bold my-6 mx-auto py-6 text-black flex flex-row justify-center hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'> <AiOutlineUpload size={30}></AiOutlineUpload>UPLOAD SECOND STATEMENT </button>
      </div>

      <div className='font-bold text-[white] text-center text-3xl items-center '><p>UPLOAD BANK STATEMENTS TO SEE<br/> YOUR SPENDING STATS</p></div>

     {/* <div className='w-full bg-black py-16 px-4 opacity-[.05] z-40' >  */}


            <div class="container mx-auto w-full bg-white py-16 px-4 z-10">
            <div class="flex flex-row flex-wrap py-2">
               
                <main role="main" class="w-full sm:w-2/3 md:w-6/12 pt-1 px-2 ">
                <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Transactions Over June Compared to July</h1>

                    <Line data={datav} options={options} onUpdate={updatePlot}/>
                    <button onClick={updatePlot}>yooo</button>
                </main>
                
                
                <aside class="w-full sm:w-1/3 md:w-2/4 px-2">
                <div class="top-0 p-4 w-full">
                <p className='text-[#00df90] font-bold  text-l'>Transactions Over Each Month</p>

                <span>These bar charts show how your transactions frequency differs from month to month. From this you can work out whether you are spending too much and having to budget later in the month or have a relatively even spending habit.<br/><br/> <strong>Summary:</strong><br/></span>


                <span id='month1Title'><strong><br/>July </strong>  </span>
                <span id='month1Summary'><br/>Highest Transactions : <strong>1-7</strong><br/></span>
                <span id='month1Summary'>Lowest Transactions : <strong> 7-14</strong><br/></span>

                <span id='month1Title'><strong><br/>July </strong>  </span>
                <span id='month1Summary'><br/>Highest Transactions : <strong>1-7</strong><br/></span>
                <span id='month1Summary'>Lowest Transactions : <strong> 7-14</strong></span>

                <span><strong id=''></strong></span>


                </div>
                 </aside>
            </div>

            <div className='w-full bg-black h-0.5'></div>
            <div class="flex flex-row flex-wrap py-2 pt-9">
            <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Net Spend</h1>

               
               <main role="main" class="w-full sm:w-2/3 md:w-3/12 pt-20 px-2 ">
                   <Doughnut data={netSpendMonth1}/>
               </main>
               <main role="main" class="w-full sm:w-2/3 md:w-3/12 pt-20 px-2 ">
                   <Doughnut data={netSpendMonth2}/>
               </main>
          <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
               <div class="top-0 p-4 w-full">
               <p className='text-[#00df90] font-bold  text-l'>Net Spend</p>

               <span>These pie charts give you a clear picture of how your balance has increased / decreased over the course of the year and how this compares between months<br/><br/> <strong>Summary:</strong><br/></span>


               <span id='month1Title'><strong><br/>July </strong>  </span>
               <span id='month1Summary'><br/>Net Balance : <strong> +500</strong><br/></span>

               <span id='month1Title'><strong><br/>July </strong>  </span>
               <span id='month1Summary'><br/>Net Balance : <strong>-700</strong><br/></span>

               <span><strong id=''></strong></span>


               </div>
                </aside>
           </div>
           <div className='w-full bg-black h-0.5'></div>
            <div class="flex flex-row flex-wrap py-2 pt-9">

               
              
               <main role="main" class="w-full sm:w-2/3 md:w-6/12 pt-20 px-2 ">
               <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Most Common</h1>

                   <Bar data={mostCommon1}/>
               </main>
          <aside class="w-full sm:w-1/3 md:w-2/4 px-2">
               <div class="top-0 p-4 w-full">
               <p className='text-[#00df90] font-bold  text-l pt-10'>Comparing Most Common Transaction</p>

               <span>These pie charts give you a clear picture of how your balance has increased / decreased over the course of the year and how this compares between months<br/><br/> <strong>Summary:</strong><br/></span>


               <span id='month1Title'><strong><br/>July </strong>  </span>
               <span id='month1Summary'><br/>Most Common Transaction : <strong> Transfer to 109092</strong><br/> Made up 7% of all transactions</span>

               <span id='month1Title'><strong><br/>June </strong>  </span>
               <span id='month1Summary'><br/>Most Common Transaction : <strong>CARD PAYMENT TO Jupiter</strong><br/>Made up 9% of all transactions</span>

               <span><strong id=''></strong></span>

                
               </div>
                </aside>
           </div>

           <div className='w-full bg-black h-0.5'></div>
            <div class="flex flex-row flex-wrap py-2 pt-9">

               
              
               <main role="main" class="w-full sm:w-2/3 md:w-6/12 pt-20 px-2 ">
               <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Most Expensive</h1>

                   <Bar data={expensive}/>
               </main>
          <aside class="w-full sm:w-1/3 md:w-2/4 px-2">
               <div class="top-0 p-4 w-full">
               <p className='text-[#00df90] font-bold  text-l pt-10'>Comparing Most Expensive Transaction</p>

               <span>These pie charts give you a clear picture of how your balance has increased / decreased over the course of the year and how this compares between months<br/><br/> <strong>Summary:</strong><br/></span>


               <span id='month1Title'><strong><br/>July </strong>  </span>
               <span id='month1Summary'><br/>Most Expensive Transaction : <strong> £500</strong></span>

               <span id='month1Title'><strong><br/>June </strong>  </span>
               <span id='month1Summary'><br/>Most Expensive Transaction : <strong>£750</strong></span>

               <span><strong id=''></strong></span>

                
               </div>
                </aside>
           </div>
           </div>
        {/* </div> */}
   
    
          <div className='text-white'>Stats<br/>
      <span id='numberOfPages'> </span>
      <span id='totalColumnsScanned'></span>
      <span id='totalRowsScanned'> </span>

      <span id='totalExpendature'> </span>
      <span><br/></span>
      <span id='averageExpendature'></span>
      <span><br/></span>
      <span id='totalMoneyIn'> </span>
      <span><br/></span>
      <span id='averageMoneyIn'></span>
      <span><br/></span>
      <span id='netSpend'></span>
      <span><br/></span>
      <span id='commonSpend'></span>
      <span><br/></span>
      <span id='percentOfTotalTransactions'></span>
      <span><br/></span>
      <span id='weeklySpending'></span>
  
      </div> 
        
      </div>
  )
}

export default Analytics
