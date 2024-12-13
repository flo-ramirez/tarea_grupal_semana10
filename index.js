document.addEventListener('DOMContentLoaded', () => {
    const mainProductContainer = document.getElementById('main-product');
    const otherProductsContainer = document.getElementById('other-products');
    const apiUrl = "https://japceibal.github.io/emercado-api/cats_products/101.json";

    // mapeo manual de nombres de productos a nombres de archivos de imagen
    const imageMap = {
        "Chevrolet Onix Joy": "chevrolet.jpg",
        "Fiat Way": "fiat1.jpg",
        "Suzuki Celerio": "suzuki.jpg",
        "Peugeot 208": "peugeot.jpg",
        "Bugatti Chiron": "bugatti2.jpg"
    };

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            const products = data.products;

            // encuentra el bugatti y lo muestra como principal
            const mainProduct = products.find(product => product.name === "Bugatti Chiron");

            if (mainProduct) {
                const imageName = imageMap[mainProduct.name]; // obtiene el nombre de la imagen del mapeo
                mainProductContainer.innerHTML = `
                    <img src="images/${imageName}" alt="${mainProduct.name}">
                    <div class="description-container">
                        <h2>${mainProduct.name}</h2>
                        <p class="price">US$${mainProduct.cost.toFixed(2)}</p>
                        <p class="description">${mainProduct.description}</p>
                        <p class="sold">Cantidad vendidos: ${mainProduct.soldCount}</p>
                    </div>
                `;
            }

            // muestra el resto de los productos
            products.filter(product => product.name !== "Bugatti Chiron").forEach(product => {
                const imageName = imageMap[product.name]; // obtiene el nombre de la imagen del mapeo
                const productDiv = document.createElement('div');
                productDiv.classList.add('item-auto');

                productDiv.innerHTML = `
                    <img src="images/${imageName}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p class="price">US$${product.cost.toFixed(2)}</p>
                    <p class="description">${product.description}</p>
                    <p class="sold">Cantidad vendidos: ${product.soldCount}</p>
                `;

                otherProductsContainer.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
});
