window.onload = function(){ 
    var signUpModal = document.getElementById('signUpModal');
    var loginModal = document.getElementById('loginModal');
    var signUpBtn = document.getElementById("signupModalBtn");
    var closeSpanx = document.getElementsByClassName("close")[0];
    var loginBtn = document.getElementById("loginModalBtn")
    
    // signUpBtn.onclick = function() {
    //     signUpModal.style.display = "inline-block";
    // }
    // signUpSpanx.onclick = function() {
    //     signUpModal.style.display = "none";
    // };
    loginBtn.onclick = function() {
        loginModal.style.display = "inline-block";
    }
    closeSpanx.onclick = function() {
        loginModal.style.display = "none";
        signUpModal.style.display = "none";
    };
 }