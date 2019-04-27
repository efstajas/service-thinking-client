<template>
  <div id="app" :class="{swipedOut: swipedOut}">
    <Nav @clickLink="swipedOut = false" class="nav"/>
    <div class="view">
      <Swap >
        <router-view :key="$route.params.slug" />
      </Swap>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Swap from '@/components/Swap'

import getThesis from '@/util/getThesis'

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
}
</script>


<style lang="sass" src="@/styles/Global.sass">
