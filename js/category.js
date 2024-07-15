async function fetchCategories() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    const data = await response.json();

    const categoriesContainer = document.getElementById("categories");
    data.categories.forEach(category => {
        const col = document.createElement("div");
        col.className = "col-md-3 mb-3";
        col.innerHTML = `
            <div class="category-item" onclick="fetchMeals('${category.strCategory}')">
                <img src="${category.strCategoryThumb}" alt="${category.strCategory}" class="img-fluid">
                <div class="category-info">
                    <h5>${category.strCategory}</h5>
                    <p>${category.strCategoryDescription}</p>
                </div>
            </div>
        `;
        categoriesContainer.appendChild(col);
    });
}

async function fetchMeals(category) {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();

    const categoriesContainer = document.getElementById("categories");
    const mealsContainer = document.getElementById("meals");
    
    // Hide categories and show meals
    categoriesContainer.style.display = "none";
    mealsContainer.style.display = "flex"; // or "block"

    mealsContainer.innerHTML = ""; // Clear previous meals

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
        mealsContainer.innerHTML = "<p>No meals found for this category.</p>";
    }
}

// Fetch categories on page load
fetchCategories();
