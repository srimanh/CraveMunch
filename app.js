function fetchAndDisplayRandomMeal() {
    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then(response => response.json())
        .then(data => {
            const randomMealImage = data.meals[0].strMealThumb;
            const randomMealName = data.meals[0].strMeal;
            updateMealImage(randomMealImage, randomMealName);
        })
        .catch(error => console.error('Error fetching random meal:', error));
}

// Function to update the meal image and name
function updateMealImage(imageUrl, mealName) {
    const mealContainer = document.getElementById('mealContainer');
    const mealContainerImage = mealContainer.querySelector('img');
    const mealContainerName = mealContainer.querySelector('p');

    mealContainerImage.src = imageUrl;
    mealContainerImage.alt = mealName;
    mealContainerName.textContent = mealName;
}

// Fetch and display a random meal when the page loads
fetchAndDisplayRandomMeal();
