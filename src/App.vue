<template>
  <div id="app">
    <div class="wrapper">
      <Nav :class="{swipedOut: swipedOut}" @clickLink="swipedOut = false" class="nav"/>
      <div  @click="swipedOut = false" class="view">
        <Swap >
          <router-view :key="$route.params.slug" />
        </Swap>
      </div>
      <div id="annotations" class="annotations">
      </div>
    </div>
    <div @click="swipeOut" class="menuButton">
      <img src="./hamburger.svg">
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Swap from '@/components/Swap'

export default {
  components: {
    Nav,
    Swap
  },
  data() {
    return {
      swipedOut: false
    }
  },
  methods: {
    swipeOut() {
      this.swipedOut = !this.swipedOut
    }
  }
}
</script>


<style lang="sass" src="@/styles/Global.sass">
