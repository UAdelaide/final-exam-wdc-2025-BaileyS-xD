function fetchDog(){
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(data => {
        const source = data.message;
        document.getElementByID('dog').src = source;
    });
}