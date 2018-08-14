
let questionDisplayBtn = document.getElementById('askQuestion');
let questionBanner = document.getElementById('questionBanner');

let askQuestion = () => {
    questionBanner.style.display = "block";
    questionDisplayBtn.style.display = "none";

};
let cancelQuestion = () => {
    questionBanner.style.display = "none";
    questionDisplayBtn.style.display = "block";
}

