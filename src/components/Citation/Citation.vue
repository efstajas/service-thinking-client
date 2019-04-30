<template>
    <div v-if="ref" class="Citation">
        <div @click="handleClick" :style="{transform: `translateX(${offset}px)`}" ref="info" class="citationInfo">
            <span class="index">{{ ref.index }}</span><span class="title">{{ ref.meta.title }}</span>
        </div>
        <div @click="handleClick" v-if="$store.state.referenceOpen === tag" :style="{transform: `translateX(${offset}px)`}" ref="moreInfo" class="moreInfo">
            <div class="keyValuePair">
                <span class="index">{{ ref.index }}</span>
                <span class="value">{{ ref.title }}</span>
            </div>
            <div v-for="(meta, name) in ref.meta" :key="`${ref.index}-${meta.title}`" class="keyValuePair">
                <span class="title">{{ name }}</span>
                <span class="value">{{ meta }}</span>
            </div>
        </div>
        <span @click="handleClick" class="textIndex">
            {{ ref.index }}
        </span>
    </div>
</template>

<script>
export default {
    name: 'Citation',
    props: {
        tag: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            position: 1250,
            myPosition: null,
            offset: null,
        }
    },
    computed: {
        sanitizedTag() {
            return this.tag.replace('[', '').replace(']','')
        },
        ref() {
            return this.$store.state.refs[this.sanitizedTag]
        }
    },
    mounted() {
        this.myPosition = this.$refs.info.getBoundingClientRect().left
        this.offset = this.position - this.myPosition
        console.log(this.position)
    },
    methods: {
        handleClick() {
            if (this.$store.state.referenceOpen === this.tag) {
                this.$store.dispatch('setRefStatus', {
                    open: null
                })
            } else {
                this.$store.dispatch('setRefStatus', {
                    open: this.tag
                })
            }
        }
    },
}
</script>

<style scoped lang="sass" src="./Citation.sass">
