// Function to handle image loading errors
window.handleImageError = function (img) {
  img.onerror = null; // Prevent infinite loop if "no-image.jpg" is also not found
  img.src = "./assets/img/menu/no-image.jpg"; // Replace with the path to your "no-image.jpg" file
};

document.addEventListener("DOMContentLoaded", function () {
  fetch("../assets/JSON/menu-data.JSON")
    .then((response) => response.json())
    .then((data) => {
      const menuContainer = document.querySelector(".menu-container");

      data.items.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.classList.add(
          "col-lg-6",
          "menu-item",
          `filter-${item.category}`
        );

        menuItem.innerHTML = `
            <a href="${item.image}" target="_blank" data-glightbox="menu" data-title="${item.name}">
              <img src="${item.image}" onerror="handleImageError(this)" class="menu-img" alt="${item.name}" loading="lazy" />
            </a>
            <div class="menu-content">
              <p>${item.name}</p>
            </div>
            <div class="menu-descriptions">${item.descriptions}</div>
          `;

        menuContainer.appendChild(menuItem);
      });
    })
    .catch((error) => console.error("Error loading menu data:", error));
});
