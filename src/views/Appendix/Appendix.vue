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
                console.log(appendix.data)
                this.appendix = appendix.data
            })
        }
    },
    components: {
        MdText
    }
}
</script>

<style scoped lang="sass" src="./Appendix.sass">
