function cleanup() {
    document.querySelector("#user-input").value = "";
};


function createImage(link) {
    const newImage = document.createElement("img");
    newImage.setAttribute("src", link);
    return newImage
}

function renderGallery(images) {
    const gallery = document.querySelector("#gallery");
    const imageList = document.createElement("ul");
    images.map(img => {
            const newListItem = document.createElement("li");
        const newImage = createImage(img);
        newListItem.appendChild(newImage);
        imageList.appendChild(newListItem);
    });
    gallery.appendChild(imageList);
}


document.addEventListener("DOMContentLoaded", (event) => {
    const addImageBtn = document.querySelector("input#add-image");
    const resetBtn = document.querySelector("div#reset");
    const storage = localStorage.getItem("gallery");
    if (storage) {
        const images = storage.split(",");
        renderGallery(images);
    }
    addImageBtn.addEventListener("click", (event) => {
        event.preventDefault();
        const url = document.querySelector("input#user-input").value;
        if (!url.length) return;
        if (!storage) {
            localStorage.setItem("gallery", url);
        } else {
            if(storage.includes(url)) return;
            localStorage.setItem("gallery", storage.concat(",", url));
        }
        cleanup();
        window.location.reload();
    });
    resetBtn.addEventListener("click", () => {
        localStorage.removeItem("gallery");
        window.location.reload();
    });
});
