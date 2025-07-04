const { createApp, ref } = Vue
    createApp({
        data() {
            return {
                source: ''
            };
        },
        methods: {
            fetchDog(){
                fetch('https://dog.ceo/api/breeds/image/random')
                .then((response) => response.json())
                .then((data) => {
                    this.source = data.message;
                });
            }
        },
        mounted() {
            this.fetchDog();
        }
    }).mount('#app');
