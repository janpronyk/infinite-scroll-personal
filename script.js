// Unsplash API
let count = 10;
const apiKEY = ''
const apiURL = `https://api.pexels.com/v1/search?query=nature&per_page=1`


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

        console.log('fetched photos', data);

    } catch (error) {

        console.log('Error fetching photos', error);

    }
}

getPhotos()