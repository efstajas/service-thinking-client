<template>
    <div class="Swap">
        <transition mode="out-in" name="swap">
            <slot></slot>
        </transition>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="sass">
.swap-enter-active
    transition: transform .2s ease-out, opacity .2s

.swap-leave-active
    transition: transform .2s ease-in, opacity .2s

.swap-enter, .swap-leave-to
    transform: translateY(10px)
    opacity: 0
</style>
