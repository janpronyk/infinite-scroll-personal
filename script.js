// Unsplash API
let imageCount = 5;
let currentPage = 1

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];


function imageLoaded() {
    imagesLoaded++

    if(imagesLoaded === totalImages) {
        ready = true
        imagesLoaded = 0
        loader.hidden = true
        imageCount = 10
    }

}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    totalImages = photosArray.length

    photosArray.forEach((photo) => {
        // Create link to image
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.url,
            target: '_blank'
        })

        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.src.medium,
            alt: photo.photographer,
            title: photo.photographer
        })

        // Event AudioListener, check when each finished loading
        img.addEventListener('load', imageLoaded)

        // Create photo element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

async function getPhotos() {
    
    const apiURL = `https://api.pexels.com/v1/search?query=nature&page=${currentPage}&per_page=${imageCount}`;

    try {

        const res = await fetch(apiURL, 
           { 
               headers: {
                
                    Authorization: apiKEY,
            
                },
            }
        );

        const data = await res.json();
        photosArray = await data.photos;
        currentPage++

        displayPhotos()

    } catch (error) {

        console.log('Error fetching photos');

    }

}

// scroll loading of photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos();
    }
})

getPhotos()