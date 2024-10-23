const app = Vue.createApp({
    data(){
        return{
            items:[],
            newItem: { brand:"",price:0,quality:1},
            deleteId: null
        }
    },
    mounted(){
        this.loadItems()
    },
    methods:{
        loadItems()
        {
            fetch("http://localhost:5043/api/WoodPellets").then(response => response.json()).then(data => {this.items = data}).catch(error => {console.error("There was a problem",error)})
        },
        addItems()
        {
            fetch("http://localhost:5043/api/WoodPellets",
            {
                method:"POST",
                headers:
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.newItem)
            }).then(res => res.json())
            .then(data => 
            {
                this.items.push(data)
                this.newItem = { brand: "",price: 0,quality: 1}
            }).catch(error => {console.error("There was a problem",error)})
        },
        deleteItem()
        {
            fetch(`http://localhost:5043/api/WoodPellets/${this.deleteId}`,
            {
                method:"DELETE",
                headers:
                {
                    "Content-Type":"application/json"
                }

            }).then(res => 
            {
                if (res.ok) 
                {
                    this.items = this.items.filter(item => item.id !== this.deleteId);
                    this.deleteId = null;
                } else 
                {
                    console.error("Failed to delete the item");
                }
            })
            .catch(error => 
            {
                console.error("There was a problem", error);
            });
        }
    }
})

app.mount("#app")