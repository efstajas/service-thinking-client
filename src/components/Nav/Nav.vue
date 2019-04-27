<template>
    <div class="Nav">
        <div class="inner">
            <div class="chapters">
                <div class="chapter" :class="{active: $route.params.slug === chapter.slug}" v-for="(chapter) in $store.state.chapters" :key="chapter.title">
                    <router-link class="link" @click.native="handleLinkClick" :to="`/chapter/${chapter.slug}`">
                        <span class="title">{{ chapter.info.title }}</span>
                        <scrollactive v-if="$route.params.slug === chapter.slug" class="subchapters">
                            <a :href="subchapter.link" class="scrollactive-item" v-for="(subchapter, index) in $store.state.currentSubchapters" :key="index">{{ subchapter.title }}</a>
                        </scrollactive>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Nav',
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
