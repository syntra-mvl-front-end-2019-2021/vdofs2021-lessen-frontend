<template>
    <nav class="c-nav">
        <div v-for="(item, label) in items" :key="'level_one_' + label">
            <router-link
                v-if="typeof item === 'string'"
                class="c-nav__item"
                :to="item"
            >
                {{ label }}
            </router-link>
            <Dropdown v-else :items="item" :label="label" />
        </div>
    </nav>
</template>

<script>
import Dropdown from '@/components/Dropdown';
export default {
    name: 'Navigation',
    components: { Dropdown },
    props: {
        items: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/variables';

.c-nav {
    display: flex;
    justify-content: flex-end;
    flex-grow: 1;
    padding-right: 2rem;

    &__item {
        display: block;
        line-height: $header-height;
        padding: 0 2rem;
        font-size: 1.6rem;
        color: $nav-color;
        font-weight: bold;
        text-decoration: none;
        background-color: $header-bg-color;
    }
}
</style>
