{
  const uiButtons = ['Eagles', 'Flyers', 'Sixers', 'Phillies'];
  const myList = document.createElement('ul');

  /*
  for (const button of uiButtons) {
    // console.log(button);
    console.log(`Current button: ${button}`);
    const listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#"> ${button} </a>`;
    myList.appendChild(listItem);
  }

  document.body.appendChild(myList);
	*/

  let myPromise = new Promise(resolve => {
    for (const button of uiButtons) {
      // console.log(button);
      // console.log(`Current button: ${button}`);
      const listItem = document.createElement('li');
      listItem.innerHTML = `<a href="#"> ${button} </a>`;
      myList.appendChild(listItem);
    }
    document.body.appendChild(myList);
    resolve();

    // window.setTimeout(() => {
    //   resolve();
    // }, 3000);
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
}
