var i = 0;
var txt = '{ThatCrispyToast}';
var speed = 50;

function typeWriter() {
    if (i < txt.length) {
      document.getElementById("name").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }