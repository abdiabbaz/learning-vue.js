const app = Vue.createApp({
    data(){
        return{
            items:[]
        }
    },
    mounted(){
        fetch("http://localhost:5043/api/WoodPellets").then(response => response.json()).then(data => {this.items = data}).catch(error => {console.error("There was a problem",error)})
    }
})

app.mount("#app")