<template>
  <div class="content">
    <div class="store-box" v-for="(item, index) in containerCheck.carts" :key="index">
      <p class="title">{{item.store_name}} ( {{item.count_products}} Items)</p>
      <div class="table-responsive">
        <table class="table table-borderless">
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="itemProduct in containerCheck.carts[index].products" :key="itemProduct.id">
              <td class="product-info">
                <img :src="itemProduct.img" :alt="itemProduct.name">
                <p class="product-title">{{itemProduct.name}}</p>
              </td>
              <td class="product-quntity">
                <div class="count">
                  <button class="count-btn" type="button" @click.prevent="decreaseCounter(itemProduct.qty,itemProduct.product_id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #fff;"><path d="M5 11h14v2H5z"></path></svg>
                  </button>
                  <span class="counter-text">{{itemProduct.qty}}</span>
                  <button class="count-btn" type="button" @click.prevent="increaseCounter(itemProduct.qty,itemProduct.product_id)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" style="fill: #fff;"><path d="M19 11h-6V5h-2v6H5v2h6v6h2v-6h6z"></path></svg>
                  </button>
                </div>
              </td>
              <td class="product-price">
                <p class="price">{{itemProduct.price.toFixed(2)}} SAR</p>
                <!-- <p class="price-discount">
                  <span class="discount">10000 SAR</span>
                  <span class="percent">33%</span>
                </p> -->
              </td>
              <td class="product-delete">
                <button class="delete-btn" @click.prevent="deleteFromCart(itemProduct.product_id)" >
                  <img src="~/assets/images/icons/delete_white.svg" alt="delete_white">
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="store-box-bottom">
        <p class="text">Store : {{item.shipping_charges}} SAR <span><img src="~/assets/images/icons/shipping.svg" alt="shipping"></span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props:{
      containerCheck:{
        type: Object,
        require: true
      }
    },
    data() {
      return {
          counter: 0,
      }
    },mounted() {
      // console.log("datadatadata",this.containerCheck)
    }
    ,
    methods: {
      async increaseCounter(qty,id) {
        // this.counter++;
        console.log(qty,id)
        const payload = `product_id=${id}`
        await this.$Api.user.deleteProductFromCart(payload).then((res)=> {
          if (res?.data?.status) {
            console.log("delete",res.data)
          }
        }).then(() =>{
          qty = qty + 1
          const otherPayload = `product_id=${id}&qty=${qty}`
           this.$Api.user.addProductToCart(otherPayload).then((res)=> {
            if (res?.data?.status) {
              console.log("add",res.data)
            }
          })
        })
        this.$emit("reloadToGetData", true)

      },
      async decreaseCounter(qty,id) {
        if (qty > 0) {
          // this.counter--;
          const payload = `product_id=${id}`
          await this.$Api.user.deleteProductFromCart(payload).then((res)=> {
            if (res?.data?.status) {
              console.log("delete",res.data)
            }
          }).then(() =>{
            qty = qty - 1
            const otherPayload = `product_id=${id}&qty=${qty}`
            this.$Api.user.addProductToCart(otherPayload).then((res)=> {
              if (res?.data?.status) {
                console.log("add",res.data)
              }
            })
          })
          this.$emit("reloadToGetData", true)
        } else {
          return false
        }
      },

      async deleteFromCart(id) {
        this.$toast.fire({
          title: 'Do you want to Delete this ?',
          showCancelButton: true,
          showConfirmButton: true,
          confirmButtonText: "Yes, delete it!",
          width:'40em',
          timer:false,
          timerProgressBar: false,
          position: "center",
          padding: "2rem",
          icon: 'question',
        }).then(()=> {
          const payload = `product_id=${id}`
          this.$Api.user.deleteProductFromCart(payload).then((res)=> {
            if (res?.data?.status) {
              this.$toast.fire('Deleted!', '', 'success')
              this.$emit("reloadToGetData", true)
            }
          })
        })


      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
