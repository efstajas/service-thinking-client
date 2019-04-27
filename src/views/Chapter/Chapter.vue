<template>
    <div class="Chapter">
        <div class="info">
            <SvgMorph class="animation" v-if="animation" :steps="animation"/>
            <span class="title">{{ title }}</span>
            <span class="subtitle">{{ subtitle }}</span>
        </div>
        <div class="text">
            <vue-markdown toc @rendered="updateSubchapters" :toc-anchor-link="false" v-if="chapter" :source="chapter" />
        </div>
        <div v-if="nextSlug" class="next">
            <span  class="title"></span>
            <router-link :to="nextSlug" >Read on</router-link>
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
        nextSlug() {
            return (this.$store.state.thesis.chapters[this.chapterIndex + 1]) ? this.$store.state.thesis.chapters[this.chapterIndex + 1].slug : null
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
        }
    },
    components: {
        VueMarkdown,
        SvgMorph
    },
    destroyed() {
        this.$store.dispatch('clearSubchapters')
    }
}
</script>

<style lang="sass" src="./Chapter.sass">