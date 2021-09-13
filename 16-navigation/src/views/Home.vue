<template>
    <div class="home">
        <h1>Home</h1>

        <div class="bigthing"></div>
        <div class="bigthing"></div>
        <div class="bigthing"></div>
        <div class="bigthing"></div>
        <div class="bigthing"></div>
        <div class="bigthing"></div>
        <div class="bigthing"></div>
        <div class="bigthing"></div>
        <div class="bigthing"></div>
        <div class="bigthing"></div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {},
};
</script>

<style lang="scss">
@import '@/assets/scss/variables';
.bigthing {
    width: 100%;
    height: 500px;
    margin: 1rem 0;
    border: solid 2px $nav-color;
}
</style>
