# 2023-quiz-game
<h1 align="center">A simple quiz game</h1>
<hr>
<div align="center"> <img src="readme_files/screenshot_1.png" width='500'></div>
This is a simple quiz game I created using HTML, CSS, and vanilla JavaScript in two days. This project was necessary to show proof of understanding of the model-view-controller framework of web development. Unfortunately, I was unable to, in the time given, complete a project for a class that I am attending. This is a small redo of that assignment.<br>

The current version comes preloaded with a few python related questions that I created. The reason for choosing these questions is because of my constant confusion between javascript and python concepts. <br>

In the source file, there are also two other question libraries that are related to (1) TV shows, and (2) India. 

<hr>

<h2>About</h2>

<h2>The Gameplay</h2>
The gameplay is simple.  A user can select and click through the questions.<br>
For each multiple-choice question, by editing the library array, a user can add as many false answers as desired.<br>
<div align="center"> <img src="readme_files/sample_object.png" width='500'></div>
In the library array, each question (herein, referred to as [Q],) has the following template:<br>
`[[question],[correctAnswer, incorrectAnswer, incorrectAnswer, . . . ], int]`<br>
where:<br>
1) position [0] is the question,<br>
2) position [1] are the multiple choice answers, and<br>
3) position [2] is a number that indicates an exception.<br>
<br>
Generally, position [Q][1][0] contains the correct answer, and all following indices (e.g. [Q][1][1]. [Q][1][2]. [Q][1][3]. [Q][1][4], [Q][1][5]... etc.) contain incorrect answers. <br>
The reason I designed this program to include a multitude of false answers was to make the game more interesting. It would be possible to optimize the false answers so that the questions can be easier or more difficult.<br>

Another important aspect was to include an exception parameter, indicated by position [2].<br>
In this current version of the game, [Q][1][2] = 1 indicates that a single answer at position [Q][1][0] is the correct answer, while [Q][1][2] = 0 indicates that all answers are acceptable.<br>
Proceeding versions of this game can include other options for this parameter (for example: [Q][1][2] = 2 -> two answers are acceptable,[Q][1][2] = 3 -> three answers are acceptable, etc.) <br>

<hr>

<h2>The Process</h2>

Initial mockups were created quickly in Adobe illustrator. <br>
<div align="center"> <img src="readme_files/prototype.png" width='500'></div>
I wanted to create a simple interface for selecting and submitting answers.<br>
I chose a simple, type-writer-esque font (Source Serif Pro) from <a href="https://fonts.google.com/specimen/Source+Serif+Pro?query=source+serif">Google Fonts</a>. The colors were generated through <a href="https://colorhunt.co/palette/ede9d5e7ab9adf7857617143">colorhunt, here</a>. <br>

<hr>

<h2>Next Steps</h2>

Subsequent versions will include ways to select from a set of questions. It is my hope to include slightly technical or slightly esoteric questions in these additional versions.<br>
It is also my hope to be able to recall previous progress by reading from local storage, so that users can come back to a question set. <br>

