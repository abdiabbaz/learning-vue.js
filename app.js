const app = Vue.createApp({
    data() {
        return {
            items: [],
            newItem: { brand: "", price: 0, quality: 1 },
            deleteId: null,
            itemToBeUpdated: null
        };
    },
    mounted() {
        this.loadItems();
    },
    methods: {
        loadItems() {
            axios.get("http://localhost:5043/api/WoodPellets").then(response => {
                this.items = response.data
            })
        },
        addItems(){
            axios.post("http://localhost:5043/api/WoodPellets", this.newItem).then(response => {
                console.log("Data is sent succesfully", response.data)
                this.items.push(response.data)
                this.newItem = { brand: "", price: 0, quality: 1 }

            }).catch( error =>{
                console.log("Something happend", error)
            })
        },
        deleteItem(id){
            axios.delete(`http://localhost:5043/api/WoodPellets/${id}`).then(response => {
                if(response.status === 200){
                    console.log("Data is deleted succesfully", response.data)
                    this.items = this.items.filter(item => item.id !== id)
                    this.deleteId = null
                }
                else{
                    console.log("Id isnot deleted. ERROR")
                }
            }).catch(error => {
                console.log("There was a problem with deleting the item",error)
            })

        },
        editItem(item) {
            this.itemToBeUpdated = { ...item };
        },
        updateItem1(){
            axios.put(`http://localhost:5043/api/WoodPellets/${this.itemToBeUpdated.id}`,this.itemToBeUpdated).then(response =>{
                console.log(response.data)
                if(response.status === 200){
                    this.items = this.items.map(item => item.id === this.itemToBeUpdated.id ? this.itemToBeUpdated : item)
                    this.itemToBeUpdated = null;
                }
                else{
                    console.log("Something went wrong")
                }
            }).catch(error => {
                console.log("Something went wrong with updating the item", error)
            })

        },
    }
});

app.mount("#app");
