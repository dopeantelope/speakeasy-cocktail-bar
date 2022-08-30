//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// event listeners for when buttons are clicked
document.querySelector('.enter-button').addEventListener('click', enter)
document.querySelector('#search-cocktail-button').addEventListener('click', searchCocktail)
document.querySelector('.next-cocktail').addEventListener('click', nextCocktail)
document.querySelector('.prev-cocktail').addEventListener('click', prevCocktail)

// enter button event listener
document.addEventListener('keyup', (e) => {
  if (!document.getElementById('search-cocktail').value == '') {
    let pressedKey = String(e.key)
    if(pressedKey === 'Enter'){
      searchCocktail()
      return;
    }
  }
});

// api call
let drinksArray;
async function searchCocktail() {
  const cocktail = document.querySelector('#search-cocktail').value;
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`

  await fetch(URL)
  .then(res => res.json())
  .then(data => {
    drinksArray = data.drinks
    console.log(drinksArray)
    displayCocktail(drinksArray, 0)
  })
  .catch(err => {
    console.log("unable to find drink")
  })
}

// cocktail display information
let index = 0
function displayCocktail(drinks, index) {
  if (drinks === null) {
    document.querySelector('.cocktail-display').style.display = "none"
    document.querySelector('.error').style.display = "block"
  } else {
    document.querySelector('.cocktail-display').scrollIntoView({
      behavior: "smooth",
    });
    document.querySelector('.cocktail-display').style.display = "flex"
    document.querySelector('.error').style.display = "none"
    document.querySelector('.next-cocktail').style.display = 'block'
    document.querySelector('h2').innerText = drinks[index].strDrink
    document.querySelector('img').src = drinks[index].strDrinkThumb
    document.querySelector('.ingredients').innerText = drinks[index].strInstructions
    ingredientsToArray(drinks, index)
  }
}

function nextCocktail() {
  if (drinksArray.length > 1) {
    document.querySelector('.prev-cocktail').style.display = 'block'
  }
  if (index < drinksArray.length - 1) {
    index++
    displayCocktail(drinksArray, index)
  } else {
    index = 0
    displayCocktail(drinksArray, index)
}
}

function prevCocktail() {
  if (index == 0) {
    index = drinksArray.length - 1
    displayCocktail(drinksArray, index)
  } else {
    index--
    displayCocktail(drinksArray, index)
  }
}

function ingredientsToArray(drinks, index) {
  const ingredients = []
  for (const [key, value] of Object.entries(drinks[index])){
    if (key.includes("strIngredient") && value){
      ingredients.push(value)
  }
}
  ingredientsToDom(ingredients)
}


function ingredientsToDom(ingredients) {
  document.querySelector('ul').innerText = ''
  for (let i = 0; i < ingredients.length; i++) {
    const ingItem = document.createElement('li')
    ingItem.innerText = ingredients[i]
    document.querySelector('ul').appendChild(ingItem)
  }
}

function enter() {
  document.querySelector('.enter-button').style.display = 'none'
  document.querySelector('.password-container').style.display = 'inline'
  setFocus()
  console.log("password: leon sent me")
}

document.addEventListener('keyup', (e) => {
  let password = document.getElementById('password-input').value.toLowerCase();
  let count = 0;
  let pressedKey = String(e.key);
  if (pressedKey === "Enter") {
    if (password === 'leon sent me') {
      document.querySelector('.password-container').style.display = 'none'
      document.querySelector('.display-enter').style.display = 'none'
      document.querySelector('.display').style.display = 'flex'
      document.querySelector('body').style.backgroundImage = 'radial-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("https://images.unsplash.com/photo-1597290282695-edc43d0e7129?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1775&q=80")'
      document.querySelector('#search-cocktail').focus()
      return;
    } else {
      document.getElementById('password-input').classList.add("incorrect-password-animation")
      document.getElementById('password-input').value = "";
      console.log(count)
      return;
    }
  }
  let delay = 1;
      setTimeout(() => {
        document.querySelector("#password-input").classList.remove("incorrect-password-animation")
      }, delay)
  if (count === 5) {
    console.log('bruh...')
  }
})


function setFocus() {
  let input = document.querySelector("input");
  input.focus();
}