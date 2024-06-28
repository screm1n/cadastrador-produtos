document.addEventListener('DOMContentLoaded', () => {
    const formContainer = document.getElementById('form-container');
    const listContainer = document.getElementById('list-container');
    const productForm = document.getElementById('product-form');
    const productList = document.getElementById('product-list');
    const newProductButton = document.getElementById('new-product');
  
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('product-name').value;
      const description = document.getElementById('product-description').value;
      const price = parseFloat(document.getElementById('product-price').value);
      const available = document.getElementById('product-available').value;
  
      const product = { name, description, price, available };
      saveProduct(product);
      displayProducts();
      switchView();
    });
  
    newProductButton.addEventListener('click', () => {
      switchView();
    });
  
    function saveProduct(product) {
      let products = JSON.parse(localStorage.getItem('products')) || [];
      products.push(product);
      localStorage.setItem('products', JSON.stringify(products));
    }
  
    function displayProducts() {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      products.sort((a, b) => a.price - b.price);
  
      productList.innerHTML = '';
      products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${product.name}</td><td>${product.price.toFixed(2)}</td>`;
        productList.appendChild(row);
      });
    }
  
    function switchView() {
      if (formContainer.style.display === 'none') {
        formContainer.style.display = 'block';
        listContainer.style.display = 'none';
      } else {
        formContainer.style.display = 'none';
        listContainer.style.display = 'block';
      }
    }
  
    if (localStorage.getItem('products')) {
      displayProducts();
      switchView();
    }
  });