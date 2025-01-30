const searchbox = document.querySelector(".searchbox");
const searchbtn = document.querySelector(".searchbtn");
const recipecontainer = document.querySelector(".recipe-container");
const recipedetailscontent = document.querySelector(".recipe-details-content");
const recipeclosebtn = document.querySelector('.recipe-close-btn');


const fetchrecipes = async (query) => {
    recipecontainer.innerHTML = "<h2>fetching Recipes....</h2>";
    try {
        const data = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        recipecontainer.innerHTML = "";
        response.meals.forEach((meal) => {
            const recipediv = document.createElement("div");
            recipediv.classList.add("recipe");
            recipediv.innerHTML = `
        <img src = "${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>`;
            const button = document.createElement("button");
            button.textContent = "Veiw Recipe";
            recipediv.appendChild(button);

            // adding Event Listener to recipe button
            button.addEventListener("click", () => {
                openRecipePopup(meal);
            });
            recipecontainer.appendChild(recipediv);
        });
    }
    catch (error) {
        recipecontainer.innerHTML = "<h2>Not Found...</h2>";
    }
}

// function to fetch ingredient and measurment
const fetchIngredients = (meal) => {
    let Ingredientlist = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`]
            Ingredientlist += `<li>${measure} - ${ingredient}</li>`;
        }
        else {
            break;
        }
    }
    return Ingredientlist;
}
const openRecipePopup = (meal) => {
    recipedetailscontent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients: </h3>
    <ul class="ingredientlist">${fetchIngredients(meal)}</ul>
     <div class="recipeinstructions">
        <h3>Instruction:</h3>
        <p >${meal.strInstructions}</p>
    </div> `
    recipedetailscontent.parentElement.style.display = "block";
}
recipeclosebtn.addEventListener('click', () => {
    recipedetailscontent.parentElement.style.display = "none";
});
searchbtn.addEventListener("click", (e) => {
    e.preventDefault();
    // trim removes all the leading spaces
    const searchinput = searchbox.value.trim();
    if (!searchinput) {
        recipecontainer.innerHTML = `"<h2>Type the meal in search box</h2>"`;
        return;
    }
    // console.log("button clicked");
    fetchrecipes(searchinput);
});
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        recipedetailscontent.parentElement.style.display = "none";
    }
});
