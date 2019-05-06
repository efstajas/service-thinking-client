<template>
    <div class="MdText">
        <vue-markdown :postrender="handlePostRender" class="md" :toc="toc" @rendered="(text) => { this.$emit('rendered', renderedText) }" :toc-anchor-link="false" :source="source" />
        <v-runtime-template class="text" v-if="renderedText" :template="renderedText" />
    </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'
import Citation from '@/components/Citation'
import VRuntimeTemplate from "v-runtime-template"

export default {
    name: 'MdText',
    props: {
        source: {
            type: String
        },
        toc: {
            type: Boolean,
            default: true
        },
        tocAnchorLink: {
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            renderedText: null,
            citationNumber: 0,
        }
    },
    methods: {
        handlePostRender(html) {
            this.renderedText = `<div>${this.constructRefs(html)}</div>`
        },
        constructRefs(html) {
            /*return html.replace(/ *\[[^\]]*]/g, (match) => {
                let text = `<Citation :pageIndex="${this.citationNumber}" tag="${match}"/>`
                this.citationNumber++
                return text
            })*/
            return html.replace(/ *\[[^\]]*]/g, `<Citation tag="$&"/>`)
        }
    },
    components: {
        VueMarkdown,
        VRuntimeTemplate,
        Citation
    }
}
</script>

<style lang="sass" src="./MdText.sass">
