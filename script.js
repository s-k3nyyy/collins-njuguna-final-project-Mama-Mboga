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

  // Fetches data from 'db.json' for products
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

  // Fetch data from 'reviews.json' for reviews
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
        const comment = document.createElement('p');
        comment.textContent = review.comment;
        card.appendChild(username);
        card.appendChild(rating);
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
//i researched on this search functionality sikuwa najua mwalimu 
document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  const searchTerm = document.getElementById('search-box').value.toLowerCase(); // Get the search term
  const productCards = document.querySelectorAll('.cardd'); // Select all product cards
  let found = false; // Flag to track if the search term is found
  
  productCards.forEach(card => {
    const title = card.querySelector('h3').textContent.toLowerCase(); // Get the product title
    if (title.includes(searchTerm)) {
      // Scroll to the card
      card.scrollIntoView({ behavior: 'smooth' });
      // Highlight the card with red background and smooth transition
      card.classList.add('search-match');
      found = true; // Set flag to true if the search term is found
      // Remove the red background after 1 second
      setTimeout(() => {
        card.classList.remove('search-match');
      }, 1000);
    }
  });

  if (!found) {
    // If search term is not found, show an alert
    alert('sorry we dont have that item now  :( ');
  }
});
