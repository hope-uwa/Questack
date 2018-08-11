window.onload = function(){ 
 let questionDisplayBtn = document.getElementById('askQuestion');
 let questionBanner = document.getElementById('questionBanner');
 let cancelQuestion = document.getElementById('cancel-question');
 questionDisplayBtn.onclick =()=>{
    
     questionBanner.style.display="block";
     questionDisplayBtn.style.display="none";
 }
 cancelQuestion.onclick =()=>{
    questionBanner.style.display="none";
    questionDisplayBtn.style.display="block";

 }
 
}