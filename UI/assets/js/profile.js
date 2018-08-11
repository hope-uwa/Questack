const params = (new URL(document.location)).searchParams;
const thread = params.get('thread');

// let params = (new URL(document.location)).searchParams;
// let name = params.get("name"); // is the string "Jonathan"
// let age = parseInt(params.get("age")); // is the number 18

if (thread === 'recent') {
  document.getElementById('thread-title').innerHTML = 'Recent Questions';
  document.getElementById('recent').style.display = "display";
  document.getElementById('most-answer').style.display = "none";
  document.getElementById('all').style.display = "none";
}
else if(thread === "mostanswer"){
    document.getElementById('thread-title').innerHTML = 'Most Answered';
    document.getElementById('recent').style.display = "none";
    document.getElementById('most-answer').style.display = "display";
    document.getElementById('all').style.display = "none";
}
else if(thread==="all"){
    document.getElementById('thread-title').innerHTML = 'All Threads';
    document.getElementById('recent').style.display = "none";
    document.getElementById('most-answer').style.display = "none";
    document.getElementById('all').style.display = "display";
}
