async function fetchCountries() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    const data = await response.json();

    const countriesContainer = document.getElementById("countries");
    data.meals.forEach(country => {
        const col = document.createElement("div");
        col.className = "col-md-3 mb-3";
        col.innerHTML = `
            <div class="card text-center" onclick="fetchMeals('${country.strArea}')">
                <div class="card-body">
                    <h5 class="card-title">${country.strArea}</h5>
                </div>
            </div>
        `;
        countriesContainer.appendChild(col);
    });
}

async function fetchMeals(area) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const data = await response.json();

    const countriesContainer = document.getElementById("countries");
    const mealsContainer = document.getElementById("meals");
    
    countriesContainer.style.display = "none";
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
        mealsContainer.innerHTML = "<p>No meals found for this area.</p>";
    }
}

fetchCountries();
