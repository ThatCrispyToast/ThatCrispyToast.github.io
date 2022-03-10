// Set Navigator and Date Values ASAP to Avoid Text Flash on Load
document.getElementById("useragent").innerText = navigator.userAgent;
document.getElementById("date").innerText = new Date().toString();

// Run Terminal Animation On Window Load
window.onload = function() {
    usertype("cat intro.txt", intro);
    document.getElementById("userinput").focus();
};

// Update Time
setInterval(function () {document.getElementById("date").innerText = new Date().toString()}, 1000);

// Emulate User Typing
function usertype(totype, run) {
    let i = 0;
    const typingInterval = setInterval(function () {
        document.getElementById("maincontent").innerHTML += totype[i];
        i++;
        if (i >= totype.length) {
            document.getElementById("maincontent").innerHTML += "<br>";
            clearInterval(typingInterval);
            run();
        }
    }, 50);
}

// Emulate Terminal Output
function intro() {
    const output = "<i>Hello!</i><br>" +
        "I'm Aniket Chadalavada, an aspiring full-stack developer based in Cumming, Georgia.<br><br>" +
        "I am:<br>" +
        "* A junior at <a href='https://www.forsyth.k12.ga.us/alliance' target='_blank'>Alliance Academy for Innovation</a>.<br>" +
        "* Lead Developer for <a href='https://www.avengerrobotics.org/' target='_blank'>FIRST Tech Challenge Team 14892.</a><br>" +
        "* Developer for <a href='https://www.avengerrobotics.org/' target='_blank'>FIRST Robotics Competition Team 7451.</a><br>" +
        "To learn more about me run: \"<a onclick='usertype(\"cat about.txt\", about);' style='cursor: pointer;'><u>cat about.txt</u></a>\"<hr>" +
        "This portfolio is based on the UI of Windows Powershell and the functions of a classic Unix terminal.";
    document.getElementById("maincontent").innerHTML += output;
    generateCursor();
}

function generateCursor() {
    document.getElementById("maincontent").innerHTML += "<br>C:\\visitor> ";
    document.getElementById("text-window").scrollTop = document.getElementById("text-window").scrollHeight;
}

function about() {
    const output = "aaaaa<br>aaaaa<br>aaaaa<br>aaaaa<br>aaaaa<br>aaaaa<br>aaaaa<br>aaaaa<br>aaaaa<br>aaaaa"
    document.getElementById("maincontent").innerHTML += output;
    generateCursor();
}

document.getElementById("userinput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        checkInput()
        document.getElementById("userinput").innerHTML = "";
    }
});

function checkInput() {
    document.getElementById("maincontent").innerHTML += document.getElementById("userinput").innerHTML + "<br>";
    switch (document.getElementById("userinput").innerHTML) {
        case "cat about.txt":
            about();
    }
}

document.onkeydown = function (e) {
    if (e.key === "Enter") {
        return false;
    }
}