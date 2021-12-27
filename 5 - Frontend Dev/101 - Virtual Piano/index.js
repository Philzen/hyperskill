document.addEventListener("keydown", (e) => {
   const pressedKey = e.key.toUpperCase();
   if ("ASDFGHJWETYU".includes(pressedKey)) {
      new Audio(`sound/${pressedKey}.mp3`).play();
   } else {
      console.warn(`There's no music behind the ${pressedKey} key.`)
   }
});
