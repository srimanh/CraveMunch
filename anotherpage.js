// instruction page for search image 
document.addEventListener('DOMContentLoaded', function () {
    const leftContainer = document.getElementById('leftContainer');
    const rightContainer = document.getElementById('rightContainer');

    // Function to get the meal details by ID
    async function getMealDetailsById(mealId) {
        const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.meals && data.meals.length > 0) {
                const meal = data.meals[0];
                displayMealDetails(meal);
            } else {
                leftContainer.innerHTML = '<p>No details found for this meal.</p>';
                rightContainer.innerHTML = '';
            }
        } catch (error) {
            console.error('Error fetching meal details:', error);
        }
    }

    // Function to display meal details on the page
    function displayMealDetails(meal) {
        // Display the clicked image on the left side
        leftContainer.innerHTML = `<img src="${meal.strMealThumb}" alt="${meal.strMeal}">`;

        // Display ingredients on the right side
        const ingredients = getIngredientsArray(meal);
        const html = `
            <h2>${meal.strMeal}</h2>
            <h3>Ingredients:</h3>
            <ol>${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}</ol>
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        `;

        rightContainer.innerHTML = html;
    }

    // Function to get an array of ingredients from the meal object
    function getIngredientsArray(meal) {
        const ingredients = [];

        // Loop through ingredients (up to 20, assuming maximum number of ingredients)
        for (let i = 1; i <= 20; i++) {
            const ingredient = meal[`strIngredient${i}`];
            const measure = meal[`strMeasure${i}`];

            // Break the loop if no more ingredients
            if (!ingredient) break;

            ingredients.push(`${measure} ${ingredient}`);
        }

        return ingredients;
    }

    // Get the mealId from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('mealId');

    // Fetch and display meal details
    if (mealId) {
        getMealDetailsById(mealId);
    } else {
        leftContainer.innerHTML = '<p>No meal ID provided.</p>';
        rightContainer.innerHTML = '';
    }
});
