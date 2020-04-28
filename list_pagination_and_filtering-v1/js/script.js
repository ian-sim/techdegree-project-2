// Create global variables representing the list of students and the max number of results per page
const studentList = document.querySelectorAll("li");
const resultsPerPage = 10;

// Create function that determines and displays the selected page of results
function showPage(list, page) {
	// Calculate the start and end indices of the results to be displayed based on arguments
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

// Create apology for zero results message (FOR 'EXCEEDS' GRADE REQUIREMENTS)
const pageDiv = document.querySelector("div.page");
const listUl = document.querySelector("ul.student-list");
const apologyDiv = document.createElement("div");
apologyDiv.className = "js-apology";
pageDiv.insertBefore(apologyDiv, listUl);
const noResultsMessage = createAssignAppend(
	"h2",
	apologyDiv,
	"textContent",
	"Sorry, there were no results from your search.",
	"textAlign",
	"center"
);
noResultsMessage.style.fontSize = "1.4rem";
//Initialize no results message to hidden
noResultsMessage.style.display = "none";

// Create function to create, append and assign property values to an element
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
	if (!list.length) {
		return (noResultsMessage.style.display = "");
	} else {
		noResultsMessage.style.display = "none";
	}
	const pageDiv = document.querySelector(".page");
	const linkDiv = createAssignAppend("div", pageDiv, "className", "pagination");
	const linkUl = createAssignAppend("ul", linkDiv);
	// Create variable that calculates the number of page links needed and rounds up to next integer
	const numberOfLinks = Math.ceil(list.length / resultsPerPage);
	// Create page links, set properties and append to page
	for (let i = 1; i <= numberOfLinks; i++) {
		const li = createAssignAppend("li", linkUl);
		const a = createAssignAppend("a", li, "href", "#", "textContent", i);
	}
	// Select all page links and initialize class names to ''. Set page 1 link class to 'active'
	const pageLinks = document.querySelectorAll('a[href="#"]');
	pageLinks[0].className = "active";
	// Add event listeners to each page link to change class names based on event.target
	for (let j = 0; j < pageLinks.length; j++) {
		pageLinks[j].addEventListener("click", (e) => {
			const pageNumber = parseInt(e.target.textContent);
			for (let k = 0; k < pageLinks.length; k++) {
				pageLinks[k].className = "";
			}
			e.target.className = "active";
			showPage(list, pageNumber);
		});
	}
	showPage(list, 1);
}
// Call showPage for initial page on screen then call appendPageLinks to add the page links
showPage(studentList, 1);
appendPageLinks(studentList);

// THE CODE BEYOND THIS POINT IS FOR THE 'EXCEEDS' GRADE REQUIREMENTS!

// Create input field and search button for search functionality
const headerDiv = document.querySelector(".page-header");
const searchDiv = createAssignAppend(
	"div",
	headerDiv,
	"className",
	"student-search"
);
const searchInput = createAssignAppend(
	"input",
	searchDiv,
	"placeholder",
	"Search for students..."
);
const searchButton = createAssignAppend(
	"button",
	searchDiv,
	"textContent",
	"Search"
);

// Create function to remove previous page links
function removeLinks() {
	const prevLinks = document.querySelector(".pagination");
	if (prevLinks) {
		const parent = prevLinks.parentNode;
		parent.removeChild(prevLinks);
	}
}

// Create function to compare user input to student names and display any results found with a match
function searchName(searchInput, namesList) {
	removeLinks();
	const foundList = [];
	for (let i = 0; i < namesList.length; i++) {
		namesList[i].style.display = "none";
		const name = namesList[
			i
		].firstElementChild.children[1].textContent.toLowerCase();
		const input = searchInput.value.toLowerCase();
		if (input.length !== 0 && name.includes(input)) {
			namesList[i].style.display = "";
			foundList.push(namesList[i]);
		}
	}
	return foundList;
}

// Event listener for search Button to search and display results, if any
searchButton.addEventListener("click", () => {
	if (searchInput.value) {
		appendPageLinks(searchName(searchInput, studentList));
	} else {
		removeLinks();
		appendPageLinks(studentList);
	}
});

// Event listener for keyup in input field to search and display results, if any
searchInput.addEventListener("keyup", () => {
	if (searchInput.value) {
		appendPageLinks(searchName(searchInput, studentList));
	} else {
		removeLinks();
		appendPageLinks(studentList);
	}
});
