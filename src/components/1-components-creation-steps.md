## Component creation steps

To build our new components, we should follow the same steps as before.

- Create a file with our component name
- Create & Export the component function
- Add the base HTML in the return statement of our component
- Create & Import a CSS / SCSS file holding the style of our component
- Write stories for Storybook to render our component in isolation
- Refactor the hardcoded content to use props & state

<!--  -->

## Understanding the InterviewerListItem

Our InterviewerListItem component takes in the following props:

id:number - the id of the interviewer

name:string - the name of the interviewer

avatar:url - a url to an image of the interviewer

selected:boolean - to determine if an interview is selected or not

setInterviewer:function - sets the interviewer upon selection

## Understanding the InterviewerList

Our InterviewerList takes in three props:

interviewers:array - an array of objects containing the information of each interviewer

interviewer:number - the id of an interviewer

setInterviewer:function - a function that accepts an interviewer id
