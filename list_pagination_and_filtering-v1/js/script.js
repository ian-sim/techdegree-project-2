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
// create function to create, append and assign property values to an element
function createAssignAppend(
	elementName,
	appendTo,
	property1 = "",
	value1 = "",
	property2 = "",
	value2 = ""
) {
	const element = document.createElement(elementName);
	element[property1] = value1;
	element[property2] = value2;
	appendTo.appendChild(element);
	return element;
}
// Create function that calculates the number of page links needed, creates the links and appends them to the page
function appendPageLinks(list) {
	const pageDiv = document.querySelector(".page");
	const linkDiv = createAssignAppend("div", pageDiv, "className", "pagination");
	const linkUl = createAssignAppend("ul", linkDiv);
	// Create variable that calculates the number of page links needed and rounds up
	const numberOfLinks = Math.ceil(list.length / resultsPerPage);
	// Create page links, set properties and append to page
	for (let i = 1; i <= numberOfLinks; i++) {
		const li = createAssignAppend("li", linkUl);
		const a = createAssignAppend("a", li, "href", "#", "textContent", i);
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
