(() => {
    function hashChange() {
        const selectedCategory = window.location.href.split("#")[1] || window.categories[0];
        window.categories.forEach((category) => document.getElementById(category).classList.add("hidden"));
        document.getElementById(selectedCategory).classList.remove("hidden");
        document.querySelectorAll(`.nav-item`).forEach((item) => item.classList.remove("selected"));
        document.querySelector(`main .${selectedCategory}.nav-item`).classList.add("selected");
    }
    hashChange();
    window.addEventListener("hashchange", hashChange, false);

    document.querySelectorAll("img").forEach((img) => {
        let imageBox;
        img.addEventListener("click", () => {
            // This should take img but it doesn't.
            imageBox = imageBox || basicLightbox.create(img.outerHTML);
            imageBox.show();
        });
    });
})();
