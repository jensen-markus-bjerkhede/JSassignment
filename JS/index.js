document.querySelector('button').addEventListener('click', async () => {
   
    let text = document.querySelector('input').value; 
    
    // Get images/Data
    
    let data = await getImages(text);

    // updateUI
    updateUI(data);
    
})

async function getImages(text){
    const apiKey = '19d3e6e0acfe9c438f368e2c2bab1c5d';
    const baseurl = 'https://api.flickr.com/services/rest';
    let method = 'flickr.photos.search'
    let selectValue = document.querySelector('select').value;
    let url = `${baseurl}?api_key=${apiKey}&per_page=${selectValue}&method=${method}&text=${text}&format=json&nojsoncallback=1`;
 
    let resp = await fetch(url);
    let data = await resp.json();
    return data.photos;
}

// update UI
function updateUI(data){

    document.querySelector('section').innerHTML = '';

    data.photo.forEach(img => {
        let el = document.createElement('img');
        el.setAttribute('src', imgUrl(img, 'q'));
        el.setAttribute('data-org', imgUrl(img, 'c'));

        document.querySelector('section').appendChild(el);
    });

    
    // Lightbox

const lightbox = document.querySelector('#lightbox')
const images = document.querySelectorAll('img')
images.forEach(image => {
image.addEventListener('click', e => {
    lightbox.classList.add('active')    
    const img = document.createElement('img')
    img.src = image.dataset.org
    while (lightbox.firstChild) {
    lightbox.removeChild(lightbox.firstChild)
    }
    lightbox.appendChild(img)
    })
})

lightbox.addEventListener('click', e => {
  if (e.target !== e.currentTarget) return
  lightbox.classList.remove('active')
})
    
    
}
function imgUrl(img, size){

    return `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${size}.jpg`
}