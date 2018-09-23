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
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    credentials: 'same-origin'
  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 200) {
        messageBox.classList.add('message-failure');
        messageBox.classList.remove('message-success');
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
                    <button id="askQuestion" onclick="askQuestion()" class="btn btn-success btn-md btn-shadow">
                            Ask a Question
                        </button>
            </div>
            <div class="question-body">
                    ${message.question.body}
            </div>
            

       
        `;
        const del = `
        ${(message.question.username === username ? '<button id="deleteButton" class=" btn btn-danger"> Delete</button>' : '')}
                    `
        console.log(username)
        questionBoard.innerHTML = questionHead;
        document.getElementById('delete').innerHTML = del;
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
                               ${(answer.user_name === username ? '<span><i class=" ml1 msl1 vote fa fa-thumbs-o-up"></i><sup>20</sup></span>' : '')}       
                                      <span><i class=" ml1 msl1 vote fa fa-thumbs-down"></i><sup>50</sup></span>
                                      
                                ${(message.question.username === username ? '<div class="tooltip"><i class=" ml1 msl1 mark-it fa fa-check"></i>'
                                        + '<span class="tooltiptext">Mark as Preferred</span>'
                                      + '</div>' : '')}
            
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


// post an answer
const answerForm = document.getElementById('answer-form');
const postAnswerUrl = `../api/v1/questions/${pageUrl}/answers`;
const answerBtn = document.getElementById('answerQuestion');


answerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  answerBtn.disabled = true;
  answerBtn.innerHTML = 'Processing..';

  const body = document.getElementById('answer').value;
  // add conditonal statements here



  fetch(postAnswerUrl, {
    method: 'POST',
    body: JSON.stringify({ body: body }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    }

  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 201) {
        messageBox.classList.add('message-failure');
        messageBox.classList.remove('message-success');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
        answerBtn.disabled = false;
        answerBtn.innerHTML = 'Add Answer'
        // return null;
      } else {
        messageBox.classList.add('message-success');
        messageBox.classList.remove('message-failure');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
        window.setTimeout(() => { window.location.href = `/questions/${message.questionId}`; }, 1000);
        //   return null;
      }




    })
  })
    .catch((err) => {
      console.log(err)
    })



})


// delete a question

const deleteBtn = document.getElementById('deleteButton')
const deleteUrl = `../api/v1/questions/${pageUrl}`
deleteBtn.addEventListener('click', (event) => {
  event.preventDefault();

  alert('Are You Sure You want Delete it?')


  fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    }

  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 200) {
        messageBox.classList.add('message-failure');
        messageBox.classList.remove('message-success');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
      } else {
        messageBox.classList.add('message-success');
        messageBox.classList.remove('message-failure');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');

        window.setTimeout(() => { window.location.href = '../profile'; }, 1000);
        //   return null;
      }


    })
  })
    .catch((err) => {
      console.log(err)
    })



})


const preferred = (qid, aid) => {

  const preferredBtn = document.getElementById('deleteButton')
  const preferredUrl = `../api/v1/questions/${qid}/answers/{aid}`
  preferredBtn.addEventListener('click', (event) => {
    event.preventDefault();



    fetch(preferredUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${token}`
      }

    }).then((response) => {
      response.json().then((message) => {
        if (response.status !== 200) {
        messageBox.classList.add('message-failure');
        messageBox.classList.remove('message-success');
        messageBox.innerHTML = message.message;
        //   return null;
        }
        else{
        messageBox.classList.add('message-success');
        messageBox.classList.remove('message-failure');
        messageBox.innerHTML = message.message;
        window.setTimeout(() => { window.location.href = `./questions/${qid}`; }, 1000);
        // return null;
        }
      })
    })
      .catch((err) => {
        console.log(err)
      })



  })

}


