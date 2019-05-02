<template>
    <div v-if="ref" class="Citation">
        <div @click="handleClick" :style="{transform: `translate(${offset}px, ${yOffset}px)`}" ref="info" class="citationInfo">
            <span class="index">{{ ref.index }}</span><span class="title">{{ ref.meta.title }}</span>
        </div>
        <div @click="handleClick" v-if="$store.state.referenceOpen === tag" :style="{transform: `translate(${offset}px, ${yOffset}px)`}" ref="moreInfo" class="moreInfo">
            <div class="keyValuePair">
                <span class="index">{{ ref.index }}</span>
                <span class="value">{{ ref.title }}</span>
            </div>
            <div v-for="(meta, name) in ref.meta" :key="`${ref.index}-${name}`" class="keyValuePair">
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
            offset: 0,
            yOffset: 0
        }
    },
    computed: {
        sanitizedTag() {
            return this.tag.replace('[', '').replace(']','').toLowerCase()
        },
        ref() {
            return this.$store.state.refs[this.sanitizedTag]
        }
    },
    mounted() {
        this.$nextTick(() => {
            if (this.$refs.info) {
                let y1 = this.$refs.info.getBoundingClientRect().top
                let y2 = this.$refs.info.getBoundingClientRect().bottom
                let yOffset = 0

                this.$store.state.refCoordinates.forEach((value) => {
                    if (value.y1 === y1) {          
                        yOffset = yOffset + value.height
                        y1 = this.$refs.info.getBoundingClientRect().top,
                        y2 = this.$refs.info.getBoundingClientRect().bottom
                    }
                })

                this.yOffset = yOffset

                this.$store.dispatch('registerRefCoordinates', {
                    y1: y1,
                    y2: y2,
                    height: this.$refs.info.getBoundingClientRect().height
                })

                this.myPosition = this.$refs.info.getBoundingClientRect().left
                this.offset = this.position - this.myPosition
            }
        })
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
    }
}
</script>

<style scoped lang="sass" src="./Citation.sass">
