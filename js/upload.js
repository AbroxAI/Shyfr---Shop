import { products, renderProducts } from './products.js';

export function setupUpload() {
  const btn = document.getElementById("add-product-btn");

  btn.addEventListener("click", () => {
    const name = document.getElementById("product-name").value.trim();
    const price = parseFloat(document.getElementById("product-price").value.trim());
    const desc = document.getElementById("product-desc").value.trim();
    const file = document.getElementById("product-image").files[0];

    if(!name || isNaN(price) || !desc || !file) return alert("All fields required");

    const reader = new FileReader();
    reader.onload = e => {
      const newProduct = {
        id: products.length + 1,
        name,
        price,
        description: desc,
        image: e.target.result,
        tags: ["New"]
      };
      products.push(newProduct);
      renderProducts();
    }
    reader.readAsDataURL(file);
  });
}
