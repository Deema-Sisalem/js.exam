async function performSearch() {
    const nameInput = document.getElementById("searchName").value.toLowerCase();
    const letterInput = document.getElementById("searchLetter").value.toLowerCase();
    const resultsContainer = document.getElementById("results");

    // Clear previous results
    resultsContainer.innerHTML = "";

    // Fetch meals if name or letter input is provided
    if (nameInput || letterInput) {
        let apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=" + nameInput;

        if (letterInput.length === 1) {
            apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?f=" + letterInput;
        }

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Display results
        if (data.meals) {
            data.meals.forEach(meal => {
                const div = document.createElement("div");
                div.className = "result-item";
                div.innerHTML = `
                    <a href="meal.html?id=${meal.idMeal}">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="img-fluid">
                        <div class="meal-name">${meal.strMeal}</div>
                    </a>
                `;
                resultsContainer.appendChild(div);
            });
        } else {
            resultsContainer.textContent = "No results found.";
        }
    }
}
