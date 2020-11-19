const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const managerQ = [
  {
    type: "input",
    name: "managerName",
    message: "What is the manager's name?",
  },
  {
    type: "number",
    name: "managerID",
    message: "What is the manager's ID Number?",
  },
  {
    type: "input",
    name: "managerEmail",
    message: "What is the manager's email Address?",
  },
  {
    type: "input",
    name: "managerOffice",
    message: "What is the manager's Office Number?",
  },
];
const promptQ = [
  {
    type: "list",
    name: "nextQuestion",
    message: "Add more Employees to the page?",
    choices: [
      "Add an Engineer",
      "Add an Intern",
      "Don't add any more employees and generate my webpage!",
    ],
  },
];
const internQ = [
  {
    type: "input",
    name: "internName",
    message: "What is the intern's name?",
  },
  {
    type: "number",
    name: "internID",
    message: "What is the intern's ID Number?",
  },
  {
    type: "input",
    name: "internEmail",
    message: "What is the intern's email Address?",
  },
  {
    type: "input",
    name: "internSchool",
    message: "Where does the intern go to school?",
  },
];
const engineerQ = [
  {
    type: "input",
    name: "engineerName",
    message: "What is the engineer's name?",
  },
  {
    type: "number",
    name: "engineerID",
    message: "What is the engineer's ID Number?",
  },
  {
    type: "input",
    name: "engineerEmail",
    message: "What is the engineer's email Address?",
  },
  {
    type: "input",
    name: "engineerGithub",
    message: "What is the engineer's Github username?",
  },
];
const nameQ = [
  {
    type: "input",
    name: "htmlName",
    message: `What would you like your html to be named? (Don't include ".html" at the end).`,
    default: "team",
  },
];

//prompter calls itself so that any amount of engineers or interns can be added.
//I ended up having to add all 3 types of employee so that each array or object carries over into the next iteration without modifying objects in the global scope.
async function prompter(manager, engineers, interns) {
  inquirer.prompt(promptQ).then((answer) => {
    if (answer.nextQuestion === "Add an Engineer") {
      const engineersArr = engineers;
      inquirer.prompt(engineerQ).then((answers) => {
        const newEngineer = new Engineer(
          answers.engineerName,
          answers.engineerID,
          answers.engineerEmail,
          answers.engineerGithub
        );
        engineersArr.push(newEngineer);
        prompter(manager, engineersArr, interns);
      });
    } else if (answer.nextQuestion === "Add an Intern") {
      const internsArr = interns;
      inquirer.prompt(internQ).then((answers) => {
        const newIntern = new Intern(
          answers.internName,
          answers.internID,
          answers.internEmail,
          answers.internSchool
        );
        internsArr.push(newIntern);
        prompter(manager, engineers, internsArr);
      });
    } else {
      inquirer.prompt(nameQ).then((answer) => {
        // engineers and interns are seperated into two arrays to make sure that the engineers always come before interns so the engineers don't get grumpy.
        const myHTML = render([manager, ...engineers, ...interns]);
        fs.writeFileSync(`./output/${answer.htmlName}.html`, myHTML);
      });
      return;
    }
  });
}

//this is where everything actually starts.
inquirer.prompt(managerQ).then((answers) => {
  const manager = new Manager(
    answers.managerName,
    answers.managerID,
    answers.managerEmail,
    answers.managerOffice
  );
  prompter(manager, [], []);
});
