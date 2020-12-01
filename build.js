const globby = require("globby");
const fs = require("fs");
const sass = require("sass");

function keyToNavLink(key) {
    return key
        .split("-")
        .map(([k, ...rest]) => k.toUpperCase() + rest.join(""))
        .join(" ");
}

function generateImage(imageUrl, key) {
    return `<img class="${key}" src=${imageUrl} />`;
}

const order = ["background-design", "illustrations", "animation"];

(async () => {
    const images = await globby("./img/portfolio/**/*.*");
    const groupedImages = {};
    images.forEach((image) => {
        const folder = image.split("/").slice(-2)[0];
        groupedImages[folder] = groupedImages[folder] || [];
        groupedImages[folder].push(image);
    });
    let indexHtml = fs.readFileSync("./base-index.html", { encoding: "utf8" });
    indexHtml = indexHtml.replace(
        /\{\{nav\}\}/,
        order.map((key) => `<span class="${key} nav-item"><a href="#${key}">${keyToNavLink(key)}</a></span>`).join("\n")
    );
    indexHtml = indexHtml.replace(
        /\{\{content\}\}/,
        order
            .map(
                (key, i) =>
                    `<div id=${key} ${i > 0 ? `class="hidden"` : ""}>
                        <h2>${keyToNavLink(key)}</h2>
                        <div class="thumbnails">
                            ${groupedImages[key].map((url) => generateImage(url, key)).join("")}
                        </div>
                    </div>`
            )
            .join("\n")
    );
    fs.writeFileSync("./index.html", indexHtml, { encoding: "utf8" });

    const { css } = sass.renderSync({
        file: "./scss/index.scss",
        sourceMap: false,
    });

    fs.writeFileSync("./css/app.css", css.toString(), { encoding: "utf8" });
    fs.writeFileSync("./js/categories.js", `window.categories = ${JSON.stringify(order)};`);
    fs.copyFileSync("./node_modules/basiclightbox/dist/basicLightbox.min.css", "./css/basicLightbox.min.css");
    fs.copyFileSync("./node_modules/basiclightbox/dist/basicLightbox.min.js", "./js/basicLightbox.min.js");
})();
