class Commands {
    static commandlist = {
        "cat [filename.txt]": "Outputs the content of a file to the terminal.",
        "clear": "Clears the terminal window.",
        "echo [text]": "Outputs [text] to the terminal.",
        "exit": "Closes the terminal window.",
        "help": "Outputs a list of valid commands, their parameters, and their definitions to the terminal.",
        "ls": "Outputs a list of files present in the immediate directory.",
        "start [url]": "Opens a new browser window at /[url] or [url.com].",
    
    }

    cat(uiHTML) {
        const file = files[uiHTML.substring(uiHTML.indexOf(" ") + 1)];
        if (file) {
            output(file);
        } else {
            output("File not found. Run <span class='typedlink' onclick='usertype(\"ls\", ls, 0);' style='cursor: pointer;'><u>ls</u></span>");
        }
    }

    clear() {
        document.getElementById("maincontent").innerHTML = "";
        document.getElementById("logo").innerHTML = "";
        generateCursor(false);
    }

    echo(uiHTML) {
        output(uiHTML.substring(document.getElementById("userinput").innerHTML.indexOf(" ") + 1));
    }

    start(uiHTML) {
        open(uiHTML.substring(uiHTML.indexOf(" ") + 1));
        output("Starting \"" + uiHTML.substring(uiHTML.indexOf(" ") + 1) + "\"...");
    }

    ls() {
        let out = "";
        for (const filesKey in files) {
            out += `<span class='typedlink' onclick='usertype(\"cat ${filesKey}\", output, files[\"${filesKey}"]);' style='cursor: pointer;'><u>${filesKey}</u></span> `;
        }
        output(out);
    }
    
    help() {
        let out = "------------<br>";
        for (const commandsKey in Commands.commandlist) {
            out += commandsKey + " :|: " + Commands.commandlist[commandsKey] + "<br>";
        }
        output(out + "------------");
    }
}