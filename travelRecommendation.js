const clearButton = document.getElementById('clearButton');
    clearButton.addEventListener('click', function () {
        const formInputs = document.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.value = '';
        });
        console.log('Form has been cleared!');
    });

    etch('travel_recommendation_api.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json(); // Parse JSON
    })
    .then(data => {
        console.log(data); // Debug: Check if data is fetched correctly

        const recommendationsContainer = document.getElementById('recommendation-list');
        
        // Loop through cities and display them
        data.cities.forEach(city => {
            // Create a card for each city
            const cityCard = document.createElement('div');
            cityCard.style.cssText = `
                border: 1px solid #ccc;
                border-radius: 10px;
                padding: 20px;
                max-width: 300px;
                text-align: center;
                background: white;
            `;

            // Add image
            const cityImage = document.createElement('img');
            cityImage.src = city.imageUrl;
            cityImage.alt = city.name;
            cityImage.style.cssText = `
                max-width: 100%;
                border-radius: 10px;
            `;

            // Add city name
            const cityName = document.createElement('h3');
            cityName.textContent = city.name;

            // Add description
            const cityDescription = document.createElement('p');
            cityDescription.textContent = city.description;

            // Append elements to city card
            cityCard.appendChild(cityImage);
            cityCard.appendChild(cityName);
            cityCard.appendChild(cityDescription);

            // Append city card to recommendations container
            recommendationsContainer.appendChild(cityCard);
        });
    })
    .catch(error => {
        console.error('There was a problem fetching the recommendations:', error);
    });

    // Task 7: Handle Keyword Searches
document.getElementById('searchButton').addEventListener('click', function () {
    const searchInput = document.getElementById('searchInput').value.toLowerCase().trim();
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = ''; // Clear previous results
  
    // Task 8: Fetch Recommendations
    const data = {
      beach: [
        {
          title: "Sydney, Australia",
          description:
            "A beautiful coastal city with a relaxed atmosphere, featuring the Sydney Opera House, Harbour Bridge, and stunning beaches.",
          image: "https://via.placeholder.com/300x200?text=Sydney+Beach",
        },
        {
          title: "Maldives",
          description: "Crystal-clear waters, pristine beaches, and a tropical paradise perfect for relaxation.",
          image: "https://via.placeholder.com/300x200?text=Maldives",
        },
      ],
      temple: [
        {
          title: "Angkor Wat, Cambodia",
          description: "A magnificent temple complex, one of the largest religious monuments in the world.",
          image: "https://via.placeholder.com/300x200?text=Angkor+Wat",
        },
        {
          title: "Golden Temple, India",
          description: "A stunning Sikh temple made of gold, known for its spiritual tranquility.",
          image: "https://via.placeholder.com/300x200?text=Golden+Temple",
        },
      ],
      country: [
        {
          title: "Japan",
          description: "A blend of ancient traditions and cutting-edge technology, featuring beautiful landscapes and rich culture.",
          image: "https://via.placeholder.com/300x200?text=Japan",
        },
        {
          title: "Italy",
          description: "Known for its rich history, art, architecture, and of course, delicious food.",
          image: "https://via.placeholder.com/300x200?text=Italy",
        },
      ],
    };
  
    if (data[searchInput]) {
      data[searchInput].forEach((place) => {
        const recommendation = document.createElement('div');
        recommendation.className = 'recommendation';
        recommendation.innerHTML = `
          <img src="${place.image}" alt="${place.title}">
          <div>
            <h3>${place.title}</h3>
            <p>${place.description}</p>
            <button onclick="alert('Redirecting to details for ${place.title}')">Visit</button>
          </div>
        `;
        recommendations.appendChild(recommendation);
      });
      recommendations.classList.remove('hidden');
    } else {
      recommendations.innerHTML = `<p>No recommendations found for "${searchInput}". Try searching for "beach", "temple", or "country".</p>`;
      recommendations.classList.remove('hidden');
    }
  });
  
  // Clear search input and results
  document.getElementById('clearButton').addEventListener('click', function () {
    document.getElementById('searchInput').value = '';
    const recommendations = document.getElementById('recommendations');
    recommendations.innerHTML = '';
    recommendations.classList.add('hidden');
  });
  