let age = document.getElementById("age");

setInterval(() => {
    let time = (new Date() - new Date(1106812800000)) / 31556952000; // milliseconds per year
    age.innerText = time.toString().substring(0, 12);
}, 50);
