<template>
    <div class="SvgMorph">
        <svg viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path v-for="(path, index) in steps.from" :key="index" stroke="#FFFFFF" stroke-alignment="center" :d="path.d" :id="`path-${index}`"/>
        </svg>
    </div>
</template>

<script>
import anime from 'animejs'

export default {
    name: 'SvgMorph',
    props: {
        steps: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            timeline: null
        }
    },
    mounted() {
        this.buildAnimation()
    },
    methods: {
        buildAnimation() {
            this.timeline = null
            this.timeline = anime.timeline({ autoplay: true, direction: 'alternate', loop: true })

            this.steps.to.forEach((path, index) => {
                this.timeline
                .add({
                    targets: `#path-${index}`,
                    d: {
                        value: path.d,
                        duration: 300,
                        easing: 'easeInOutQuad'
                    },
                }, (this.steps.to.length - index) * 100 );

                this.timeline
                .add({
                    targets: 'path:first-child',
                    opacity: {
                        value: 1,
                        duration: 100,
                        easing: 'easeInOutQuad'
                    },
                }, 2000 + 10 * this.steps.to.length);
            })
        }
    },
    watch: {
        steps: function() {
            this.$nextTick(() => {
                this.timeline.pause()
                this.buildAnimation()
            })
        }
    }
}
</script>

<style scoped lang="sass" src="./SvgMorph.sass">
