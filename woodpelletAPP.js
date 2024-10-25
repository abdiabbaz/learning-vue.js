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
            fetch("http://localhost:5043/api/WoodPellets")
                .then(res => res.json())
                .then(data => { this.items = data })
                .catch(error => { console.error("There was a problem", error) });
        },
        addItems() {
            fetch("http://localhost:5043/api/WoodPellets", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.newItem)
            }).then(res => res.json())
                .then(data => {
                    this.items.push(data);
                    this.newItem = { brand: "", price: 0, quality: 1 };
                }).catch(error => { console.error("There was a problem with creating an item", error) });
        },
        deleteItem(Id) {
            fetch(`http://localhost:5043/api/WoodPellets/${Id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => {
                if (res.ok) {
                    this.items = this.items.filter(item => item.id !== Id);
                    this.deleteId = null;
                } else {
                    console.log("Id is not deleted. ERROR");
                }
            }).catch(error => {
                console.error("There was a problem with deleting the item", error);
            });
        },
        editItem(item) {
            this.itemToBeUpdated = { ...item };
        },
        updateItem() {
            fetch(`http://localhost:5043/api/WoodPellets/${this.itemToBeUpdated.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(this.itemToBeUpdated)
            }).then(res => res.json())
                .then(data => {
                    this.items = this.items.map(item =>
                        item.id === this.itemToBeUpdated.id ? this.itemToBeUpdated : item
                    );
                    this.itemToBeUpdated = null;
                }).catch(error => {
                    console.log("There was a problem with updating the item", error);
                });
        }
    }
});

app.mount("#app");
