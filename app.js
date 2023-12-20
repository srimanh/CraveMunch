// random meal
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
// link the api for search
document.addEventListener('DOMContentLoaded', function () {
    const foodGrid = document.getElementById('foodGrid');
    const searchInput = document.getElementById('searchInput');

    async function searchMeals() {
        const searchTerm = searchInput.value.trim();

        if (searchTerm !== '') {
            const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Clear existing content in foodGrid
                foodGrid.innerHTML = '';

                if (data.meals) {
                    data.meals.forEach(meal => {
                        // Create a container for each meal
                        const container = document.createElement('div');
                        container.classList.add('container1'); // Add the 'container' class

                        // Create an image element with the 'container' class
                        const image = document.createElement('img');
                        image.src = meal.strMealThumb;
                        image.alt = meal.strMeal;
                        image.classList.add('container1'); // Add the 'container' class to the image

                        // Create a paragraph for the name
                        const nameParagraph = document.createElement('p');
                        nameParagraph.textContent = meal.strMeal;

                        // Add a click event listener to navigate to the instruction page
                        container.addEventListener('click', function () {
                            navigateToAnotherPage(meal.idMeal);
                        });

                        // Append the image and name to the container
                        container.appendChild(image);
                        container.appendChild(nameParagraph);

                        // Append the container to the foodGrid
                        foodGrid.appendChild(container);
                    });
                } else {
                    const noResultsMessage = document.createElement('p');
                    noResultsMessage.textContent = 'No results found.';
                    foodGrid.appendChild(noResultsMessage);
                }
            } catch (error) {
                console.error('Error fetching meals:', error);
            }
        }
    }

    function navigateToAnotherPage(mealId) {
        // Construct the URL for the instruction page using the mealId
        const anotherPageUrl = `anotherpage.html?mealId=${mealId}`;

        // Navigate to the instruction page
        window.location.href = anotherPageUrl;
    }
    
    searchButton.addEventListener('click', function () {
        searchMeals();
    });


    // Add an event listener for the Enter key in the search input
    searchInput.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            searchMeals();
        }
    });
});
