const token = localStorage['ascii-mt-token'];
const username = localStorage['ascii-mt-username'];
const userJoined = localStorage['ascii-mt-createdat'];

let i;
let j;
let k;
const userN = document.getElementsByClassName('user');
const userI = document.getElementsByClassName('user-letter');
const userJoinedDate = document.getElementsByClassName('user-joined');
for (i = 0; i < userN.length; i += 1) {
  userN[i].innerHTML = username;
}
for (j = 0; j < userI.length; j += 1) {
  userI[j].innerHTML = username.charAt(0);
}
for (k = 0; k < userJoinedDate.length; k += 1) {
  userJoinedDate[k].innerHTML = moment(userJoined).fromNow();
}
