window.onload = function(){ 
    let signUpModal = document.getElementById('signUpModal');
    let loginModal = document.getElementById('loginModal');
    let signupBtn = document.getElementById("signupModalBtn");
    var closeSpanx = document.getElementsByClassName("close")[0];
    let signupClose = document.getElementById('s-close');
    var loginBtn = document.getElementById("loginModalBtn");
    let mainSec = document.getElementById('main');
    let signupBtnX =document.getElementById('signupModalBtnX');

    
    signupBtn.onclick = ()=> {
        signUpModal.style.display = "inline-block";
    }
    
    loginBtn.onclick = () => {
        loginModal.style.display = "inline-block";
    }
    signupClose.onclick = () => {
        signUpModal.style.display = "none";
    }
    closeSpanx.onclick = () => {
        loginModal.style.display = "none";
        
    };
    mainSec.onclick= ()=>{
        signUpModal.style.display="none";
        loginModal.style.display = "none";
    }
    
    signupBtnX.onclick = () => {
        loginModal.style.display = "none";
        signUpModal.style.display = "inline-block";
    }
 }