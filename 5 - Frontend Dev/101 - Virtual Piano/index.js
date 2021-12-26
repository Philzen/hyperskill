document.addEventListener("keydown", (e) => {
   const pressedKey = e.key.toUpperCase();
   if ("ASDFGHJ".includes(pressedKey)) {
      console.log(`The '${pressedKey}' key was pressed.`);
   } else {
      console.warn(`There's no music behind the ${pressedKey} key.`)
   }
});
