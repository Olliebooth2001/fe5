import React from 'react';
import Chart from '../media/chart.png';
import { Chart as ChartJS, BarElement,CategoryScale,LinearScale, Tooltip,Legend } from 'chart.js/auto';
import {Doughnut,Bar,Pie,Line} from 'react-chartjs-2';
import {AiOutlineClose,AiOutlineMenu,AiOutlineDashboard,AiOutlineInfoCircle,AiOutlineUpload,AiOutlineArrowRight} from 'react-icons/ai';
import { useState } from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';

// import * as os from 'os';
// import {TmpFilesystem, awaitWriteFinish} from "like-fs";
import giffy from '../media/gif.webp'
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

var month = ""; var month2="";
const map1 = new Map();const map2 = new Map();
map1.set('week1', 0);map2.set('week1', 0);
map1.set('week2', 0);map2.set('week1', 0);
map1.set('week3', 0);map2.set('week1', 0);
map1.set('week4', 0);map2.set('week1', 0);
var totalSpent = 0;var totalSpent2 = 0;
var monthlyIncome = 0;var monthlyIncome2 = 0;
var week1No=0;var week2No=0;var week3No=0;var week4No=0;var week1No2=0;var week2No2=0;var week3No2=0;var week4No2=0;
var netBalanceIncreaseDecrease=0;var netBalanceIncreaseDecrease2=0;
var fruits = [];var fruits2 = [];
var numberOfCommonTrans=0;var numberOfCommonTrans2=0;
var mostC = 0;var mostC2 = 0;
var largestTran = 0;var largestTran2 = 0;
var averageTranCost = 0;var averageTranCost2 = 0;
var percentagem1 = 0;var percentagem12 = 0;
var threeCol = false;var threeCol2 = false;
var debitField1 = false; var debitField2 = false; 
var moneyIn = [];var moneyIn2 = [];
var m1Highest = 0; var m2highest=0;
var m1PerInc = 0; var m2PerInc = 0;
var netBalSign = "";var netBalSign2;
var invalid = false;
var options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
};


function resetValues(){
  // month = "";
  map1.set('week1', 0);
  map1.set('week2', 0);
  map1.set('week3', 0);
  map1.set('week4', 0);
   totalSpent = 0;
   monthlyIncome = 0;
   week1No=0; week2No=0; week3No=0; week4No=0;
   netBalanceIncreaseDecrease=0;
   fruits = [];
   numberOfCommonTrans=0;
   mostC = 0;
   largestTran = 0;
   averageTranCost = 0;
   percentagem1 = 0;
   threeCol = false;
   debitField1 = false;
   moneyIn = [];
   m1PerInc = 0;
   m1Highest = 0;  invalid = false;

}

function resetValues2(){
  
 // month2 = "";
  map2.set('week1', 0);
  map2.set('week2', 0);
  map2.set('week3', 0);
  map2.set('week4', 0);
   totalSpent2 = 0;
   monthlyIncome2 = 0;
   week1No2=0; week2No2=0; week3No2=0; week4No2=0;
   netBalanceIncreaseDecrease2=0;
   fruits2 = [];
   numberOfCommonTrans2=0;
   mostC2 = 0;
   largestTran2 = 0;
   averageTranCost2 = 0;
   percentagem12 = 0;
   threeCol2 = false;
   moneyIn2 = [];
   debitField2 = false;
   m2PerInc = 0;
   m2highest = 0;
   invalid = false;
}


function startsWithCapital(word){
  return word.charAt(2) === word.charAt(2).toUpperCase()
}

async function testSubmit2(buffer) {
  const poller = await client.beginAnalyzeDocument(modelId, buffer, {
    onProgress: ({ status }) => {
      console.log(`status: ${status}`);
    },
  });
  show()

  const { documents, pages, tables } = await poller.pollUntilDone();
  console.log("Documents:");
  for (const document of documents || []) {
    console.log(`Type: ${document.docType}`);
    console.log("Fields:");
    for (const [name, field] of Object.entries(document.fields)) {
      console.log(
        `Field ${name} has value '${field.value}' with a confidence score of ${field.confidence}`
      );
      if(name == "Bank Name"){
        if(field.confidence<0.200){
            invalid=true
        }
      }
    }
  }
  console.log("Pages:");
  for (const page of pages || []) {
    console.log(`Page number: ${page.pageNumber} (${page.width}x${page.height} ${page.unit})`);
  }
  console.log("Tables:");
  var totalMoneyIn = 0;
  var week1=0;var week2=0;var week3=0;var week4=0; 
  var commonExpendature = [];
  for (const table of tables || []) {
    console.log(`- Table (${table.columnCount}x${table.rowCount})`);
    for (const cell of table.cells) {
      console.log(`  - cell (${cell.rowIndex},${cell.columnIndex}) "${cell.content}"`); 
      if(cell.columnIndex == 1 && cell.content == "DEBIT" || cell.content == "DEBI"){
          debitField2 = true;
      }
      if(cell.columnIndex == 0 && cell.content!="Date"){       
        month2 = cell.content.split(" ").pop();     
        if(parseInt(cell.content.substring(0,2))<=7){
          week1 += parseInt(cell.content.substring(0,2));
          week1No2+=1;
          map2.set('week1',week1No2);
        }
        else if(parseInt(cell.content.substring(0,2))>7 && parseInt(cell.content.substring(0,2))<=14){
          week2 += parseInt(cell.content.substring(0,2));
          week2No2+=1;
          map2.set('week2',week2No2);
        }
        else if(parseInt(cell.content.substring(0,2))>14  && parseInt(cell.content.substring(0,2))<=23){
          week3 += parseInt(cell.content.substring(0,2));
          week3No2+=1;
          map2.set('week3',week3No2);
        }
        else if(parseInt(cell.content.substring(0,2))>23  && parseInt(cell.content.substring(0,2))<29){
          week4 += parseInt(cell.content.substring(0,2));
          week4No2+=1;
          map2.set('week4',week4No2);
        }
       }
      if(cell.columnIndex == 1 && startsWithCapital(cell.content)){
        if(cell.content.substring(cell.content.length-7,cell.content.length).includes(".")){       
          for(let i=cell.content.length;i>cell.content.length-10;i--){        
              if(cell.content.charAt(i)== " "){
                let outgoing = cell.content.substring(i+1,cell.content.length)
                let removedComma = outgoing.replace(',', '')
                moneyIn2.push(removedComma)
              }
          }
        }
        else{
          commonExpendature.push(cell.content)
        }
       }
       if(cell.columnIndex == 4 && cell.content != "" && cell.content != "Money in" && debitField2 ==true){
        moneyIn2.push(cell.content)
        console.log(moneyIn)
     }
     if(cell.columnIndex == 5 && cell.content != "" && cell.content != "Money out" && debitField2 ==true){
      fruits2.push(parseFloat(cell.content))
      console.log(fruits2)
    }
       if(cell.columnIndex == 3 && cell.content !="" && cell.content!="Money out"){
        fruits2.push(cell.content)
        console.log(fruits2.length)
       }
    }
    fruits2.forEach(item =>{
      totalSpent2 +=parseFloat(item);    
    });
    var numberArray = []
    for (var i = 0; i < fruits.length; i++){
      numberArray.push(parseInt(fruits[i]));
    }
    largestTran2 = 0;   
    for (var i = 0; i < numberArray.length; i++) {
        if (largestTran2 < numberArray[i] ) {
            largestTran2 = numberArray[i];
        }
    }
    averageTranCost2 = totalSpent2/numberArray.length   
    console.log(largestTran2)
    moneyIn2.forEach(item =>{
      totalMoneyIn +=parseFloat(item);
    });
    monthlyIncome2 = totalMoneyIn;
    var monthExpendature = (totalSpent2/2)/30;
    var averageDailyMoneyIn = (totalMoneyIn)/30;
    netBalanceIncreaseDecrease2 =  totalMoneyIn-totalSpent2;

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
    mostC2 = item;
    numberOfCommonTrans2 = mf;
    percentagem12 = ((numberOfCommonTrans2/commonExpendature.length)*100).toFixed(2)
    document.getElementById('commonSpend').innerText=`Most common transaction: ${item} ( ${mf} times )  `;
    document.getElementById('percentOfTotalTransactions').innerHTML = ((numberOfCommonTrans2/commonExpendature.length)*100).toFixed(2) +'% of total transactions'

    if(month2 == "Jan"){month2="January";}
    else if(month2 == "Feb"){month2="February";}
    else if(month2 == "Mar"){month2="March";}
    else if(month2 == "Apr"){month2="April";}
    else if(month2 == "Jun"){month2="June";}
    else if(month2 == "Jul"){month2="July";}
    else if(month2 == "Aug"){month2="August";}
    else if(month2 == "Sep"){month2="September";}
    else if(month2 == "Oct"){month2="October";}
    else if(month2 == "Nov"){month2="November";}
    else if(month2 == "Dec"){month2="December";}


  }
  hide();
  showSubmit()

  if(  monthExpendature >monthlyIncome2){
    document.getElementById('netbalm2').innerText='+£' + netBalanceIncreaseDecrease2.toFixed(2);
  }
  else{
    document.getElementById('netbalm2').innerText='-£'+  netBalanceIncreaseDecrease2.toFixed(2);
  }


  document.getElementById('secondDS1').style.opacity =100;document.getElementById('secondDS2').style.opacity =100;document.getElementById('secondDS3').style.opacity =100;document.getElementById('secondDS4').style.opacity =100;document.getElementById('secondDS5').style.opacity =100;
  document.getElementById('secondDS6').style.opacity =100;

  document.getElementById('weeklySpending').innerHTML = ' Month of '+ month + ' number of transactions per week \n</br>' + month + ' 1<sup>st</sup> - 7<sup>th</sup>:  \n' + map1.get('week1')+'</br>  ' + month + ' 7<sup>th</sup> - 14<sup>th</sup>:  \n' + map1.get('week2')+'</br>  ' + month + ' 14<sup>th</sup> - 21<sup>st</sup>:  \n' + map1.get('week3')+'</br>  ' + month + ' 21<sup>st</sup> - End Of Month:  \n' + map1.get('week4')+'</br>  ' 
  document.getElementById('m2expensive').innerText = '£'+largestTran2;
  document.getElementById('mostcm2').innerText = mostC2;
  document.getElementById('m2percent').innerText = 'Made up ' +percentagem12+'% of all transactions'

  var arr = [week1No2,week2No2,week3No2,week4No2]
  arr.sort()
  var largest_element = arr[arr.length-1]
  var smallest_element = arr[0];

  if(largest_element==week1No2){document.getElementById('highestw2').innerText='1 - 7';m2highest =1}
  else if(largest_element==week2No2){document.getElementById('highestw2').innerText='7 - 14';m2highest =2}
  else if(largest_element==week3No2){document.getElementById('highestw2').innerText='14 - 21';m2highest =2}
  else if(largest_element==week4No2){document.getElementById('highestw2').innerText='21 - End of month';m2highest =3}
  if(smallest_element==week1No2){document.getElementById('lowestw2').innerText='1 - 7'}
  else if(smallest_element==week2No2){document.getElementById('lowestw2').innerText='7 - 14'}
  else if(smallest_element==week3No2){document.getElementById('lowestw2').innerText='14 - 21'}
  else if(smallest_element==week4No2){document.getElementById('lowestw2').innerText='21 - End of month'}

  

  m2PerInc = (largestTran2 - averageTranCost2)/averageTranCost2 * 100
  document.getElementById('month2h1').innerText=month2;

  console.log(largestTran2 +' '+ averageTranCost2 +' '+ m2PerInc.toFixed(2))
  updatem2Summary();
  document.getElementById('month2h1').innerText=month2;document.getElementById('month2h1p').innerText=month2;  document.getElementById('month2h1c').innerText=month2;document.getElementById('month2h1e').innerText=month2;document.getElementById('month2h1d').innerText=month2;document.getElementById('month2h1s').innerText=month2;

  showMonth2Summary();
  console.log(month + ' ' + month2)
  activateSubmitAndDash()

}





async function testSubmit(buffer) {
  const poller = await client.beginAnalyzeDocument(modelId, buffer, {
    onProgress: ({ status }) => {
      console.log(`status: ${status}`);
    },
  });
  show()
  const { documents, pages, tables } = await poller.pollUntilDone();
  console.log("Documents:");
  for (const document of documents || []) {
    console.log(`Type: ${document.docType}`);
    console.log("Fields:");
    for (const [name, field] of Object.entries(document.fields)) {
      console.log(
        `Field ${name} has value '${field.value}' with a confidence score of ${field.confidence}`

      );
      if(name == "Bank Name"){
        if(field.confidence<0.200){
            invalid=true 
            console.log('baloney')
        }
      }
    }
  }
  console.log("Pages:");
  for (const page of pages || []) {
    console.log(`Page number: ${page.pageNumber} (${page.width}x${page.height} ${page.unit})`);

  }
  console.log("Tables:");
  var totalMoneyIn = 0;
  var week1=0;var week2=0;var week3=0;var week4=0; 
  var commonExpendature = [];
  for (const table of tables || []) {
    console.log(`- Tableeeeeeeeee (${table.columnCount}x${table.rowCount})`);

    
    for (const cell of table.cells) {
      console.log(`  - cell (${cell.rowIndex},${cell.columnIndex}) "${cell.content}"`); 
      if(cell.columnIndex == 1 && cell.content == "DEBIT" || cell.content == "DEBI"){
          debitField1= true;
      }
      if(cell.columnIndex == 0 && cell.content!="Date"){       
        month = cell.content.split(" ").pop();     
        if(parseInt(cell.content.substring(0,2))<=7){
          week1 += parseInt(cell.content.substring(0,2));
          week1No+=1;
          map1.set('week1',week1No);
        }
        else if(parseInt(cell.content.substring(0,2))>7 && parseInt(cell.content.substring(0,2))<=14){
          week2 += parseInt(cell.content.substring(0,2));
          week2No+=1;
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
      if(cell.columnIndex == 1 && startsWithCapital(cell.content)){
        if(cell.content.substring(cell.content.length-7,cell.content.length).includes(".")){       
          for(let i=cell.content.length;i>cell.content.length-10;i--){        
              if(cell.content.charAt(i)== " "){
                let outgoing = cell.content.substring(i+1,cell.content.length)
                let removedComma = outgoing.replace(',', '')
                moneyIn.push(removedComma)
              }
          }
        }
        else{
          commonExpendature.push(cell.content)
        }
       }
       if(cell.columnIndex == 4 && cell.content != "" && cell.content != "Money in" && debitField1 ==true){
        moneyIn.push(cell.content)
        console.log(moneyIn)
     }
     if(cell.columnIndex == 5 && cell.content != "" && cell.content != "Money out" && debitField1 ==true){
      fruits.push(parseFloat(cell.content))
      console.log(fruits)
    }
       if(cell.columnIndex == 3 && cell.content !="" && cell.content!="Money out"){
        fruits.push(cell.content)
        console.log(fruits.length)
       }
    }
    fruits.forEach(item =>{
      totalSpent +=parseFloat(item);    
    });
    var numberArray = []
    for (var i = 0; i < fruits.length; i++){
      numberArray.push(parseInt(fruits[i]));
    }
    largestTran = 0;   
    for (var i = 0; i < numberArray.length; i++) {
        if (largestTran < numberArray[i] ) {
            largestTran = numberArray[i];
        }
    }
    averageTranCost = totalSpent/numberArray.length   
    console.log(largestTran)
    moneyIn.forEach(item =>{
      totalMoneyIn +=parseFloat(item);
    });
    monthlyIncome = totalMoneyIn;
    var monthExpendature = (totalSpent/2)/30;
    var averageDailyMoneyIn = (totalMoneyIn)/30;
    netBalanceIncreaseDecrease =  totalMoneyIn-totalSpent;
    document.getElementById('totalExpendature').innerText='Total Expendature over the month - £' + (totalSpent).toFixed(2);
    document.getElementById('averageExpendature').innerText='Average Daily Expendature over the month - £' +  monthExpendature.toFixed(2);
    document.getElementById('totalMoneyIn').innerText='Total Money In over the month - £' +  monthlyIncome.toFixed(2);
    document.getElementById('averageMoneyIn').innerText='Average Money In over the month - £' +  averageDailyMoneyIn.toFixed(2);
    if(  monthExpendature >monthlyIncome){
      
      document.getElementById('netbalm1').innerText='+£' + netBalanceIncreaseDecrease.toFixed(2);
    }
    else{
      document.getElementById('netbalm1').innerText='-£'+  netBalanceIncreaseDecrease.toFixed(2);
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
    mostC = item;
    numberOfCommonTrans = mf;
    percentagem1 = ((numberOfCommonTrans/commonExpendature.length)*100).toFixed(2)
    document.getElementById('commonSpend').innerText=`Most common transaction: ${item} ( ${mf} times )  `;
    document.getElementById('percentOfTotalTransactions').innerHTML = ((numberOfCommonTrans/commonExpendature.length)*100).toFixed(2) +'% of total transactions'

    if(month == "Jan"){month="January";}
    else if(month == "Feb"){month="February";}
    else if(month == "Mar"){month="March";}
    else if(month == "Apr"){month="April";}
    else if(month == "Jun"){month="June";}
    else if(month == "Jul"){month="July";}
    else if(month == "Aug"){month="August";}
    else if(month == "Sep"){month="September";}
    else if(month == "Oct"){month="October";}
    else if(month == "Nov"){month="November";}
    else if(month == "Dec"){month="December";}

  

    document.getElementById('weeklySpending').innerHTML = ' Month of '+ month + ' number of transactions per week \n</br>' + month + ' 1<sup>st</sup> - 7<sup>th</sup>:  \n' + map1.get('week1')+'</br>  ' + month + ' 7<sup>th</sup> - 14<sup>th</sup>:  \n' + map1.get('week2')+'</br>  ' + month + ' 14<sup>th</sup> - 21<sup>st</sup>:  \n' + map1.get('week3')+'</br>  ' + month + ' 21<sup>st</sup> - End Of Month:  \n' + map1.get('week4')+'</br>  ' 
  }

   m1PerInc = (largestTran - averageTranCost)/averageTranCost * 100
  hide()
  showSubmit()
  updatem1Summary()
  showMonth1Summary()
  activateSubmitAndDash()
}

function updatem1Summary(){
  if(m1Highest==1){
    document.getElementById('spendingPatternM1').innerText = 'You had a relatively inconsistent spending pattern with the highest number of transactions at the start of the month, by altering your spending habits and spending less at the start you could avoid having to budget later in the month.'
  }else if(m1Highest==2 ){document.getElementById('spendingPatternM1').innerText = 'You had a relatively consistent spending pattern with the highest number of transactions around the middle of the month, although you did not have the most transactions at the start of the month you could still avoid having to budget later in the month by being more consistent.'}
   else if(m1Highest==3){document.getElementById('spendingPatternM1').innerText = 'You had a relatively inconsistent spending pattern with the highest number of transactions at the end of the month. It may be the case that you spend the most around payday and could be worth considering saving that money instead'}
   console.log("Yoooo"+m1Highest)
   document.getElementById('commonspendSum1').innerText = 'Your most common purchase makes up '+percentagem1+'% of all transactions, it may be worth investigating whether this is an essential purchase or whether you could cut down on it '
   document.getElementById('averageSpendSum1').innerText = 'Your most expensive transaction is ' + m1PerInc.toFixed(2)+ '% more expensive than your average transaction cost. If this is not an essential purchase it may be worth either reconsidering the purchase or paying in installments'  
   document.getElementById('dailySpendSum1').innerText = 'Your average daily cost is £' + (totalSpent/30).toFixed(2)+ ', if you are looking to save money it may be worth investigating this further and seeing where exactly you are spending your money on a day by day basis. Small purchases can gradually add up over time.'
}
function updatem2Summary(){

  if(m2highest==1){
    document.getElementById('spendingPatternM2').innerText = 'You had a relatively inconsistent spending pattern with the highest number of transactions at the start of the month, by altering your spending habits and spending less at the start you could avoid having to budget later in the month.'
  }else if(m2highest==2){document.getElementById('spendingPatternM2').innerText = 'You had a relatively consistent spending pattern with the highest number of transactions around the middle of the month, although you did not have the most transactions at the start of the month you could still avoid having to budget later in the month by being more consistent.'}
   else if(m2highest==3){document.getElementById('spendingPatternM2').innerText = 'You had a relatively inconsistent spending pattern with the highest number of transactions at the end of the month. It may be the case that you spend the most around payday and could be worth considering saving that money instead'}
   document.getElementById('commonspendSum2').innerText = 'Your most common purchase makes up '+percentagem12+'% of all transactions, it may be worth investigating whether this is an essential purchase or whether you could cut down on it '
   document.getElementById('averageSpendSum2').innerText = 'Your most expensive transaction is ' + m2PerInc.toFixed(2)+ '% more expensive than your average transaction cost. If this is not an essential purchase it may be worth either reconsidering the purchase or paying in installments'  
   document.getElementById('dailySpendSum2').innerText = 'Your average daily cost is £' + (totalSpent2/30).toFixed(2)+ ', if you are looking to save money it may be worth investigating this further and seeing where exactly you are spending your money on a day by day basis. Small purchases can gradually add up over time.'

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
  labels: ["Money In (£)","Money Out (£)"],
  datasets:[
    {
      label:"July",
      data:[600,214],  
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
var dailySpend = {
  labels: ["July","June"],

  datasets:[
    {
      label:["Average Daily Spend (£)"],
      data:[50.53,34.60],
      borderWidth:2,
    }
],
options: {
  indexAxis: 'y',
}
};


function show() {
  let pic = document.getElementById("loader");
  let text = document.getElementById("loaderText")

  pic.style.opacity = 100;
  pic.style.display = 'inherit';
  text.style.opacity = 100;

//window.setTimeout("document.getElementById('loader').style.opacity=0;", 3000);
}
function hideSubmitAndDash(){
  let submit = document.getElementById("submitBtn");
  submit.style.display = 'none';
  let dash = document.getElementById("dash");
  dash.style.display = 'none';
}
function activateSubmitAndDash(){
  let submit = document.getElementById("submitBtn");
  submit.style.display = 'inherit';
  let processing =  document.getElementById("loader");
  processing.style.display = 'none';
  let dash = document.getElementById("dash");
  dash.style.display = 'inherit';
}
function showSubmit(){
  let submit = document.getElementById("submitBtn");
  submit.style.opacity = 100;
}

function showDashboardBtn(){

  let dash = document.getElementById("dash");
  dash.style.opacity = 100;
}
function showMonth1Summary(){
  let box = document.getElementById('month1SummaryBox');
  box.style.display = 'inherit';
}
function showMonth2Summary(){
  let box = document.getElementById('month2SummaryBox');
  box.style.display = 'inherit';
}
function hide(){
  let pic = document.getElementById("loader");
  let text = document.getElementById("loaderText")
  pic.style.opacity = 0;
  text.style.opacity = 0;

}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Analytics = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const [openUp, setOpenUp] = React.useState(false);

  const handleClickOpen = () => {
    setOpenUp(true);
  };

  const handleClosing = () => {
    setOpenUp(false);
  };


  const [openIt, setOpenIt] = React.useState(false);

  const handleClickIt = () => {
    setOpenIt(true);
  };

  const handleCloseIt = (event, reason) => {

    if (reason === 'clickaway') {
      return;
    }

    setOpenIt(false);
  };

  

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
      label:"June",
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
      label:month2,
      data:[map2.get('week1'),map2.get('week2'),map2.get('week3'),map2.get('week4')],
      backgroundColor:'#CB904D ',
      borderColor:'#CB904D',
      borderWidth:2,
      
    },
]
};
var netSpendMonthUpdate = {
  labels: ["Money In (£)","Money Out (£)"],
  datasets:[
    {
      label:month,
      data:[totalSpent,monthlyIncome],  
    }
]
};
var netSpendMonth2Update = {
  labels: ["Money In (£)","Money Out (£)"],
  datasets:[
    {
      label:month2,
      data:[totalSpent2,monthlyIncome2],  
    }
]
};
var dailySpendUpdated = {
  labels: [month,month2],

  datasets:[
    {
      label:["Average Daily Spend (£)"],
      data:[(totalSpent/30).toFixed(2),(totalSpent2/30).toFixed(2)],
      borderWidth:2,
    }
],
options: {
  indexAxis: 'y',
}
};

var mostCommonUpdated = {
  labels: [month,month2],
  datasets:[
    {
      label:"Most Common Transaction",
      data:[numberOfCommonTrans,numberOfCommonTrans2],  
    },
    {
      label:"All Other Transactions",
      data:[fruits.length,fruits2.length],  
    }
]
};
var expensiveUpdated = {
  labels: [month,month2],
  datasets:[
    {
      label:"Most Expensive Transaction (£)",
      data:[largestTran,largestTran2],  
    },
    {
      label:"Average Transaction Cost (£)",
      data:[averageTranCost,averageTranCost2],  
    }
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
const [m, setDataPie] = useState(netSpendMonth1); // REMOVED BRACKETS
const [pie2, setDataPie2] = useState(netSpendMonth1); // REMOVED BRACKETS

const [commonm1, setDatacm1] = useState(mostCommon1); // REMOVED BRACKETS
const [ex1, setDataExp] = useState(expensive); // REMOVED BRACKETS
const [ds, setDatads] = useState(dailySpend); // REMOVED BRACKETS

const [options, setOptions] = useState(options2); // REMOVED BRACKETS


const updatePlot = () => {
  setData(data3);
  totalSpent = Math.round(totalSpent);
  monthlyIncome = Math.round(monthlyIncome);
  setDataPie(netSpendMonthUpdate);
  setDatacm1(mostCommonUpdated);
  setDataExp(expensiveUpdated);
  setDatads(dailySpendUpdated);
  setDataPie2(netSpendMonth2Update)


  console.log(month2 +" "+ map2+" "+totalSpent2 +" "+monthlyIncome2 +" "+week1No2 +" "+netBalanceIncreaseDecrease2 +" "+fruits2 +" "+numberOfCommonTrans2 +" "+mostC2+" "+largestTran2+" "+averageTranCost2+" "+percentagem12+" "+threeCol2+" "+moneyIn2)
  console.log(month +" "+ map1+" "+totalSpent +" "+monthlyIncome +" "+week1No +" "+netBalanceIncreaseDecrease +" "+fruits +" "+numberOfCommonTrans +" "+mostC+" "+largestTran+" "+averageTranCost+" "+percentagem1+" "+threeCol+" "+moneyIn)

  updateText()
  updatem1Summary()
  console.log(monthlyIncome+" "+ totalSpent)
  setOptions(options2); 
  document.getElementById('formFileLg2').disabled = false;
};

function submitClick(){
  updatePlot();
  if(invalid == true){
    handleClickIt()
  }
  else{
      showDashboardBtn();

  }
}
function dashClick(){
  hideSubmitAndDash();
  updatePlot();
  let form1= document.getElementById('form1')
  form1.style.display = 'inherit'
  document.getElementById('month2h1').innerText=month2;document.getElementById('month2h1p').innerText=month2;  document.getElementById('month2h1c').innerText=month2;document.getElementById('month2h1e').innerText=month2;document.getElementById('month2h1d').innerText=month2;document.getElementById('month2h1s').innerText=month2;document.getElementById('m1h1doh').innerText=month;
  document.getElementById('month1h1').innerText=month;document.getElementById('month1h1p').innerText=month;  document.getElementById('month1h1c').innerText=month;document.getElementById('month1h1e').innerText=month;document.getElementById('month1h1d').innerText=month;document.getElementById('month1h1s').innerText=month;document.getElementById('m2h1doh').innerText=month2;
  console.log(month +" "+ month2)
}

function updateText(){

  var arr = [week1No,week2No,week3No,week4No]
  arr.sort()
  var largest_element = arr[arr.length-1]
  var smallest_element = arr[0];

  if(largest_element==week1No){document.getElementById('highestw1').innerText='1 - 7'; m1Highest=1}
  else if(largest_element==week2No){document.getElementById('highestw1').innerText='7 - 14';m1Highest=2}
  else if(largest_element==week3No){document.getElementById('highestw1').innerText='14 - 21';m1Highest=2}
  else if(largest_element==week4No){document.getElementById('highestw1').innerText='21 - End of month';m1Highest=3}
  if(smallest_element==week1No){document.getElementById('lowestw1').innerText='1 - 7'}
  else if(smallest_element==week2No){document.getElementById('lowestw1').innerText='7 - 14'}
  else if(smallest_element==week3No){document.getElementById('lowestw1').innerText='14 - 21'}
  else if(smallest_element==week4No){document.getElementById('lowestw1').innerText='21 - End of month'}
  document.getElementById('month1h1').innerText=month;document.getElementById('month1h1p').innerText=month;  document.getElementById('month1h1c').innerText=month;document.getElementById('month1h1e').innerText=month;document.getElementById('month1h1d').innerText=month;document.getElementById('month1h1s').innerText=month;


  // /month1h1e


  document.getElementById('mostcm1').innerText = mostC;
  document.getElementById('m1percent').innerText = 'Made up ' +percentagem1+'% of all transactions'

  document.getElementById('m1expensive').innerText = '£'+largestTran
  //m1expensive
  // document.getElementById('month1Title').innerText = month;  document.getElementById('month2Title').innerText = month2;
  document.getElementById('m1daily').innerText = '£'+(totalSpent/30).toFixed(2); document.getElementById('m2daily').innerText = '£'+(totalSpent2/30).toFixed(2);



}
const readFile = e => {
  const file = e.target.files[0]
  let reader = new FileReader();

  reader.onload = function(e) {
      let arrayBuffer = new Uint8Array(reader.result);
      console.log(arrayBuffer);
      resetValues();
      testSubmit(arrayBuffer)
     
     
    
        handleClick();
         
     

  }
  reader.readAsArrayBuffer(file);


}
const readFileB = e => {
  const file = e.target.files[0]
  let reader = new FileReader();

  reader.onload = function(e) {
      let arrayBuffer = new Uint8Array(reader.result);
      console.log(arrayBuffer);
      resetValues2();
      testSubmit2(arrayBuffer)
     
        handleClick();
     
  }
  reader.readAsArrayBuffer(file);

}

  return (
    
    <div>
  
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          File Uploaded Successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={openIt} autoHideDuration={6000} onClose={handleCloseIt}>
        <Alert onClose={handleCloseIt} severity="error" sx={{ width: '100%' }}>
           Not enough information could be found from file
        </Alert>
      </Snackbar>
 

      <div className='font-bold text-[white] text-center text-3xl items-center py-10' id='heading1'><p>UPLOAD BANK STATEMENTS TO SEE<br/> YOUR SPENDING STATS</p></div>
      <div class="flex justify-center py-10">

      <Button variant="contained" onClick={handleClickOpen} id='exampleBtn'>
        <strong>View Example Dashboard </strong><AiOutlineDashboard size={25}/>
      </Button>
      </div>


          <div class="flex justify-center">
          <div class="p-10 mb-3 w-96">
            <label
              for="formFileLg"
              class="mb-2 inline-block text-white dark:text-neutral-200 font-bold"
              >Select First Statement</label
            >
            <input
              class="relative m-0 block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 font-normal leading-[2.15] text-white transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
              id="formFileLg"
              type="file" 
              accept=".jpg, .jpeg, .png, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
              onChange={readFile}/>
            <p className='italic text-white'>Accepted file formats: .jpeg, .png, .doc, .pdf</p>

          </div>
          <div class="p-10 mb-3 w-96">
            <label
              for="formFileLg"
              class="mb-2 inline-block text-white dark:text-neutral-200 font-bold"
              >Select Second Statement</label
            >
            <input
              class="relative m-0 block font-normal w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding py-[0.32rem] px-3 leading-[2.15] text-white transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[margin-inline-end:0.75rem] file:[border-inline-end-width:1px] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-[0_0_0_1px] focus:shadow-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100"
              id="formFileLg2"
              type="file"
              accept=".jpg, .jpeg, .png, .doc, .docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf"
              onChange={readFileB} 
              disabled/>
          </div>
    </div>

    
    
    <div class="flex justify-center">
    <h1 id = 'loaderText'className='text-white font-bold text-xl'style={{ opacity: 0}}>PROCESSING...</h1>
    </div>
    <div class="flex justify-center">
    <img src={giffy} width={150} height={150} id='loader' style={{ opacity: 0}}/>
    </div>

    <div class="flex justify-center">
    <button id='submitBtn'onClick={submitClick} style={{ opacity: 0}} className ='bg-[#00df9a] w-[150px] rounded-md font-bold my-6 mx-auto py-2 text-black flex flex-row justify-center hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'>SUBMIT <AiOutlineArrowRight size={25}></AiOutlineArrowRight></button>
    </div>


   
      <div className='flex flex-auto justify-evenly' id='dash'style={{ opacity: 0}}>
            <button  onClick={dashClick} className ='bg-[#00df9a] w-[300px] rounded-md font-bold my-6 mx-auto py-10 text-black flex flex-row justify-center hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'> VIEW DASHBOARD<AiOutlineDashboard size={25}/></button>
      </div>

     
      <div class="container mx-auto w-full bg-white py-16 px-4 z-10" style={{ display: 'none'}} id='form1'>
            <div class="flex flex-row flex-wrap py-2">
               
                <main role="main" class="w-full sm:w-2/3 md:w-6/12 pt-1 px-2 ">
                <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Transactions Over The Month</h1>

                    <Line data={datav} options={options} onUpdate={updatePlot}/>
                </main>
                
                
                <aside class="w-full sm:w-1/3 md:w-2/4 px-2">
                <div class="top-0 p-4 w-full">
                <p className='text-[#00df90] font-bold  text-l'>Transactions Over Each Month</p>

                <span>These bar charts show how your transactions frequency differs from month to month. From this you can work out whether you are spending too much and having to budget later in the month or have a relatively even spending habit.<br/><br/> <strong>Summary:</strong><br/></span>


                <span><strong id='month1h1'><br/>July </strong>  </span>
                <span id='month1Summary'><br/>Highest Transactions : <strong id='highestw1'>1-7</strong><br/></span>
                <span id='month1Summary'>Lowest Transactions : <strong id='lowestw1'> 7-14</strong><br/></span>
                <div id='secondDS1' style={{ opacity: 0}}>

                <span><strong id='month2h1'><br/>July </strong>  </span>
                <span id='month1Summary'><br/>Highest Transactions : <strong id='highestw2'>1-7</strong><br/></span>
                <span id='month1Summary'>Lowest Transactions : <strong id='lowestw2'> 7-14</strong></span>
                </div>
                </div>
                 </aside>
            </div>

            <div className='w-full bg-black h-0.5'></div>
            <div class="flex flex-row flex-wrap py-2 pt-9">
            <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Net Spend</h1>

               
               <main role="main" class="w-full sm:w-2/3 md:w-3/12 pt-20 px-2 ">
               <div className='flex justify-center'><strong id='m1h1doh'>July</strong></div> 

                   <Doughnut data={m}/>
               </main>

               <main role="main" class="w-full sm:w-2/3 md:w-3/12 pt-20 px-2 ">
                  <div id='secondDS6' style={{ opacity: 0}}>
                  <div className='flex justify-center'><strong id='m2h1doh'>July</strong></div> 

                   <Doughnut data={pie2}/>
                                  </div>

               </main>
          <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
               <div class="top-0 p-4 w-full">
               <p className='text-[#00df90] font-bold  text-l'>Net Spend</p>

               <span>These pie charts give you a clear picture of how your balance has increased / decreased over the course of the year and how this compares between months<br/><br/> <strong>Summary:</strong><br/></span>


               <span><strong id='month1h1p'><br/>July </strong>  </span>
               <span id='month1Summary'><br/>Net Balance : <strong id='netbalm1'> +500</strong><br/></span>

               <div id='secondDS2' style={{ opacity: 0}}>

               <span><strong id='month2h1p'><br/>July </strong>  </span>
               <span id='month2Summary'><br/>Net Balance : <strong id='netbalm2'>-700</strong><br/></span>
               </div>
               </div>
                </aside>
           </div>
           <div className='w-full bg-black h-0.5'></div>
            <div class="flex flex-row flex-wrap py-2 pt-9">

               
              
               <main role="main" class="w-full sm:w-2/3 md:w-6/12 pt-20 px-2 ">
               <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Most Common</h1>

                   <Bar data={commonm1}/>
               </main>
          <aside class="w-full sm:w-1/3 md:w-2/4 px-2">
               <div class="top-0 p-4 w-full">
               <p className='text-[#00df90] font-bold  text-l pt-10'>Comparing Most Common Transaction</p>

               <span>This chart shows you your most common transaction and what percentage of all transactions this makes up. This transaction is not necessarily the most expensive but it is still a useful tool to get a better idea of your spending habits. <br/><br/> <strong>Summary:</strong><br/></span>


               <span ><strong id='month1h1c'><br/>July </strong>  </span>
               <span id='month1Summary'><br/>Most Common Transaction : <br/><strong id='mostcm1'> Transfer to 109092</strong><br/><div id='m1percent'> Made up 7% of all transactions</div></span>

               <div id='secondDS3' style={{ opacity: 0}}>

               <span><strong id='month2h1c'><br/>June </strong>  </span>
               <span id='month1Summary'><br/>Most Common Transaction : <br/> <strong id='mostcm2'>CARD PAYMENT TO Jupiter</strong><br/><div id='m2percent'> Made up 7% of all transactions</div></span>
               </div>
               </div>
                </aside>
           </div>

           <div className='w-full bg-black h-0.5'></div>
            <div class="flex flex-row flex-wrap py-2 pt-9">

               
              
               <main role="main" class="w-full sm:w-2/3 md:w-6/12 pt-20 px-2 ">
               <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Most Expensive</h1>

                   <Bar data={ex1}/>
               </main>
          <aside class="w-full sm:w-1/3 md:w-2/4 px-2">
               <div class="top-0 p-4 w-full">
               <p className='text-[#00df90] font-bold  text-l pt-10'>Comparing Most Expensive Transaction</p>

               <span>This chart shows your most expensive transaction and how this compares to your average transaction amount. This could be useful to highlight any overspending and get an idea of how consistent the amount your expenses are.<br/><br/> <strong>Summary:</strong><br/></span>


               <span><strong id='month1h1e'><br/>July</strong>  </span>
               <span><br/>Most Expensive Transaction : <strong id='m1expensive'> £500</strong></span>
               <div id='secondDS4' style={{ opacity: 0}}>

               <span><strong id='month2h1e'><br/>June </strong>  </span>
               <span id='month1Summary'><br/>Most Expensive Transaction : <strong id='m2expensive'>£750</strong></span>
               </div>

               </div>
                </aside>
           </div>
           <div className='w-full bg-black h-0.5'></div>
            <div class="flex flex-row flex-wrap py-2 pt-9">

               
              
               <main role="main" class="w-full sm:w-2/3 md:w-6/12 pt-20 px-2 ">
               <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Comparing Average Daily Spend</h1>

                   <Bar data={ds}/>
               </main>
          <aside class="w-full sm:w-1/3 md:w-2/4 px-2">
               <div class="top-0 p-4 w-full">
               <p className='text-[#00df90] font-bold  text-l pt-10'>Comparing Average Daily Spend</p>

               <span>This chart shows you your average daily spend. This could be useful as it may be higher than expected and you may wish to investigate further where most of you daily expense is coming from.<br/><br/> <strong>Summary:</strong><br/></span>


               <span><strong id='month1h1d'><br/>July </strong>  </span>
               <span><br/>Average daily spend: <strong id='m1daily'> £500</strong></span>
               <br/>
              <div id='secondDS5' style={{ opacity: 0}}>
                  <span><strong id='month2h1d'><br/>July </strong> </span>
                  <span><br/>Average daily spend: <strong id='m2daily'> £500</strong></span>
              </div>

               </div>
                </aside>
           </div>
           <div className='w-full bg-black h-0.5'></div>
           <div className='flex justify-around py-5 '>

           <div id='month1SummaryBox' style={{ display: "none"}}>

            <div className='w-full bg-[#9ad0f5]  pl-5 pr-5 rounded'><h1 className='py-5'><strong id='month1h1s'>July</strong><strong> Statement Summary</strong> </h1>
                <p className='py-5'> <strong className='italic'>Spending Pattern Over Time<br></br></strong><div id='spendingPatternM1'>You had a relatively inconsistent spending pattern with the highest number of transactions at the start of the month, by altering your spending habits and spending less at the start you could avoid having to budget later in the month.</div></p>
              
                <p className='py-5'> <strong className='italic'>Most Common Purchase <br></br></strong> <div id='commonspendSum1'>Your most common purchase makes up 7% of all transactions, it may be worth investigating whether this is an essential purchase or whether you could cut down on it </div> </p>

                <p className='py-5'> <strong className='italic'>Transaction Amounts <br></br></strong><div id='averageSpendSum1'>Your most expensive transaction is 110% more expensive than your average transaction cost. If this is not an essential purchase it may be worth either reconsidering the purchase or paying in installments</div>  </p>

                <p className='py-5'> <strong className='italic'>Daily Expendature <br></br></strong><div id='dailySpendSum1'>Your average daily cost is £50.53, if you are looking to save money it may be worth investigating this further and seeing where exactly you are spending your money on a day by day basis. Small purchases can gradually add up over time.</div> </p>
             </div>
            </div>
            <div>&nbsp;</div>
            <div id='month2SummaryBox'style={{ display: "none"}}>

            <div className='w-full bg-[#ffb1c1] pl-5 pr-5 rounded'><h1 className='py-5'><strong id='month2h1s'>June</strong><strong> Statement Summary</strong></h1>
                <p className='py-5'> <strong className='italic'>Spending Pattern Over Time<br></br></strong><div id='spendingPatternM2'>You had a relatively inconsistent spending pattern with the highest number of transactions at the start of the month, by altering your spending habits and spending less at the start you could avoid having to budget later in the month.</div></p>
              
                <p className='py-5'> <strong className='italic'>Most Common Purchase <br></br></strong>  <div id='commonspendSum2'>Your most common purchase makes up 9% of all transactions, it may be worth investigating whether this is an essential purchase or whether you could cut down on it </div> </p>

              <p className='py-5'> <strong className='italic'>Transaction Amounts <br></br></strong><div id='averageSpendSum2'>Your most expensive transaction is 50% more expensive than your average transaction cost. If this is not an essential purchase it may be worth either reconsidering the purchase or paying in installments</div>   </p>

              <p className='py-5'> <strong className='italic'>Daily Expendature <br></br></strong><div id='dailySpendSum2'>Your average daily cost is £34.60, if you are looking to save money it may be worth investigating this further and seeing where exactly you are spending your money on a day by day basis. Small purchases can gradually add up over time.</div> </p>

          </div>
            </div>


           </div>
           </div>

     {/* <div className='w-full bg-black py-16 px-4 opacity-[.05] z-40' >  */}
     <Dialog
        fullScreen
        open={openUp}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar sx={{ backgroundColor: "black" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClosing}
              aria-label="close"
            >
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              EXAMPLE DASHBOARD
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClosing}>
              EXIT
            </Button>
          </Toolbar>
        </AppBar>

        <div class="container mx-auto w-full bg-white py-16 px-4 z-10">
            <div class="flex flex-row flex-wrap py-2">
               
                <main role="main" class="w-full sm:w-2/3 md:w-6/12 pt-1 px-2 ">
                <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Transactions Over June Compared to July</h1>

                    <Line data={datav} options={options}/>
                </main>
                
                
                <aside class="w-full sm:w-1/3 md:w-2/4 px-2">
                <div class="top-0 p-4 w-full">
                <p className='text-[#00df90] font-bold  text-l'>Transactions Over Each Month</p>

                <span>These bar charts show how your transactions frequency differs from month to month. From this you can work out whether you are spending too much and having to budget later in the month or have a relatively even spending habit.<br/><br/> <strong>Summary:</strong><br/></span>


                <span><strong><br/>July </strong>  </span>
                <span><br/>Highest Transactions : <strong>1-7</strong><br/></span>
                <span>Lowest Transactions : <strong> 7-14</strong><br/></span>

                <span><strong><br/>June </strong>  </span>
                <span><br/>Highest Transactions : <strong>14-21</strong><br/></span>
                <span>Lowest Transactions : <strong> 7-14</strong></span>

                </div>
                 </aside>
            </div>

            <div className='w-full bg-black h-0.5'></div>
            <div class="flex flex-row flex-wrap py-2 pt-9">
            <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Net Spend</h1>

               
               <main role="main" class="w-full sm:w-2/3 md:w-3/12 pt-20 px-2 ">
               <div className='flex justify-center'><strong>July</strong></div> 
                   <Doughnut data={m}/>
               </main>
               <main role="main" class="w-full sm:w-2/3 md:w-3/12 pt-20 px-2 ">
               <div className='flex justify-center'><strong>June</strong></div> 

                   <Doughnut data={netSpendMonth2}/>
               </main>
          <aside class="w-full sm:w-1/3 md:w-1/4 px-2">
               <div class="top-0 p-4 w-full">
               <p className='text-[#00df90] font-bold  text-l'>Net Spend</p>

               <span>These pie charts give you a clear picture of how your balance has increased / decreased over the course of the year and how this compares between months<br/><br/> <strong>Summary:</strong><br/></span>


               <span><strong><br/>July </strong>  </span>
               <span><br/>Net Balance : <strong> +£500</strong><br/></span>

               <span><strong><br/>June </strong>  </span>
               <span><br/>Net Balance : <strong>-£700</strong><br/></span>

               </div>
                </aside>
           </div>
           <div className='w-full bg-black h-0.5'></div>
            <div class="flex flex-row flex-wrap py-2 pt-9">

               
              
               <main role="main" class="w-full sm:w-2/3 md:w-6/12 pt-20 px-2 ">
               <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Most Common</h1>

                   <Bar data={commonm1}/>
               </main>
          <aside class="w-full sm:w-1/3 md:w-2/4 px-2">
               <div class="top-0 p-4 w-full">
               <p className='text-[#00df90] font-bold  text-l pt-10'>Comparing Most Common Transaction</p>

               <span>This chart shows you your most common transaction and what percentage of all transactions this makes up. This transaction is not necessarily the most expensive but it is still a useful tool to get a better idea of your spending habits.<br/><br/> <strong>Summary:</strong><br/></span>


               <span><strong><br/>July </strong>  </span>
               <span><br/>Most Common Transaction : <br/><strong> Transfer to 109092</strong><br/><div> Made up 7% of all transactions</div></span>

               <span><strong><br/>June </strong>  </span>
               <span><br/>Most Common Transaction : <br/> <strong>CARD PAYMENT TO Jupiter</strong><br/>Made up 9% of all transactions</span>

                
               </div>
                </aside>
           </div>

           <div className='w-full bg-black h-0.5'></div>
            <div class="flex flex-row flex-wrap py-2 pt-9">

               
              
               <main role="main" class="w-full sm:w-2/3 md:w-6/12 pt-20 px-2 ">
               <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Most Expensive</h1>

                   <Bar data={ex1}/>
               </main>
          <aside class="w-full sm:w-1/3 md:w-2/4 px-2">
               <div class="top-0 p-4 w-full">
               <p className='text-[#00df90] font-bold  text-l pt-10'>Comparing Most Expensive Transaction</p>

               <span>This chart shows your most expensive transaction and how this compares to your average transaction amount. This could be useful to highlight any overspending and get an idea of how consistent the amount your expenses are.<br/><br/> <strong>Summary:</strong><br/></span>


               <span><strong><br/>July </strong>  </span>
               <span><br/>Most Expensive Transaction : <strong> £500</strong></span>

               <span><strong><br/>June </strong>  </span>
               <span><br/>Most Expensive Transaction : <strong>£750</strong></span>

                
               </div>
                </aside>
           </div>
           <div className='w-full bg-black h-0.5'></div>
            <div class="flex flex-row flex-wrap py-2 pt-9">

               
              
               <main role="main" class="w-full sm:w-2/3 md:w-6/12 pt-20 px-2 ">
               <h1 className='md:text-3xl sm:text-2xl text-l font-bold py-2 pl-7'>Transaction size variety</h1>

                   <Bar data={dailySpend}/>
               </main>
          <aside class="w-full sm:w-1/3 md:w-2/4 px-2">
               <div class="top-0 p-4 w-full">
               <p className='text-[#00df90] font-bold  text-l pt-10'>Comparing Transaction Amounts</p>

               <span>This chart shows you your average daily spend. This could be useful as it may be higher than expected and you may wish to investigate further where most of you daily expense is coming from.<br/><br/> <strong>Summary:</strong><br/></span>


               <span><strong><br/>July </strong>  </span>
               <span><br/>Average Daily Expendature : <strong> £50.53</strong></span>

               <span><strong><br/>June </strong>  </span>
               <span><br/>Average Daily Expendature: <strong>£34.60</strong></span>

               <span><strong id=''></strong></span>

                
               </div>
                </aside>
           </div>
           <div className='w-full bg-black h-0.5'></div>
           <div className='flex justify-around py-5 '>

            <div className='w-full bg-[#9ad0f5]  pl-5 pr-5 rounded'><h1 className='py-5'><strong>July Statement Summary</strong></h1>
            <p className='py-5'> <strong className='italic'>Spending Pattern Over Time<br></br></strong>You had a relatively inconsistent spending pattern with the highest number of transactions at the start of the month, by altering your spending habits and spending less at the start you could avoid having to budget later in the month.</p>
          
            <p className='py-5'> <strong className='italic'>Most Common Purchase <br></br></strong> Your most common purchase makes up 7% of all transactions, it may be worth investigating whether this is an essential purchase or whether you could cut down on it  </p>

            <p className='py-5'> <strong className='italic'>Transaction Amounts <br></br></strong>Your most expensive transaction is 110% more expensive than your average transaction cost. If this is not an essential purchase it may be worth either reconsidering the purchase or paying in installments  </p>

            <p className='py-5'> <strong className='italic'>Daily Expendature <br></br></strong>Your average daily cost is £50.53, if you are looking to save money it may be worth investigating this further and seeing where exactly you are spending your money on a day by day basis. Small purchases can gradually add up over time. </p>

            </div>
            <div>&nbsp;</div>
            <div className='w-full bg-[#ffb1c1] pl-5 pr-5 rounded'><h1 className='py-5'><strong >June Statement Summary</strong></h1>
            <p className='py-5'> <strong className='italic'>Spending Pattern Over Time<br></br></strong>You had a relatively inconsistent spending pattern with the highest number of transactions at the start of the month, by altering your spending habits and spending less at the start you could avoid having to budget later in the month.</p>
          
            <p className='py-5'> <strong className='italic'>Most Common Purchase <br></br></strong> Your most common purchase makes up 9% of all transactions, it may be worth investigating whether this is an essential purchase or whether you could cut down on it  </p>

          <p className='py-5'> <strong className='italic'>Transaction Amounts <br></br></strong>Your most expensive transaction is 50% more expensive than your average transaction cost. If this is not an essential purchase it may be worth either reconsidering the purchase or paying in installments  </p>

          <p className='py-5'> <strong className='italic'>Daily Expendature <br></br></strong>Your average daily cost is £34.60, if you are looking to save money it may be worth investigating this further and seeing where exactly you are spending your money on a day by day basis. Small purchases can gradually add up over time. </p>


            </div>


           </div>
           </div>
      </Dialog>



            
        {/* </div> */}
   
    
          <div className='text-white' style={{display:'none'}}>Stats<br/>
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
