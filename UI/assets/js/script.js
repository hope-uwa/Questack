
let questionDisplayBtn = document.getElementById('askQuestion');
let questionBanner = document.getElementById('questionBanner');


let dropDownMenu = () =>{
    document.getElementById('dropdown-menu').classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropDownBtn')) {
  
      let dropdowns = document.getElementsByClassName("profile__actions");
      let i;
      for (i = 0; i < dropdowns.length; i++) {
        let openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


let askQuestion = () => {
    questionBanner.style.display = "block";
    questionDisplayBtn.style.display = "none";

};
let cancelQuestion = () => {
    questionBanner.style.display = "none";
    questionDisplayBtn.style.display = "block";
}


