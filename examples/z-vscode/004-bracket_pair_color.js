/* eslint-disable */
let myPromise = new Promise(resolve => {
	for (const button of uiButtons) {
		const listItem = document.createElement('li');
		listItem.innerHTML = `<a href="#"> ${button} </a>`;
		myList.appendChild(listItem);
	}
	document.body.appendChild(myList);
	resolve();
});

myPromise.then(() => {
	const anchors = document.querySelectorAll('a');
	const myFunction = function(event) {
		console.log(this.innerHTML);
		event.preventDefault();
	};
	for (const anchor of anchors) {
		anchor.addEventListener('click', myFunction, false);
	}
});
/* eslint-enable */
// https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer