/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing

/*** 
   Add your global variables that store the DOM elements you will 
   need to reference and/or manipulate. 
   
   But be mindful of which variables should be global and which 
   should be locally scoped to one of the two main functions you're 
   going to create. A good general rule of thumb is if the variable 
   will only be used inside of a function, then it can be locally 
   scoped to that function.
***/

/*** 
   Create the `showPage` function to hide all of the items in the 
   list except for the ten you want to show.

   Pro Tips: 
     - Keep in mind that with a list of 54 students, the last page 
       will only display four.
     - Remember that the first student has an index of 0.
     - Remember that a function `parameter` goes in the parens when 
       you initially define the function, and it acts as a variable 
       or a placeholder to represent the actual function `argument` 
       that will be passed into the parens later when you call or 
       "invoke" the function 
***/

/*** 
   Create the `appendPageLinks function` to generate, append, and add 
   functionality to the pagination buttons.
***/

// Remember to delete the comments that came with this file, and replace them with your own code comments.

// Create global variables representing the list of students and the max number of results per page
const studentList = document.querySelectorAll("li");
const resultsPerPage = 10;

// Create function that determines and displays the selected page of results
function showPage(list, page) {
	// Calculate the start and end of the results to be displayed based on arguments
	let startIndex = page * resultsPerPage - resultsPerPage;
	let endIndex = page * resultsPerPage;

	// Check to ensure only the selected list items are displayed
	for (let i = 0; i < list.length; i++) {
		if (i >= startIndex && i < endIndex) {
			list[i].style.display = "";
		} else {
			list[i].style.display = "none";
		}
	}
}
// Create function that calculates the number of page links needed, creates the links and appends them to the page
function appendPageLinks(list) {
	const pageDiv = document.querySelector(".page");
	const linkDiv = document.createElement("div");
	linkDiv.className = "pagination";
	pageDiv.appendChild(linkDiv);
	const linkUl = document.createElement("ul");
	linkDiv.appendChild(linkUl);
	// Create variable that calculates the number of page links needed and rounds up
	const numberOfLinks = Math.ceil(list.length / resultsPerPage);
	// Create page links, set properties and append to page
	for (let i = 1; i <= numberOfLinks; i++) {
		const li = document.createElement("li");
		const a = document.createElement("a");
		a.href = "#";
		a.textContent = i;
		li.appendChild(a);
		linkUl.appendChild(li);
	}
	// Select all page links and initialize first link class to 'active'
	const pageLinks = document.querySelectorAll('a[href="#"]');
	pageLinks[0].className = "active";

	// Add event listeners to each page link
	for (let j = 0; j < pageLinks.length; j++) {
		pageLinks[j].addEventListener("click", (e) => {
			const pageNumber = parseInt(e.target.textContent);
			for (let k = 0; k < pageLinks.length; k++) {
				pageLinks[k].className = "";
			}
			e.target.className = "active";
			showPage(studentList, pageNumber);
		});
	}
}
// Call showPage for initial page on screen then call appendPageLinks to add the page links
showPage(studentList, 1);
appendPageLinks(studentList);
