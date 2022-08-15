//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// event listeners for when buttons are clicked
document.querySelector('.enter-button').addEventListener('click', enter)
document.querySelector('#search-cocktail-button').addEventListener('click', searchCocktail)
document.querySelector('.next-cocktail').addEventListener('click', searchCocktail)


document.addEventListener('keyup', (e) => {
  if (!document.getElementById('search-cocktail').value == '') {
    let pressedKey = String(e.key)
    if(pressedKey === 'Enter'){
      searchCocktail()
      return;
    }
  }
});

function searchCocktail() {
  const cocktail = document.querySelector('#search-cocktail').value;
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktail}`;

  fetch(URL)
  .then(res => res.json())
  .then(data => {
    drinkCarousel(data)
  })

  .catch(err => {
  console.log(`error ${err}`)
  })
}

let index = 0
function drinkCarousel(data) {
  console.log(data)
  if (index <= data.drinks.length - 1) {
    document.querySelector('.next-cocktail').style.display = 'block'
    document.querySelector('.prev-cocktail').style.display = 'block'
    document.querySelector('h2').innerText = data.drinks[index].strDrink
    document.querySelector('img').src = data.drinks[index].strDrinkThumb
    document.querySelector('.ingredients').innerText = data.drinks[index].strInstructions
    ingredientsToArray(data, index)
    index++
 } else {
    index = 0
    drinkCarousel()
}
}

function ingredientsToArray(data, index) {
  const ingredients = []
  for (const [key, value] of Object.entries(data.drinks[index])){
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
    if (password === ' ') {
      document.querySelector('.password-container').style.display = 'none'
      document.querySelector('.bg-img').style.display = 'none'
      document.querySelector('.speakeasy').style.display = 'flex'
      document.querySelector('.bar-background').style.display = 'block'
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