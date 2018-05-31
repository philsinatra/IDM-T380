'use strict';

{
  var uiButtons = ['Eagles', 'Flyers', 'Sixers', 'Phillies'];
  var myList = document.createElement('ul');

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

  var myPromise = new Promise(function (resolve) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = uiButtons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var button = _step.value;

        // console.log(button);
        // console.log(`Current button: ${button}`);
        var listItem = document.createElement('li');
        listItem.innerHTML = '<a href="#"> ' + button + ' </a>';
        myList.appendChild(listItem);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    document.body.appendChild(myList);
    resolve();

    // window.setTimeout(() => {
    //   resolve();
    // }, 3000);
  });

  myPromise.then(function () {
    var anchors = document.querySelectorAll('a');
    var myFunction = function myFunction(event) {
      console.log(this.innerHTML);
      event.preventDefault();
    };
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = anchors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var anchor = _step2.value;

        anchor.addEventListener('click', myFunction, false);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  });
}

{
  var handleFormSubmit = function handleFormSubmit(event) {
    // Prevent the form submission from refreshing the page.
    event.preventDefault();

    var inputDate = document.getElementById('date');
    var myDate = new Date(inputDate.value);

    console.log('Form submitted', event);
    console.group('Selected Date Information');
    console.log('myDate: ' + myDate);
    console.log('getDate: ' + myDate.getDate());
    /**
     * Notice the day value is off by one.
     * This occurs because we're taking a UTC date
     * and converting it to our timezone which is 5
     * hours behind. We need the date when not adjusting
     * for timezone.
     */
    console.log('Month: ' + myDate.getUTCMonth());
    console.log('Date: ' + myDate.getUTCDate());
    console.log('Year: ' + myDate.getUTCFullYear());
    console.groupEnd();

    // What happens when the input date is invalid?
    var feedbackDate = inputDate.nextElementSibling;
    if (isNaN(myDate)) {
      inputDate.focus();
      inputDate.value = '';
      feedbackDate.hidden = false;
    } else {
      feedbackDate.hidden = true;
    }

    // Once we have a valid date, what can we do?
  };

  // const form = document.getElementById('myForm');
  var form = document.forms['myForm'];

  if (form) {
    form.addEventListener('submit', handleFormSubmit, false);
    form.addEventListener('change', handleFormSubmit, false);
  }
}
//# sourceMappingURL=main.js.map
