import React from 'react'
import moneyLogo from '../media/mooney.gif'
import {AiOutlineClose,AiOutlineMenu,AiOutlineDashboard,AiOutlineInfoCircle,AiOutlineUpload} from 'react-icons/ai'


const { DocumentAnalysisClient, AzureKeyCredential } = require("@azure/ai-form-recognizer");

const fs = require("fs");

function getNotUnique(array) {
  var map = new Map();
  array.forEach(a => map.set(a, (map.get(a) || 0) + 1));
  return array.filter(a => map.get(a) > 1);
}

async function testSubmit() {
  const endpoint = "https://ollie-testfrom.cognitiveservices.azure.com/";
  const apiKey = "717032a4a8ea4d928a7401618329be07";
  const modelId = "d03e2758-8b7a-4d62-a953-eec10b1bd7ec";
  const path = "../media/document-4.pdf";

  const readStream = "https://bankstatements.net/wp-content/uploads/2021/11/Nationwide-Bank-Statement-BankStatements.net_.jpg";

  const client = new DocumentAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
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
  const fruits = [];
  const moneyIn = [];
  console.log("Tables:");
  var totalSpent = 0;
  var totalMoneyIn = 0;
  var largest = fruits[0];
  
  var week1=0;
  var week2=0;
  var week3=0;
  var week4=0;

  var week1No=0;
  var week2No=0;
  var week3No=0;
  var week4No=0;
  var month = "";
  const map1 = new Map();

    map1.set('week1', 0);
    map1.set('week2', 0);
    map1.set('week3', 0);
    map1.set('week4', 0);


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


const Hero = () => {
  return (
    
    <div className='text-white bg-gradient-to-t from-gray-700 via-black to-black' id='hero'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>GROWING WITH DATA ANALYTICS</p>
        
        <div id='middle'>
            <img src={moneyLogo} className='mx-auto'></img>
            <p className ='md:text-5xl sm:text-4xl text-xl font-bold py-4'> Track Spending and Cut Costs</p>
        </div>

        <p className='md:text-2xl text-xl font-bold text-gray-500 p-top p-4' >Upload your bank statement now to visualise your spending   </p>
      <button onClick={testSubmit} className ='bg-[#00df9a] w-[200px] rounded-md font-bold my-6 mx-auto py-6 text-black flex flex-row justify-center hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'> <AiOutlineUpload size={30}></AiOutlineUpload>UPLOAD </button>
      
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
    </div>
  )
}

export default Hero
