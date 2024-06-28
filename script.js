
function getStoredProducts() {
  const products = localStorage.getItem('products');
  return products ? JSON.parse(products) : [];
}

function renderProductList() {
  const products = getStoredProducts();
  products.sort((a, b) => a.price - b.price); 

  const tbody = document.querySelector('#product-table tbody');
  tbody.innerHTML = ''; 

  products.forEach(product => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${product.name}</td><td>${product.price.toFixed(2)}</td>`;
    tbody.appendChild(row);
  });
}

function addProduct(event) {
  event.preventDefault();

  const name = document.getElementById('product-name').value;
  const description = document.getElementById('product-description').value;
  const price = parseFloat(document.getElementById('product-price').value);
  const available = document.querySelector('input[name="product-available"]:checked').value;

  const newProduct = { name, description, price, available };

  const products = getStoredProducts();
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));

  renderProductList();

  document.getElementById('product-form-section').style.display = 'none';
  document.getElementById('product-list-section').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('product-form').addEventListener('submit', addProduct);
  document.getElementById('new-product-button').addEventListener('click', () => {
    document.getElementById('product-form-section').style.display = 'block';
    document.getElementById('product-list-section').style.display = 'none';
  });

  renderProductList();
});
