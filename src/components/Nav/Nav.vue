<template>
    <div class="Nav">
        <div class="inner">
            <div class="intro">
                <router-link to="/" class="title">{{ $store.state.thesis.name }}</router-link>
                <div class="border"/>
            </div>
            <div class="chapters">
                <div class="chapter" :class="{active: $route.params.slug === chapter.slug}" v-for="(chapter) in $store.state.chapters" :key="chapter.title">
                    <router-link class="link" @click.native="handleLinkClick" :to="`/chapter/${chapter.slug}`">
                        <span class="title">{{ chapter.info.title }}</span>
                        <transition name="fadeHeight">
                            <scrollactive  v-if="$route.params.slug === chapter.slug && $store.state.currentSubchapters" class="subchapters">
                                <a :href="subchapter.link" class="scrollactive-item" v-for="(subchapter, index) in $store.state.currentSubchapters" :key="index">{{ subchapter.title }}</a>
                            </scrollactive>
                        </transition>
                    </router-link>
                </div>
            </div>
            <div class="sources">
                <router-link to="/sources">Source Directory</router-link>
            </div>
        </div>
    </div>
</template>

<script>
import smoothHeight from 'vue-smooth-height'

export default {
    name: 'Nav',
    mixins:[smoothHeight],
    methods: {
        handleLinkClick() {
            this.$emit('clickLink')
        }
    },
    components: {
    }
}
</script>

<style scoped lang="sass" src="./Nav.sass">
