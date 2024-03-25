const inputContainer=document.getElementById('input-container');
const countdownEl =document.getElementById('countdown');
const countdownForm= document.getElementById('countdownForm');
const complete=document.getElementById('complete');

const datePicker=document.getElementById('date-picker');
const countdownTitleEl=document.getElementById('countdown-title');
const countdownBtn=document.getElementById('countdown-button');
const timeElements=document.querySelectorAll('span');
const completeBtn=document.getElementById('complete-button');
const completeInfo=document.getElementById('complete-info');

let countdownTitle='';
let countdownDate='';
let countdownValue=new Date();
let countdownActive;
let savedCountdown;

let today= new Date().toISOString().split("T")[0];
// console.log(today)

datePicker.setAttribute("min",today);



// Update DOM
function updateDOM(){
  countdownActive=setInterval(()=>{
    currentTime=new Date().getTime();
    const distance =countdownValue -currentTime;
    const days=Math.floor(distance/(1000*60*60*24));
    const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    const minutes=Math.floor((distance%(1000*60*60))/(1000*60));
    const seconds=Math.floor((distance%(1000*60))/1000);
    console.log(days,hours,minutes,seconds);
    // Hide input container
    inputContainer.hidden=true;
    // If the countdown has ended, show complete
    if(distance<0){
        countdownEl.hidden=true;
        clearInterval(countdownActive);
        completeInfo.innerHTML=`${countdownTitle} finished on ${countdownDate}`;
        complete.hidden=false;
    }else{
        // else, show the countdown in progress
        // Populate countdown
        countdownTitleEl.textContent=`${countdownTitle}`;
        timeElements[0].textContent=`${days}`;
        timeElements[1].textContent=`${hours}`;
        timeElements[2].textContent=`${minutes}`;
        timeElements[3].textContent=`${seconds}`;
        complete.hidden=true;
        countdownEl.hidden=false;
    }
  },1000)
}



// Update countdown
function updateCountdown(e){
    e.preventDefault();
    countdownTitle=e.srcElement[0].value;
    countdownDate=e.srcElement[1].value;
    savedCountdown={
        title:countdownTitle,
        date:countdownDate,
    };
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));
    // Check for valid date

    if(countdownDate===''){
        alert('Please select a date for the countdown');
    }
    else{
        countdownValue=new Date(countdownDate).getTime();
        updateDOM();
    }

      
}
function reset(){
    // Hide countdowns, show input
    countdownEl.hidden=true;
    complete.hidden=true;
    inputContainer.hidden=false;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset values
    countdownTitle='';
    countdownDate='';
};

function restorePreviousCountdown(){
    // Get countdown from localStorage if available
    if(localStorage.getItem('countdown')){
        inputContainer.hidden=true;
        savedCountdown=JSON.parse(localStorage.getItem('countdown'));
        countdownTitle=savedCountdown.title;
        countdownDate=savedCountdown.date;
        countdownValue=new Date(countdownDate).getTime();
        updateDOM();
    }
}

countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);

// On load, check localStorage
restorePreviousCountdown();