// Set Navigator and Date Values ASAP to Avoid Text Flash on Load
document.getElementById("useragent").innerText = navigator.userAgent;
document.getElementById("date").innerText = new Date().toString();

const commands = new Commands();

// Dynamic Age Calculation in "intro.txt"
setInterval(() => {
    let time = (new Date() - new Date(1106812800000)) / 31556952000; // unix time of birth / milliseconds per year
    for (let i = 0; i < document.getElementsByClassName("age").length; i++) {
        document.getElementsByClassName("age")[i].innerHTML = time.toString().substring(0, 12);
    }
}, 50);

let history = [];
let historypos = 0;

const projects_text = "BBBBBBBBBBBBBBBBBBB";

const about_text = "asd";

const intro_text =
    "<i>Hello!</i><br>" +
    "I'm Aniket Chadalavada, a <span class='age'></span>-year-old full-stack developer based in Cumming, Georgia.<br><br>" +
    "I am:<br>" +
    "* A junior at <a href='https://www.forsyth.k12.ga.us/alliance' target='_blank' rel='noopener'>Alliance Academy for Innovation</a>.<br>" +
    "* The Lead Developer for <a href='https://www.avengerrobotics.org/' target='_blank' rel='noopener'>FIRST Tech Challenge Team 14892.</a><br>" +
    "* A Developer for <a href='https://www.avengerrobotics.org/' target='_blank' rel='noopener'>FIRST Robotics Competition Team 7451.</a><br>" +
    "To learn more about me run <span class='typedlink' onclick='usertype(\"cat about.txt\", output, about_text);' style='cursor: pointer;'><u>cat about.txt</u></span>, to read about my projects run <span class='typedlink' onclick='usertype(\"cat projects.txt\", output, projects_text);' style='cursor: pointer;'><u>cat projects.txt</u></span>.<hr>" +
    "This portfolio is based on the functions of a classic Unix terminal. Run <span class='typedlink' onclick='usertype(\"help\", commands.help, 0);' style='cursor: pointer;'><u>help</u></span> for a list of valid commands.<br>" +
    "While this website emulates a terminal and is primarily text-and-input based, it is still a website. <span class='typedlink' onclick='usertype(\"echo Hello World!\", output, \"Hello World!\");' style='cursor: pointer;'><u>Underlined text is clickable</u></span>.<br>" +
    "<i>This website is still in development.</i>";

const secret_text = "\"/(DES)/LEWKEN\"<br>" +
    "Hint: 2π Vigenere";

const logo_text = "Toasty Terminal<br>" +
    "Pasteleft ThatCrispyToast. No lefts unlimited.<br><br>" +
    "User Agent: USERAGENT<br>" +
    "Time: TIME<br>"

const files = {
    "about.txt": about_text,
    "intro.txt": intro_text,
    "projects.txt": projects_text,
    "secret.txt": secret_text,
    "logo.txt": logo_text
}

// Run Terminal Animation On Window Load
window.onload = function () {
    intro();
    document.getElementById("userinput").focus();
};

function intro() {
    usertype("cat intro.txt", output, intro_text);
}

// Update Time
setInterval(function () {
    document.getElementById("date").innerText = new Date().toString()
}, 1000);

// Emulate User Typing
function usertype(totype, run, out) {
    let i = 0;
    const typingInterval = setInterval(function () {
        document.getElementById("maincontent").innerHTML += totype[i];
        i++;
        if (i >= totype.length) {
            document.getElementById("maincontent").innerHTML += "<br>";
            clearInterval(typingInterval);
            run(out);
        }
    }, 50);
}

// Emulate Terminal Output
function output(out) {
    document.getElementById("maincontent").innerHTML += out;
    generateCursor();
}

// Write Cursor Text to Terminal
function generateCursor(lbr = true) {
    if (lbr) {
        document.getElementById("maincontent").innerHTML += "<br>";
    }
    document.getElementById("maincontent").innerHTML += "C:\\visitor> ";
    document.getElementById("text-window").scrollTop = document.getElementById("text-window").scrollHeight;
}

/* -----KEY HANDLING----- */
// Block Enter Key
document.onkeydown = function (e) {
    if (e.key === "Enter") {
        return false;
    }
}

// Detect and Check Input on "Enter" + Handle Arrow Key Command Movement
document.getElementById("userinput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        historypos = 0;
        history.push(document.getElementById("userinput").innerHTML);
        checkInput()
        document.getElementById("userinput").innerHTML = "";
    } else if (event.key === "ArrowUp") {
        if (history.length - historypos > 0) {
            historypos++;
            document.getElementById("userinput").innerHTML = history[history.length - historypos];
        }
    } else if (event.key === "ArrowDown") {
        if (history.length - historypos < history.length - 1) {
            historypos--;
            document.getElementById("userinput").innerHTML = history[history.length - historypos];
        } else {
            document.getElementById("userinput").innerHTML = "";
        }
    }
});
/* ------------------------ */

// Read Input from Terminal and Generate Appropriate Output
function checkInput() {
    const uiHTML = document.getElementById("userinput").innerHTML;
    document.getElementById("maincontent").innerHTML += uiHTML + "<br>";
    let found = false;
    commandNames = Object.getOwnPropertyNames(Commands.prototype).slice(1);
    for (const commandName in commandNames) {
        if (uiHTML.startsWith(commandNames[commandName]) && !found) {
            Commands.prototype[commandNames[commandName]](uiHTML);
            document.getElementById("userinput").innerHTML = "";
            found = true;
        }
    }
    if (!found && uiHTML == "") {
        generateCursor(false);
    } else {
        output("Command not recognized. Run <span class='typedlink' onclick='usertype(\"help\", commands.help, 0);' style='cursor: pointer;'><u>help</u></span> for a list of valid commands.");
    }

}