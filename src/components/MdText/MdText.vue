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
            renderedText: null
        }
    },
    methods: {
        handlePostRender(html) {
            this.renderedText = `<div>${this.constructRefs(html)}</div>`
        },
        constructRefs(html) {
            let refs = (html.match(/\[.+?\]/g)) ? html.match(/\[.+?\]/g).map(function(str) {    // Iterate matches
                return str.slice(1,-1)
            }) : null

            return html.replace(/ *\[[^\]]*]/g, '<Citation tag="$&"/>');
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
