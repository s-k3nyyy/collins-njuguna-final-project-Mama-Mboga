document.addEventListener("DOMContentLoaded", function() {
  // Function to create a product card
  function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'cardd';
    const cardImage = document.createElement('img');
    cardImage.src = product.image;
    cardImage.alt = 'Image';
    cardImage.className = 'product-image';
    const cardContent = document.createElement('div');
    cardContent.className = 'card-content';
    const title = document.createElement('h3');
    title.textContent = product.title;
    const description = document.createElement('p');
    description.textContent = product.description;
    const amount = document.createElement('p');
    amount.textContent = 'Amount: ' + product.amount;
    const addToCartButton = document.createElement('button');
    addToCartButton.textContent = 'Add To Cart';
    addToCartButton.className = 'add-to-cart';
    cardContent.appendChild(title);
    cardContent.appendChild(description);
    cardContent.appendChild(amount);
    cardContent.appendChild(addToCartButton);
    card.appendChild(cardImage);
    card.appendChild(cardContent);
    return card;
  }

  // Fetches data from 'db.json' for prodcts
  fetch('db.json')
    .then(response => response.json())
    .then(data => {
      const productContainer = document.getElementById('product-container');
      data.foodList.forEach(product => {
        const card = createProductCard(product);
        productContainer.appendChild(card);
      });
    })
    .catch(error => console.error('Error fetching product data:', error));

  // Fetches data from 'reviews.json' for reviews
   const reviewsContainer = document.getElementById('reviews-container');
  fetch('reviews.json')
    .then(response => response.json())
    .then(data => {
      data.reviews.forEach(review => {
        const card = document.createElement('div');
        card.className = 'review-card';
        const username = document.createElement('h3');
        username.textContent = review.username;
        const rating = document.createElement('p');
        rating.textContent = `Rating: ${review.rating}`;

        // Creates stars based on rating
        const stars = document.createElement('div');
        stars.className = 'stars';
        for (let i = 0; i < review.rating; i++) {
          const star = document.createElement('span');
          star.innerHTML = '&#9733;'; // emoji star symbol
          stars.appendChild(star);
        }

        const comment = document.createElement('p');
        comment.textContent = review.comment;

        card.appendChild(username);
        card.appendChild(rating);
        card.appendChild(stars);
        card.appendChild(comment);
        reviewsContainer.appendChild(card);
      });
    })
    .catch(error => console.error('Error fetching reviews data:', error));
  // when add-to cart button has been clicked it alerts the user the certain item clicked has been added to cart
  document.addEventListener('click', (event) => {
    if (event.target?.classList.contains('add-to-cart')) {
      const title = event.target.parentElement.querySelector('h3').textContent;
      alert(`${title} added to cart successfully!`);
    }
  });
});


// Function to handle search functionality 
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault(); 
  const searchTerm = document.getElementById('search-box').value.toLowerCase(); 
  const productCards = document.querySelectorAll('.cardd'); 
  let found = false; 
  
  productCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase(); 
    if (title.includes(searchTerm)) {
      card.scrollIntoView({ behavior: 'smooth' });
      card.classList.add('search-match');
      found = true; 
      setTimeout(() => card.classList.remove('search-match'), 1000);
    }
  });

  if (!found) {
    alert('Sorry, we don\'t have that item right now :( ');
  }
});
