const { createApp, ref } = Vue
    createApp({
        setup() {
        const message = ref('Hello vue!')
        return {
            fetchDog()
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