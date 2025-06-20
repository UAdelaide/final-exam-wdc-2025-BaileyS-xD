const { createApp, ref } = Vue
    createApp({
        setup() {
        const message = ref('Hello vue!')
        return {
            message
        }
        }
    }).mount('#app')

function fetchDog(){
    fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.json())
    .then((data) => {
        const source = data.message;
        document.getElementById('dog').src = source;
    });
}