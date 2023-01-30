app.component('product-display', {
    props:{
        premium:{
            type:Boolean,
            required: true
        }
    },
    template: 
    /* html */
    `<div class="product-display">
    <div class="product-container">
      <div class="product-image">
        <!-- v-bind is used to dynamically bind an attribute to an expression shorthand of v-bind is a : -->
        <img :class="{'out-of-stock-img' : !instock}" v-bind:src="image">
      </div>
      <div class="product-info">
        <h1>{{ title }}</h1>
        <!-- <h3>{{ sale }}</h3> -->
        <!-- <h3>My Leetcode Profile :- </h3><a :href="url">Click here</a> -->
        <!-- v-show can be used which basically toggles the visibility of the element -->
        <p v-if="instock > 10">In Stock </p>
        <p v-else-if="instock <= 10 && instock>0">Almost sold Out Few Left</p>
        <p v-else>Out Of Stock</p>

        <p>Shipping : {{ shipping }} </p>

        <!-- <p v-show="onSale">OnSale</p> -->
        <!-- L5 list rendering -->
        
        <product-details :details="details"></product-details>

        <div v-for="(variant,index) in variants" 
             :key="variant.id" 
             @mouseover="updateVariant(index)"
             class="color-circle" :style="{backgroundColor : variant.color}"
             >
        </div>
        <!-- <div v-for="size in sizes">
          {{ size }}
        </div> -->
        <div class="btn">
          <button 
              class="button":class="{disabledButton: inStock}" :disabled="inStock" v-on :click="addToCart"
          >Add To Cart</button>
          <button
              class="button" v-on:click="removeFromCart"
          >Remove from Cart</button></div>
      </div>
    </div>

    <review-list v-if="reviews.length" :reviews="reviews"></review-list>

    <review-form @review-submitted='addReview'></review-form>
    </div>
    `,
    data(){
        return{
            product: 'Socks',
            brand:'Nike',
            desc: "best offers available in the various brands such as Puma, Adidas, Reebok, Woodland, Nike, etc. Choose the latest pair of men's shoes",
            url:'https://www.leetcode.com',
            onSale:true,
            Inventory: 100,
            selectedVariant: 0,
            onSale: true,
            details: ['50% cotton', '30% wool', '20% polyester'],
            variants: [
                {id:123, color:"green", image:'./assets/images/socks_green.jpg', quantity:50},
                {id:124, color:"blue", image:'./assets/images/socks_blue.jpg',quantity:0}
            ],
            sizes:[12,13,14,15],
            reviews:[]
        }
    },
    methods:{
        addToCart(){
            this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
        },
        updateVariant(index){
            this.selectedVariant = index;
        },
        removeFromCart(){
            this.$emit('remove-from-cart', this.variants[this.selectedVariant].id);
        },
        addReview(review){
            this.reviews.push(review);
        }
    },
    computed:{
        title(){
            return this.brand + ' '+ this.product;
        },
        image(){
            return this.variants[this.selectedVariant].image;
        },
        instock(){
            return this.variants[this.selectedVariant].quantity;
        },
        sale(){
            if(this.onSale){
                return this.brand + '  ' + this.product + ' is on sale' ;
            }
        },
        shipping(){
            if(this.premium){
                return 'Free';
            }
            return "2.99$";
        }
    }
})