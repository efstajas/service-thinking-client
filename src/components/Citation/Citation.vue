<template>
    <div ref="info"  class="Citation">
        <div @click="handleClick" :style="{transform: `translate(${offset}px, ${yOffset}px)`}" class="citationInfo">
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
import { setTimeout } from 'timers';
export default {
    name: 'Citation',
    props: {
        tag: {
            type: String,
            required: true
        },
        pageIndex: Number
    },
    data() {
        return {
            position: 1160,
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
        },
        refCoordinates() {
            return this.$store.state.refCoordinates
        }
    },
    mounted() {
        console.log(this.pageIndex)
        this.$nextTick(() => {
            this.calculateOffset()
            this.calculateMetrics()
            setTimeout(() => {
                this.calculateOffset()
            }, 100)
        })
        window.addEventListener('resize', () => {
            this.calculateOffset()
        });
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
        },
        calculateOffset() {
            this.myPosition = 0
            this.myPosition = this.$refs.info.getBoundingClientRect().left
            this.offset = document.getElementById('annotations').getBoundingClientRect().left - this.myPosition
        },
        calculateMetrics() {
            if (this.$refs.info) {
                let y1 = this.$refs.info.getBoundingClientRect().top
                let h1 = this.$refs.info.getBoundingClientRect().height
                let y2 = this.$refs.info.getBoundingClientRect().bottom
                let yOffset = 0

                this.$store.state.refCoordinates.forEach((value) => {
                    if (this.collision(y1, h1, value.y1, value.height)) {
                        yOffset = yOffset + ((value.y1 + value.height) - y1)
                        y1 = this.$refs.info.getBoundingClientRect().top,
                        y2 = this.$refs.info.getBoundingClientRect().bottom
                    }
                })

                this.yOffset = yOffset

                this.$store.dispatch('registerRefCoordinates', {
                    index: this.pageIndex,
                    tag: this.sanitizedTag,
                    y1: y1,
                    y2: y2,
                    height: h1
                })
            }
        },
        collision(y1, h1, y2, h2) {
            var b1 = y1 + h1;
            var b2 = y2 + h2;

            if (b1 < y2 || y1 > b2) return false;
            return true;
        }
    },
    /*watch: {
        'refCoordinates': function(now) {
            console.log("yip")
            if (now.some(el => el.index === this.pageIndex - 1)) console.log("yup")
        }
    }*/
}
</script>

<style scoped lang="sass" src="./Citation.sass">
