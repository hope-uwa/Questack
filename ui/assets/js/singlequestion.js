const questionUrl = '/api/v1/questions';
const questionBoard = document.querySelector('.question-board');
const answerBoard = document.querySelector('.answers-board');



const pageUrlArray = document.URL.split('/');
const pageUrl = pageUrlArray[pageUrlArray.length - 1];
const singleQuestionUrl = `${questionUrl}/${pageUrl}`

const singleQuestion = () => {

  fetch(singleQuestionUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'

    },
    credentials: 'same-origin'
  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 200) {
        messageBox.classList.add('message-failure');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
      } else {

        console.log(message)
        const questionHead = `
        
            <div class="col9">
            <div class="question-head mb1">
                <h1><i class="fa fa-question"></i> ${message.question.title}</h1>
                <span class="ml2">${message.question.dateCreated} by</span><span> ${message.question.username}</span>
            </div>
            </div>
            <div class="col3 pt1 pb1">
                    <button id="askQuestion" onclick="loginModalBtn()" class="btn btn-success btn-md btn-shadow">
                            Ask a Question
                        </button>
            </div>
            <div class="question-body">
                    ${message.question.body}
            </div>
            

       
        `;

        questionBoard.innerHTML = questionHead;
        let answers = '';
        if (message.question.answers === 'No answer added yet') {
          answers = 'No answer has been given to the question Yet';
        } else {
          message.question.answers.forEach((answer) => {
            console.log(answer)
            answers += `<div class="answers-card pt1 pb1">
                          <div class="answer__avatar">
                              <span class="answer__avatar-img">${answer.user_name.charAt(0)}</span>
                              
                          </div>
  
                          <div class="answer__content">
                              <div class="answer__content-title">
                                  <span>${moment(answer.created_at).fromNow()}</span> <span>by</span>
                                  <span class=""><a class="green-text link-nostyle blckgrey-text" href="">${answer.user_name}</a></span>
                              </div>
                              <div class="answer__content-body">
                                  <span>${answer.answer_body}</span>
                              </div>
                              <div class="align-right mr2">
                                      <span><i class=" ml1 msl1 vote fa "></i><sup></sup></span>
                                      <span><i class=" ml1 msl1 vote fa "></i><sup></sup></span>
                                      <span><i class="ml1 msl1 fa "></i><sup></sup></span>
  
                              </div>
                          </div>
                          <div class="answer__response black-text">
                              
                              
                          </div>
                          
                      </div>
                    `;
          })

        }
        answerBoard.innerHTML = answers;


      }
    });
  })
    .catch((err) => {
      console.log(err);
    });
  return null;
};

singleQuestion();








