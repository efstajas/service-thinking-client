<template>
    <div class="Appendix">
        <MdText v-if="appendix" :source="appendix" />
    </div>
</template>

<script>
import MdText from '@/components/MdText'
import getAppendix from '@/util/getAppendix'

export default {
    name: 'Appendix',
    data() {
        return {
            appendix: null
        }
    },
    mounted() {
        this.getAppendix()
    },
    methods: {
        getAppendix() {
            getAppendix(this.$store.state.thesis).then((appendix) => {
                this.appendix = appendix.data
            })
        },
        mounted() {
            window.scrollTo(0,0)
        }
    },
    components: {
        MdText
    }
}
</script>

<style scoped lang="sass" src="./Appendix.sass">
