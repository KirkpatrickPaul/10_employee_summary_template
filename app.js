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
    name: "managerID",
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

//prompter calls itself so that any amount of engineers or interns can be added.
function prompter() {
  const engineersArr = [];
  const internsArr = [];
  inquirer.prompt(promptQ).then((answer) => {
    if (answer.nextQuestion === "Add an Engineer") {
      engineersArr.push(engineerBuilder());
      prompter();
    } else if (answer.nextQuestion === "Add an Intern") {
      internsArr.push(internBuilder());
      prompter();
    } else {
      // engineers and interns are seperated into two arrays to make sure that the engineers always come before interns so the engineers don't get grumpy.
      return [...engineersArr, ...internsArr];
    }
  });
}
function engineerBuilder() {
  inquirer.prompt(engineerQ).then((answers) => {
    return new Engineer(
      answers.engineerName,
      answers.engineerID,
      answers.engineerEmail,
      answers.engineerGithub
    );
  });
}
function internBuilder() {
  inquirer.prompt(internQ).then((answers) => {
    return new Intern(
      answers.internName,
      answers.internID,
      answers.internEmail,
      answers.internSchool
    );
  });
}

inquirer.prompt(managerQ).then((answers) => {
  const manager = new Manager(
    answers.managerName,
    answers.managerID,
    answers.managerEmail,
    answers.managerOffice
  );
  const myHTML = render([manager, ...prompter()]);
  fs.writeFile("./output/team.html", myHTML, "text/html");
});
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
