/* ==========================================
          BARBING SALON
          GALLERY SYSTEM
========================================== */


/* ==========================================
          HAIRSTYLE DATA
========================================== */

const hairstyles = [
    {
        name: "Low Taper Fade",
        image: "img/low-taper-fade.jpg",
        description: "A clean low taper fade with a sharp and modern finish."
    },

    {
        name: "Classic Fade",
        image: "img/classic-fade.jpg",
        description: "A timeless fade designed for a clean and polished look."
    },

    {
        name: "Textured Crop",
        image: "img/textured-crop.jpg",
        description: "A textured hairstyle with a modern and natural finish."
    },

    {
        name: "Burst Fade",
        image: "img/burst-fade.jpg",
        description: "A bold burst fade that creates a distinctive silhouette."
    },

    {
        name: "High Fade",
        image: "img/high-fade.jpg",
        description: "A sharp high fade for a clean and confident appearance."
    },

    {
        name: "Afro Fade",
        image: "img/afro-fade.jpg",
        description: "A modern fade combined with natural textured hair."
    },

    {
        name: "Temple Fade",
        image: "img/temple-fade.jpg",
        description: "A subtle temple fade that keeps the sides clean."
    },

    {
        name: "Skin Fade",
        image: "img/skin-fade.jpg",
        description: "A smooth skin fade with a crisp professional finish."
    },

    {
        name: "Drop Fade",
        image: "img/drop-fade.jpg",
        description: "A stylish drop fade that follows the natural shape of the head."
    },

    {
        name: "Curly Fade",
        image: "img/curly-fade.jpg",
        description: "Defined curls combined with a clean fade."
    },

    {
        name: "Modern Cut",
        image: "img/modern-cut.jpg",
        description: "A contemporary haircut created for a fresh everyday look."
    },

    {
        name: "Sharp Line Up",
        image: "img/sharp-line-up.jpg",
        description: "A clean haircut finished with a precise line up."
    }
];


/* ==========================================
          CREATE STYLE CARD
========================================== */

function createStyleCard(style) {

    const card = document.createElement("div");

    card.classList.add("style-card");

    card.innerHTML = `
        <img
            src="${style.image}"
            alt="${style.name}"
            loading="lazy"
        >
    `;

    /*
        Store the hairstyle information
        directly on the card.
    */

    card.dataset.styleName = style.name;
    card.dataset.styleDescription = style.description;
    card.dataset.styleImage = style.image;

    return card;
}

/* ==========================================
          INFINITE GALLERY
========================================== */

function createGalleryRow(rowSelector, reverse = false) {

    const track = document.querySelector(
        `${rowSelector} .style-track`
    );

    if (!track) return;


    /*
        Create TWO identical sets.

        Set A = original cards
        Set B = duplicate cards

        The animation will move exactly the
        width of Set A before starting again.
    */

    const firstSet = document.createDocumentFragment();

    hairstyles.forEach(style => {

        const card = createStyleCard(style);

        firstSet.appendChild(card);

    });

    track.appendChild(firstSet);


    const secondSet = document.createDocumentFragment();

    hairstyles.forEach(style => {

        const card = createStyleCard(style);

        secondSet.appendChild(card);

    });

    track.appendChild(secondSet);


    /*
        Mark the direction.
    */

    if (reverse) {
        track.classList.add("reverse");
    }
}


/* ==========================================
          INITIALIZE GALLERY
========================================== */

createGalleryRow(".row-one");

createGalleryRow(".row-two", true);

createGalleryRow(".row-three");

/* ==========================================
            THEME SYSTEM
========================================== */

const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");


/* ==========================================
            APPLY SAVED THEME
========================================== */

const savedTheme = localStorage.getItem("barber_theme");

if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeIcon.textContent = "🌙";
} else {
    themeIcon.textContent = "☀";
}


/* ==========================================
            TOGGLE THEME
========================================== */

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLightMode =
        document.body.classList.contains("light-mode");

    if (isLightMode) {

        localStorage.setItem("barber_theme", "light");

        themeIcon.textContent = "🌙";

    } else {

        localStorage.setItem("barber_theme", "dark");

        themeIcon.textContent = "☀";
    }

});

/* ==========================================
          HAIRSTYLE MODAL
========================================== */

const styleModal = document.getElementById("styleModal");
const modalOverlay = document.querySelector(".modal-overlay");
const modalClose = document.getElementById("modalClose");

const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");


/* ==========================================
          OPEN MODAL
========================================== */

function openStyleModal(card) {

    const name = card.dataset.styleName;
    const description = card.dataset.styleDescription;
    const image = card.dataset.styleImage;


    modalImage.src = image;
    modalImage.alt = name;

    modalTitle.textContent = name;
    modalDescription.textContent = description;


    styleModal.style.display = "block";

    document.body.style.overflow = "hidden";
}


/* ==========================================
          CLOSE MODAL
========================================== */

function closeStyleModal() {

    styleModal.style.display = "none";

    document.body.style.overflow = "";
}


/* ==========================================
          CARD CLICK
========================================== */

document.addEventListener("click", (event) => {

    const card = event.target.closest(".style-card");

    if (!card) return;

    openStyleModal(card);

});


/* ==========================================
          CLOSE BUTTON
========================================== */

modalClose.addEventListener("click", closeStyleModal);


/* ==========================================
          CLICK OUTSIDE
========================================== */

modalOverlay.addEventListener(
    "click",
    closeStyleModal
);


/* ==========================================
          ESCAPE KEY
========================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        closeStyleModal();

    }

});