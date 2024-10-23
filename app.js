const app = Vue.createApp({
   data(){
    return {
        showBooks: true,
        title: "The Final Empire",
        author: "Abdi Abbas",
        age: 25
    }
   },
   methods:{
    changeTitle(title){
        this.title = title
    },
    toogleShowBooks(){
        this.showBooks = !this.showBooks
    },
    resetAge(){
        this.age = 25
    }
   }
})

app.mount('#app')