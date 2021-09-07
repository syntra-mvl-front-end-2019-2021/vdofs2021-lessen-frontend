<template>
    <div class="c-subdropdown" @focusout="blur" :ref="'subdropdown_' + id">
        <span class="c-subdropdown__label" tabindex="0" @focus="focus">
            <slot />
        </span>
        <div
            :class="{
                'c-subdropdown__items': true,
                'c-subdropdown__items--open': open,
            }"
        >
            <router-link
                v-for="(item, itemLabel) in items"
                :key="id + '_' + itemLabel"
                class="c-subdropdown__item"
                :to="item"
            >
                {{ itemLabel }}
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SubDropdown',
    props: {
        items: {
            type: Object,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            open: false,
        };
    },
    methods: {
        focus() {
            this.open = true;
        },
        blur(e) {
            const parent = this.$refs['subdropdown_' + this.id];
            if (parent.contains(e.relatedTarget)) {
                return;
            }
            this.open = false;
        },
    },
};
</script>

<style lang="scss">
@import '@/assets/scss/variables';
.c-subdropdown {
    position: relative;
    &__label {
        display: block;
        font-size: 1.5rem;
        padding: 0.6rem 1rem;
        min-width: max-content;
        font-weight: bold;
        color: $nav-color;
    }

    &__items {
        position: absolute;
        right: 100%;
        top: 0;
        display: flex;
        flex-direction: column;
        background-color: $header-bg-color;
        max-height: 0;
        transition: max-height linear 100ms;
        overflow: hidden;

        &--open {
            max-height: 15rem;
        }
    }

    &__item {
        display: block;
        font-size: 1.5rem;
        padding: 0.6rem 1rem;
        min-width: max-content;
        font-weight: bold;
        color: $nav-color;
        text-align: center;
        text-decoration: none;
    }
}
</style>
