async function fetchMealDetails() {
    const params = new URLSearchParams(window.location.search);
    const mealId = params.get("id");

    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const data = await response.json();

    if (data.meals) {
        const meal = data.meals[0];
        document.getElementById("meal-image").src = meal.strMealThumb;
        document.getElementById("meal-name").textContent = meal.strMeal;
        document.getElementById("instructions").textContent = meal.strInstructions;
        document.getElementById("area").textContent = meal.strArea;
        document.getElementById("category").textContent = meal.strCategory;

        
        document.getElementById("tags").textContent = meal.strTags ? meal.strTags : "No tags available.";

        
        const recipesList = document.getElementById("recipes");
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];
            if (ingredient) {
                const li = document.createElement("li");
                li.textContent = `${measure} ${ingredient}`;
                recipesList.appendChild(li);
            }
        }

    
        document.getElementById("source-button").href = meal.strSource;
        document.getElementById("youtube-button").href = meal.strYoutube;
    }
}


fetchMealDetails();
