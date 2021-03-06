# Team Webpage Generator

A command-line application to generate a professional-looking webpage that tells about your team and each member.

## Table of Contents

- [Description](#Description)

- [Usage Guide](#Usage-Guide)

- [Demonstration](#Demonstration)

## Description

This webpage generator uses npm Inquirer to prompt the user a series of questions that allow the user to input data for a single manager and any amount of engineers and/or interns without worrying about formatting, placement, or webpage style. Some final manipulation of the webpage may be necessary to insert pictures of team members and add any other relevant sections that are not included. The generator automatically makes a card for each employee so that their information is all contained in a single simple-to-understand area.

## Usage Guide

Be sure to install all of the dependencies. To do this, navigate in your terminal to the folder that holds the team webpage generator files and type:

```bash
npm i
```

Once those are installed, simply run the program by typing:

```bash
node app.js
```

The program should prompt for answers with relevant questions. The manager will appear first, then all engineers, then interns. Interns and engineers will be listed in order that they are inputed, with the exception that all engineers will appear before any interns. Once finished inputting employees, simply select the 'Don't add any more employees and generate my webpage!' option. Finally, an option to name your webpage something other than team.html will be prompted to the user, after which the webpage will be generated in the output folder.

## Demonstration

There are two example webpages that were generated with the app in the "output" folder that comes with the application. The name was changed in the app for the 'stellarteam.html' file. In this file, the intern was entered first, but appears last. Engineers can get cranky. The other file, titled 'team.html' may be overwritten with any team web pages generated by the user if they choose to leave the default webpage name. A video of the second file's creation can be found [here](https://drive.google.com/file/d/1P1JP_tOnnq8dajjnSWXtUPWGiIcXS3q3/view).
