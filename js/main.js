// Set Navigator and Date Values ASAP to Avoid Text Flash on Load
document.getElementById("useragent").innerText = navigator.userAgent;
document.getElementById("date").innerText = new Date().toString();

setInterval(() => {
    let time = (new Date() - new Date(1106812800000)) / 31556952000; // unix time of birth / milliseconds per year
    document.getElementById("age").innerHTML = time.toString().substring(0, 12);
}, 50);

const projects_text = "BBBBBBBBBBBBBBBBBBB";

const about_text = "AAAAA<u>BBBBBBB</u>AAAAAAAAAAAAAAAAA<span>*asdasd*</span>wewewewe";

const intro_text =
    "<i>Hello!</i><br>" +
    "I'm Aniket Chadalavada, a <span id='age'></span>-year-old full-stack developer based in Cumming, Georgia.<br><br>" +
    "I am:<br>" +
    "* A junior at <a href='https://www.forsyth.k12.ga.us/alliance' target='_blank' rel='noopener'>Alliance Academy for Innovation</a>.<br>" +
    "* Lead Developer for <a href='https://www.avengerrobotics.org/' target='_blank' rel='noopener'>FIRST Tech Challenge Team 14892.</a><br>" +
    "* Developer for <a href='https://www.avengerrobotics.org/' target='_blank' rel='noopener'>FIRST Robotics Competition Team 7451.</a><br>" +
    "To learn more about me run <a onclick='usertype(\"cat about.txt\", output, about_text);' style='cursor: pointer;'><u>cat about.txt</u></a>, to read about my projects run <a onclick='usertype(\"cat projects.txt\", output, projects_text);' style='cursor: pointer;'><u>cat projects.txt</u></a>.<hr>" +
    "This portfolio is based on the UI of Windows Powershell and the functions of a classic Unix terminal."

const files = {
    "about.txt": about_text,
    "intro.txt": intro_text,
    "projects.txt": projects_text
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

// Block Enter Key
document.onkeydown = function (e) {
    if (e.key === "Enter") {
        return false;
    }
}

// Detect and Check Input on "Enter"
document.getElementById("userinput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkInput()
        document.getElementById("userinput").innerHTML = "";
    }
});

// Read Input from Terminal and Generate Appropriate Output
function checkInput() {
    const uiHTML = document.getElementById("userinput").innerHTML;
    document.getElementById("maincontent").innerHTML += uiHTML + "<br>";
    if (uiHTML.startsWith("cat")) {
        const file = files[uiHTML.substring(uiHTML.indexOf(" ") + 1)];
        if (file) {
            output(file);
        } else {
            output("File not found. Run <a onclick='usertype(\"ls\", output, undefined);' style='cursor: pointer;'><u>ls</u></a>");
        }

    } else if (uiHTML.startsWith("start")) {
        open(uiHTML.substring(uiHTML.indexOf(" ") + 1));

    } else if (uiHTML.startsWith("ls")) {
        let out = "";
        for (const filesKey in files) {
            console.log(filesKey);
            console.log(files[filesKey]);
            out += `<a onclick='usertype(\"cat ${filesKey}\", output, files[\"${filesKey}"]);' style='cursor: pointer;'><u>${filesKey}</u></a> `;
        }
        output(out);

    } else {
        if (uiHTML === "") {
            generateCursor(false);
        } else {
            output("Command not recognized. Run help for a list of valid commands.");
        }

    }
}