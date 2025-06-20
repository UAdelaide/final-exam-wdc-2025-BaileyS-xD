const { createApp, ref } = Vue
    createApp({
        data() {
            return {
                source: ''
            }
        }
    }).mount('#app')

function fetchDog(){
    fetch('https://dog.ceo/api/breeds/image/random')
    .then((response) => response.json())
    .then((data) => {
        const source = data.message;
        return source;
    });
}