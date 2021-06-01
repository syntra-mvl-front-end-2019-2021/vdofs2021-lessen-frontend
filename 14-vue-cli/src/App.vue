<template>
    <div>
        <Header />
        <router-view />
    </div>
</template>

<script>
import Header from '@/components/Header';
export default {
    name: 'Root',
    components: { Header },
};
</script>

<style lang="scss"></style>
