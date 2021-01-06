// Unsplash API
let count = 10;
let currentPage = 1
const apiURL = `https://api.pexels.com/v1/search?query=nature&page=${currentPage}&per_page=${count}`;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

function displayPhotos() {
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

        // Create photo element
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}

async function getPhotos() {

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

        displayPhotos()

        console.log('fetched photos', data);
        console.log('photos array', photosArray);

    } catch (error) {

        console.log('Error fetching photos', error);

    }

}

// scroll loading of photos

window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
        // getPhotos();
        let i = 0
        i++
        console.log('load more triggered', i);
    }
})

getPhotos()