{
  const btnSetLocal = document.getElementById('btnSetLocal');
  const btnRemoveLocal = document.getElementById('btnRemoveLocal');
  const btnClearLocal = document.getElementById('btnClearLocal');

  function handleSetLocal() {
    const inputName = document.getElementById('name');
    console.log(inputName.value);

    // Set a local storage item
    localStorage.setItem('IDM222LocalName', inputName.value);
  }
  function handleRemoveLocal() {
    console.log('Remove localStorage: IDM222LocalName');

    // Remove a local storage item
    localStorage.removeItem('IDM222LocalName');
  }
  function handleClearLocal() {
    console.log('Clear all localStorage');

    // ⚠️ Remove all local storage items
    localStorage.clear();
  }

  if (btnSetLocal) {
    btnSetLocal.addEventListener('click', handleSetLocal, false);
    btnRemoveLocal.addEventListener('click', handleRemoveLocal, false);
    btnClearLocal.addEventListener('click', handleClearLocal, false);
  }
}
