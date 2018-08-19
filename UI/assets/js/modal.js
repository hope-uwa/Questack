window.onload = function(){ 
    let signUpModal = document.getElementById('signUpModal');
    let loginModal = document.getElementById('loginModal');
    let signupBtn = document.getElementById("signupModalBtn");
    let closeSpanx = document.getElementsByClassName("close")[0];
    let signupClose = document.getElementById('s-close');
    let loginBtn = document.getElementById("loginModalBtn");
    let signupBtnX =document.getElementById('signupModalBtnX');

    
    
 }
 let loginModalBtn = () => {
    loginModal.style.display = "inline-block";

}
let signupModalBtn = ()=> {
    signUpModal.style.display = "inline-block";
    loginModal.style.display = "none";

}
let closeModal = () => {
        signUpModal.style.display = "none";
        loginModal.style.display = "none";
    }
