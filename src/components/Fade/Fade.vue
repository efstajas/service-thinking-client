<template>
    <div class="Fade">
        <transition mode="out-in" name="fade">
            <slot></slot>
        </transition>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="sass">
.fade-enter-active
    transition: opacity .3s

.fade-leave-active
    transition: opacity .3s

.fade-enter, .fade-leave-to
    opacity: 0
</style>
