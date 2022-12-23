<template>
  <div class="content subscription-supplier">
    <the-header-page :title="`Supplier`"/>
    <div class="content">
      <div class="container">
        <div class="subscription-header">
          <button type="button" class="subscription-btn" :class="{ active: subType == 'monthly' }" @click="changeType('monthly')">monthly packages</button>
          <button type="button" class="subscription-btn" :class="{ active: subType == 'annual' }" @click="changeType('annual')">annual packages</button>
        </div>
        <div class="subscriptions">
          <template v-if="subType == 'monthly'">
            <div class="subscription-box">
              <div class="box-header">
                <p class="title">Plan Name 01</p>
                <p class="price">$150</p>
              </div>
              <ul class="list-style">
                <li class="list">
                  <p class="list-title">Lorem ipsum 1</p>
                  <p class="list-type">yes</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 2</p>
                  <p class="list-type">Monthly</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 3</p>
                  <p class="list-type">Monthly</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 4</p>
                  <p class="list-type">No</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 5</p>
                  <p class="list-type">No</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 6</p>
                  <p class="list-type">No</p>
                </li>
              </ul>
              <button class="subscription-box-btn" type="button">SUBSCRIBE</button>
            </div>
            <div class="subscription-box active-subscription-box">
              <div class="box-header">
                <p class="title">Plan Name 02</p>
                <p class="price">$150</p>
              </div>
              <ul class="list-style">
                <li class="list">
                  <p class="list-title">Lorem ipsum 1</p>
                  <p class="list-type">yes</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 2</p>
                  <p class="list-type">Monthly</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 3</p>
                  <p class="list-type">Monthly</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 4</p>
                  <p class="list-type">No</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 5</p>
                  <p class="list-type">No</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 6</p>
                  <p class="list-type">No</p>
                </li>
              </ul>
              <button class="subscription-box-btn" type="button">SUBSCRIBE</button>
            </div>
            <div class="subscription-box">
              <div class="box-header">
                <p class="title">Plan Name 03</p>
                <p class="price">$150</p>
              </div>
              <ul class="list-style">
                <li class="list">
                  <p class="list-title">Lorem ipsum 1</p>
                  <p class="list-type">yes</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 2</p>
                  <p class="list-type">Monthly</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 3</p>
                  <p class="list-type">Monthly</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 4</p>
                  <p class="list-type">No</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 5</p>
                  <p class="list-type">No</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 6</p>
                  <p class="list-type">No</p>
                </li>
              </ul>
              <button class="subscription-box-btn" type="button">SUBSCRIBE</button>
            </div>
          </template>
          <template v-if="subType == 'annual'">
            <div class="subscription-box">
              <div class="box-header">
                <p class="title">Plan Name 01</p>
                <p class="price">$300</p>
              </div>
              <ul class="list-style">
                <li class="list">
                  <p class="list-title">Lorem ipsum 1</p>
                  <p class="list-type">yes</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 2</p>
                  <p class="list-type">Monthly</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 3</p>
                  <p class="list-type">Monthly</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 4</p>
                  <p class="list-type">No</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 5</p>
                  <p class="list-type">No</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 6</p>
                  <p class="list-type">No</p>
                </li>
              </ul>
              <button class="subscription-box-btn" type="button">SUBSCRIBE</button>
            </div>
            <div class="subscription-box active-subscription-box">
              <div class="box-header">
                <p class="title">Plan Name 02</p>
                <p class="price">$400</p>
              </div>
              <ul class="list-style">
                <li class="list">
                  <p class="list-title">Lorem ipsum 1</p>
                  <p class="list-type">yes</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 2</p>
                  <p class="list-type">Monthly</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 3</p>
                  <p class="list-type">Monthly</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 4</p>
                  <p class="list-type">No</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 5</p>
                  <p class="list-type">No</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 6</p>
                  <p class="list-type">No</p>
                </li>
              </ul>
              <button class="subscription-box-btn" type="button">SUBSCRIBE</button>
            </div>
            <div class="subscription-box">
              <div class="box-header">
                <p class="title">Plan Name 03</p>
                <p class="price">$500</p>
              </div>
              <ul class="list-style">
                <li class="list">
                  <p class="list-title">Lorem ipsum 1</p>
                  <p class="list-type">yes</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 2</p>
                  <p class="list-type">Monthly</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 3</p>
                  <p class="list-type">Monthly</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 4</p>
                  <p class="list-type">No</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 5</p>
                  <p class="list-type">No</p>
                </li>
                <li class="list">
                  <p class="list-title">Lorem ipsum 6</p>
                  <p class="list-type">No</p>
                </li>
              </ul>
              <button class="subscription-box-btn" type="button">SUBSCRIBE</button>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import TheHeaderPage from '~/components/shared/TheHeaderPage.vue';
export default {
    components: {
      TheHeaderPage
    },
    data() {
      return {
        subType: "monthly"
      }
    },
    methods: {
      changeType(e) {
        this.subType = e
      }
    },
  }
</script>
<style lang="scss" scoped>

</style>

