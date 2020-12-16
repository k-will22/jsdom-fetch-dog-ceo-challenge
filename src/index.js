console.log('%c HI', 'color: firebrick')

let breeds = []

document.addEventListener('DOMContentLoaded', function() {
    loadImages()
    loadBreedOptions()
})

function loadImages() {
    fetch("https://dog.ceo/api/breeds/image/random/4")
        .then(response => response.json())
        .then(data => {
            data.message.forEach(image => addImage(image))
    })
}

function addImage(dogPic) {
    let container = document.querySelector('#dog-image-container')
    let newImage = document.createElement('img')
    newImage.src = dogPic
    container.appendChild(newImage)
}

function loadBreedOptions() {
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(data => {
            breeds = Object.keys(data.message)
            updateBreedList(breeds)
            addBreedSelectListener()
        })

}

function updateBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds')
    removeChildren(ul)
    breeds.forEach(breed => addBreed(breed))
}

function removeChildren(element) {
    let child = element.lastElementChild
    while (child) {
        element.removeChild(child)
        child = element.lastElementChild
    }
}

function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)))
}

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown')
    breedDropdown.addEventListener('change', function(event) {
        selectBreedsStartingWith(event.target.value)
    })
}

function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds')
    let li = document.createElement('li')
    li.innerText = breed
    li.style.cursor = 'pointer'
    ul.appendChild(li)
}
