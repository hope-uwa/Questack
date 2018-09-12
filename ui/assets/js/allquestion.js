const questionUrl = '/api/v1/questions';
const questionDiv = document.querySelector('.allquestion')
const token = localStorage['ascii-mt-token'];

const allquestion = () =>{
fetch(questionUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`,
    },
    credentials: 'same-origin',
  }).then((response) => {
    response.json().then((message) => {
        if(response.status !== 200){

            return null;
        }
        else{
            let questions = ''
            if(message.message.length === 0){
                questions += 'No questions added yet';
            }
            else{
                console.log(message.message)
                message.message.forEach((question)=> {
                    console.log(question)
                  questions += `<div class="questions-card">
                <div class="question__avatar">
                    <span class="answered question__avatar-img"><i class="fa fa-check"></i></span>
                </div>
                <div class="question__content">
                    <h4 class="question__content-title "><a class="link-nostyle blckgrey-text" href="question.html">${question.question_title}</a></h4>
                    <div class="question__content-description">
                        <span>7 days ago</span>
                        <span class="mr2"><a class="green-text" href="">Elpis</a></span><span class="hide-md-show-sm answer-given"><i class="fa fa-comments-o"></i> &nbsp; 5</span>
                    </div>
                    <div class="question__content-body">
                        <span>${question.question_body.substring(0, 150)}</span>
                    </div>
                </div>
                <div class="question__response">
                    
                    <span class="show-md-hide-sm"><i class="fa fa-comments-o"></i> &nbsp; 5</span>
                </div>
                </div>
                `;
                })
                
            }
            questionDiv.innerHTML = questions;

        }
    });
})
.catch((err) => {
    console.log(err)
});
return null;

}
allquestion();