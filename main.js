const app = Vue.createApp({
    data(){
        return{
            items:[],
            premium:true,
        }
    },
    methods:{
        updateCart(id){
            this.items.push(id);
        },
        removeFromCart(id){
            temp = [];
            for(let i=0;i<this.items.length;i++){
                if(this.items[i] != id){
                    temp.push(this.items[i]);
                }
            }

            this.items = temp;
        }
    }
})