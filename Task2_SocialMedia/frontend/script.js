let likes = [24, 41, 57, 12, 68, 9, 73, 59, 88];
let comments = [[], [], [], [], [], [], [], [], []];

function like(index) {
  likes[index]++;
  document.getElementById("like" + index).innerText = likes[index];
}

function addComment(index) {
  let input = document.getElementById("comment" + index);
  let text = input.value;
  if (!text) return;

  comments[index].push(text);
  input.value = "";
  showComments(index);
}

function showComments(index) {
  let div = document.getElementById("comments" + index);
  div.innerHTML = "";

  comments[index].forEach(c => {
    div.innerHTML += `<p><b>user</b> ${c}</p>`;
  });
}
