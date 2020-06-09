{
  // const form = document.getElementById('myForm');
  const form = document.forms['myForm']

  function handleFormSubmit(event) {
    // Prevent the form submission from refreshing the page.
    event.preventDefault()

    const inputDate = document.getElementById('date')
    const myDate = new Date(inputDate.value)

    console.log('Form submitted', event)
    console.group('Selected Date Information')
    console.log(`myDate: ${myDate}`)
    console.log(`getDate: ${myDate.getDate()}`)
    /**
     * Notice the day value is off by one.
     * This occurs because we're taking a UTC date
     * and converting it to our timezone which is 5
     * hours behind. We need the date when not adjusting
     * for timezone.
     */
    console.log(`Month: ${myDate.getUTCMonth()}`)
    console.log(`Date: ${myDate.getUTCDate()}`)
    console.log(`Year: ${myDate.getUTCFullYear()}`)
    console.groupEnd()

    // What happens when the input date is invalid?
    const feedbackDate = inputDate.nextElementSibling
    if (isNaN(myDate)) {
      inputDate.focus()
      inputDate.value = ''
      feedbackDate.hidden = false
    } else {
      feedbackDate.hidden = true
    }

    // Once we have a valid date, what can we do?
  }

  if (form) {
    form.addEventListener('submit', handleFormSubmit, false)
    form.addEventListener('change', handleFormSubmit, false)
  }
}
