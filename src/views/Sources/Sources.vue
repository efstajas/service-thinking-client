<template>
    <div class="Sources">
        <div class="source" v-for="ref in $store.state.refs" :key="ref.index" >
            <div class="headline">
                <span class="index">{{ ref.index }}</span><span class="title">{{ ref.meta.title }}</span>
            </div>
            <div v-if="Object.keys(ref.meta).length > 1">
                <div v-for="(meta, name) in ref.meta" :key="`${ref.index}-${name}`" class="keyValuePair">
                    <span class="title">{{ name }}</span>
                    <span class="value">{{ meta }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sources',
    mounted() {
        window.scrollTo(0,0)
    }
}
</script>

<style scoped lang="sass" src="./Sources.sass">
