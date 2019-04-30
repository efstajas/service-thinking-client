<template>
    <div class="Cover">
        <div class="info">
            <SvgMorph :width="900" :viewBoxWidth="383" color="#000" class="animation" v-if="animation" :steps="animation"/>
            <span class="title">{{ info.name }}</span>
            <span class="subtitle">{{ info.subtitle }}</span>
            <span class="author">{{ info.author }}</span>
            <span class="date">{{ info.date }}</span>
            <span class="institute">{{ info.institute }}</span>
        </div>
        <MdText v-if="intro" :source="intro" />
        <router-link :to="`/chapter/${firstChapter.slug}`" v-if="firstChapter" class="next">
            <img class="arrow" src="/arrowDown.svg" />
            <div class="information">
                <span class="continue">Continue reading</span>
                <span class="title">{{ firstChapter.name }}</span>
            </div>
        </router-link>
    </div>
</template>

<script>
import MdText from '@/components/MdText'
import getIntro from '@/util/getIntro'
import { SvgMorph } from '@/components/Animations'
import getAnimation from '@/util/getAnimation'

const animUrl = '/thesis/animations/3.json'

export default {
    name: 'Cover',
    data() {
        return {
            intro: null,
            animation: null
        }
    },
    computed: {
        info() {
            let { name, subtitle, date, author, institute } = this.$store.state.thesis
            return { name, subtitle, date, author, institute }
        },
        firstChapter() {
            return this.$store.state.thesis.chapters[0]
        }
    },
    mounted() {
        this.getIntro()

        window.scrollTo(0,0)

        getAnimation(animUrl).then((res) => {
            this.animation = res.data
        })
    },
    methods: {
        getIntro() {
            getIntro(this.$store.state.thesis).then((intro) => {
                this.intro = intro.data
            })
        }
    },
    components: {
        MdText,
        SvgMorph
    }
}
</script>

<style scoped lang="sass" src="./Cover.sass">
