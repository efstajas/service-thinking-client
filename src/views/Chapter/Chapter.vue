<template>
    <div class="Chapter">
        <div class="content">
            <div class="info">
                <SvgMorph class="animation" v-if="animation" :steps="animation"/>
                <span class="title">{{ title }}</span>
                <span class="subtitle">{{ subtitle }}</span>
            </div>
            <div class="text">
                <MdText @rendered="updateSubchapters" v-if="chapter" :source="chapter" />
            </div>
            <router-link :to="nextChapter.slug" v-if="nextChapter" class="next">
                <img class="arrow" src="/arrowDown.svg" />
                <div class="information">
                    <span class="continue">Continue reading</span>
                    <span class="title">{{ nextChapter.name }}</span>
                </div>
            </router-link>
        </div>
        <div id="annotations" class="annotations">
        </div>
    </div>
</template>

<script>
import getChapterObjectBySlug from '@/util/getChapterObjectBySlug.js'
import getChapter from '@/util/getChapter'
import getAnimation from '@/util/getAnimation'
import { SvgMorph } from '@/components/Animations'
import VueMarkdown from 'vue-markdown'
import store from '@/store.js'
import MdText from '@/components/MdText'

export default {
    name: 'Chapter',
    data() {
        return {
            chapter: null,
            error: null,
            title: null,
            subtitle: null,
            animation: null,
        }
    },
    computed: {
        chapterIndex() {
            return this.$store.state.thesis.chapters.map(function(e) { return e.slug; }).indexOf(this.$route.params.slug)
        },
        nextChapter() {
            return (this.$store.state.thesis.chapters[this.chapterIndex + 1]) ? this.$store.state.thesis.chapters[this.chapterIndex + 1] : null
        }
    },
    mounted() {
        getChapter(this.$store.state.thesis, this.$route.params.slug).then((res) => {
            this.chapter = res.data
        })

        window.scrollTo(0,0)

        getChapter(this.$store.state.thesis, this.$route.params.slug).then((res) => {
            this.chapter = res.data
        })

        let chapterObject = getChapterObjectBySlug(store.state.thesis, this.$route.params.slug)
        let animUrl = chapterObject.info.animation.path
        getAnimation(animUrl).then((res) => {
            this.setMetadata({
                animation: res.data,
                title: chapterObject.info.title,
                subtitle: chapterObject.info.subtitle,
            })
        })
    },
    methods: {
        setMetadata(data) {
            this.animation = data.animation
            this.title = data.title
            this.subtitle = data.subtitle
        },
        updateSubchapters(html) {
            let el = document.createElement('div')
            el.innerHTML = html
            let headings = el.getElementsByTagName('h2')

            let subchapters = []
            
            for (let heading of headings) {
                subchapters.push({
                    link: `#${heading.id}`,
                    title: heading.innerHTML
                })
            }

            this.$store.dispatch('setSubchapters', {
                ...subchapters
            })
        },
    },
    components: {
        VueMarkdown,
        SvgMorph,
        MdText
    },
    destroyed() {
        this.$store.dispatch('clearSubchapters')
    }
}
</script>

<style lang="sass" src="./Chapter.sass">