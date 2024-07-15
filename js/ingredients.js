async function fetchIngredients() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    const data = await response.json();

    const ingredientsContainer = document.getElementById("ingredients");
    data.meals.forEach(ingredient => {
        const brief = ingredient.strDescription ? ingredient.strDescription.split(' ').slice(0, 15).join(' ') : 'No description available.';
        const col = document.createElement("div");
        col.className = "col-md-3 mb-3";
        col.innerHTML = `
            <div class="ingredient-item" onclick="fetchMeals('${ingredient.strIngredient}')">
                <h5>${ingredient.strIngredient}</h5>
                <p>${brief}</p>
            </div>
        `;
        ingredientsContainer.appendChild(col);
    });
}

async function fetchMeals(ingredient) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
    const data = await response.json();

    const ingredientsContainer = document.getElementById("ingredients");
    const mealsContainer = document.getElementById("meals");
    
    ingredientsContainer.style.display = "none";
    mealsContainer.style.display = "flex";

    mealsContainer.innerHTML = "";

    if (data.meals) {
        data.meals.forEach(meal => {
            const col = document.createElement("div");
            col.className = "col-md-3 mb-3";
            col.innerHTML = `
                <div class="result-item">
                    <a href="meal.html?id=${meal.idMeal}">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid">
                        <div class="meal-name">${meal.strMeal}</div>
                    </a>
                </div>
            `;
            mealsContainer.appendChild(col);
        });
    } else {
        mealsContainer.innerHTML = "<p>No meals found for this ingredient.</p>";
    }
}

// Fetch ingredients on page load
fetchIngredients();
