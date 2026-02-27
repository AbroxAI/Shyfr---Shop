// File: js/admin.js

// --- Admin Password ---
const ADMIN_PASSWORD = "Shyfr 12$";
const enteredPassword = prompt("Enter admin password:");
if (enteredPassword !== ADMIN_PASSWORD) {
    alert("Incorrect password! Access denied.");
    window.location.href = "index.html";
}

// --- Admin Product Management ---
const adminForm = document.querySelector("#admin-add-form");
const adminList = document.querySelector("#admin-product-list");

let products = JSON.parse(localStorage.getItem("products")) || [];
let pendingListings = JSON.parse(localStorage.getItem("pendingListings")) || [];

// Render Admin Products
function renderAdminProducts() {
    adminList.innerHTML = "";

    // --- Pending Listings Section ---
    if(pendingListings.length){
        const pendingHeader = document.createElement("h3");
        pendingHeader.className="text-lg font-bold mb-2 text-yellow-400";
        pendingHeader.textContent="Pending User Listings";
        adminList.appendChild(pendingHeader);

        pendingListings.forEach((product,index)=>{
            const div = document.createElement("div");
            div.className="flex justify-between items-center bg-gray-700 p-3 rounded-lg mb-2 shadow-md";
            div.innerHTML=`
                <div class="flex items-center space-x-3">
                    <img src="${product.image}" alt="${product.name}" class="h-16 w-16 rounded-lg object-cover">
                    <div>
                        <p class="font-bold">${product.name}</p>
                        <p class="text-purple-500 font-semibold">$${product.price}</p>
                        <p class="text-gray-300 text-sm">Submitted: ${product.submittedAt}</p>
                    </div>
                </div>
                <div class="flex space-x-2">
                    <button class="bg-green-500 px-3 py-1 rounded-lg hover:bg-green-600 transition" onclick="approveListing(${index})">Approve</button>
                    <button class="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition" onclick="rejectListing(${index})">Reject</button>
                </div>
            `;
            adminList.appendChild(div);
        });
    }

    // --- Current Products Section ---
    if(products.length){
        const currentHeader = document.createElement("h3");
        currentHeader.className="text-lg font-bold mt-4 mb-2 text-purple-500";
        currentHeader.textContent="Approved Products";
        adminList.appendChild(currentHeader);

        products.forEach((product,index)=>{
            const div = document.createElement("div");
            div.className="flex justify-between items-center bg-gray-700 p-3 rounded-lg mb-2 shadow-md";
            div.innerHTML=`
                <div class="flex items-center space-x-3">
                    <img src="${product.image}" alt="${product.name}" class="h-16 w-16 rounded-lg object-cover">
                    <div>
                        <p class="font-bold">${product.name}</p>
                        <p class="text-purple-500 font-semibold">$${product.price}</p>
                    </div>
                </div>
                <button class="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition" onclick="deleteProduct(${index})">Delete</button>
            `;
            adminList.appendChild(div);
        });
    }
}

// --- Approve User Listing ---
function approveListing(index){
    const approved = pendingListings.splice(index,1)[0];
    products.push(approved);
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("pendingListings", JSON.stringify(pendingListings));
    renderAdminProducts();
    alert(`${approved.name} approved and now visible in shop!`);
}

// --- Reject User Listing ---
function rejectListing(index){
    const rejected = pendingListings.splice(index,1)[0];
    localStorage.setItem("pendingListings", JSON.stringify(pendingListings));
    renderAdminProducts();
    alert(`${rejected.name} has been rejected.`);
}

// --- Delete Product ---
function deleteProduct(index){
    const removed = products.splice(index,1)[0];
    localStorage.setItem("products", JSON.stringify(products));
    renderAdminProducts();
    alert(`${removed.name} deleted from shop.`);
}

// --- Add Product (Admin Add Form) ---
adminForm.addEventListener("submit",function(e){
    e.preventDefault();
    const name = adminForm.name.value.trim();
    const price = parseFloat(adminForm.price.value);
    const desc = adminForm.desc.value.trim();
    const imageFile = adminForm.image.files[0];

    if(!name || !price || !desc || !imageFile){
        alert("Please fill all fields and upload an image!");
        return;
    }

    const reader = new FileReader();
    reader.onload=function(){
        const newProduct={
            id: Date.now(),
            name,
            price,
            desc,
            image: reader.result,
            feedback: []
        };
        products.push(newProduct);
        localStorage.setItem("products", JSON.stringify(products));
        renderAdminProducts();
        adminForm.reset();
        alert(`${name} added successfully!`);
    };
    reader.readAsDataURL(imageFile);
});

// --- Initialize ---
renderAdminProducts();
