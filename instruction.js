function fetchAndDisplayInstructions() {
    // Get meal data from the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const mealId = urlParams.get('mealId');
    const mealImage = decodeURIComponent(urlParams.get('mealImage'));
    const mealName = decodeURIComponent(urlParams.get('mealName'));

    // Display the meal image and name
    document.getElementById('mealImage').src = mealImage;
    document.getElementById('mealName').textContent = mealName;

    if (mealId) {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
            .then(response => response.json())
            .then(data => {
                const instructions = data.meals[0].strInstructions;
                document.getElementById('instructions').textContent = instructions;
            })
            .catch(error => console.error('Error fetching instructions:', error));
    }
}

// Fetch and display instructions when the page loads
fetchAndDisplayInstructions();