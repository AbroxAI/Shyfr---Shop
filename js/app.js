// File: js/app.js
let products = JSON.parse(localStorage.getItem("products")) || [];
let pendingListings = JSON.parse(localStorage.getItem("pendingListings")) || [];
const cart = [];
const productList = document.querySelector('#products');
const cartCount = document.querySelector('#cart-count');

// Render products
function renderProducts(){
    productList.innerHTML = '';
    products.forEach(product=>{
        const card=document.createElement('div');
        card.className="bg-gray-800 p-4 rounded-2xl shadow-md hover:shadow-xl transition cursor-pointer";
        card.innerHTML=`
            <img src="${product.image}" alt="${product.name}" class="rounded-lg mb-3">
            <h3 class="text-lg font-bold mb-1">${product.name}</h3>
            <p class="text-purple-500 font-semibold mb-2">$${product.price}</p>
            <button class="bg-purple-500 px-3 py-1 rounded-lg hover:bg-purple-600 transition w-full" onclick="openProductModal(${product.id})">View</button>
        `;
        productList.appendChild(card);
    });
}

// Open product modal
function openProductModal(id){
    const product = products.find(p=>p.id===id);
    const modalContent = document.querySelector('#product-modal-content');
    modalContent.innerHTML=`
        <img src="${product.image}" class="w-full rounded-lg mb-3">
        <h3 class="text-xl font-bold mb-2">${product.name}</h3>
        <p class="mb-2">${product.desc}</p>
        <p class="text-purple-500 font-semibold mb-3">$${product.price}</p>
        <button class="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 w-full mb-3" onclick="openListingModal(${product.id})">Buy Now</button>
        <h4 class="font-bold mb-1">Feedback</h4>
        <div id="feedback-list" class="max-h-40 overflow-y-auto mb-2"></div>
        <input id="feedback-input" type="text" placeholder="Leave feedback" class="w-full p-2 rounded-lg text-black mb-2">
        <button class="bg-green-500 px-4 py-2 rounded-lg w-full hover:bg-green-600" onclick="addFeedback(${id})">Submit Feedback</button>
    `;
    document.querySelector('#product-modal').classList.remove('hidden');
    renderFeedback(id);
}

// Feedback functions
function addFeedback(id){
    const input = document.querySelector('#feedback-input');
    if(input.value.trim()==='') return;
    const product = products.find(p=>p.id===id);
    product.feedback.push({text: input.value, date:new Date().toLocaleString()});
    localStorage.setItem("products", JSON.stringify(products));
    input.value='';
    renderFeedback(id);
}

function renderFeedback(id){
    const list = document.querySelector('#feedback-list');
    const product = products.find(p=>p.id===id);
    list.innerHTML = '';
    product.feedback.forEach(f=>{
        const div = document.createElement('div');
        div.className='bg-gray-700 bg-opacity-70 p-2 rounded-lg mb-1 text-sm';
        div.textContent=`${f.text} - ${f.date}`;
        list.appendChild(div);
    });
}

// Cart
function addToCart(id){
    cart.push(id);
    cartCount.textContent = cart.length;
}

// Listing modal submission
const listingForm = document.querySelector('#listing-form');
listingForm.addEventListener('submit', function(e){
    e.preventDefault();
    const name = listingForm.name.value.trim();
    const price = parseFloat(listingForm.price.value);
    const desc = listingForm.desc.value.trim();
    const imageFile = listingForm.image.files[0];
    const screenshot = listingForm.screenshot.files[0];
    if(!name || !price || !desc || !imageFile){
        alert("Fill all fields & upload image");
        return;
    }
    const reader = new FileReader();
    reader.onload = function(){
        const screenshotReader = new FileReader();
        screenshotReader.onload = function(){
            const newListing = {
                id: Date.now(),
                name, price, desc,
                image: reader.result,
                screenshot: screenshot ? screenshotReader.result : null,
                submittedAt: new Date().toLocaleString()
            };
            pendingListings.push(newListing);
            localStorage.setItem("pendingListings", JSON.stringify(pendingListings));
            alert("Listing submitted! Admin will approve.");
            document.querySelector('#listing-modal').classList.add('hidden');
            listingForm.reset();
        };
        if(screenshot) screenshotReader.readAsDataURL(screenshot);
        else screenshotReader.onload();
    };
    reader.readAsDataURL(imageFile);
});

// Modals
document.querySelector('#product-modal-close').addEventListener('click',()=>document.querySelector('#product-modal').classList.add('hidden'));
document.querySelector('#listing-modal-close').addEventListener('click',()=>document.querySelector('#listing-modal').classList.add('hidden'));

// Notifications
document.querySelector('#notification').addEventListener('click',()=>{
    alert("No new notifications.");
});

renderProducts();
