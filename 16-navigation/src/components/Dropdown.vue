<template>
    <div class="c-dropdown" @focusout="blur" :ref="'dropdown_' + label">
        <span class="c-dropdown__label" tabindex="0" @focus="focus">
            {{ label }}
        </span>
        <div
            :class="{
                'c-dropdown__items': true,
                'c-dropdown__items--open': open,
            }"
        >
            <component
                v-for="(item, itemLabel) in items"
                :key="label + '_' + itemLabel"
                class="c-dropdown__item"
                :is="typeof item === 'string' ? 'router-link' : 'SubDropdown'"
                :to="typeof item === 'string' ? item : null"
                :items="typeof item === 'string' ? null : item"
            >
                {{ itemLabel }}
            </component>
        </div>
    </div>
</template>

<script>
import SubDropdown from '@/components/SubDropdown';
export default {
    name: 'Dropdown',
    components: { SubDropdown },
    props: {
        items: {
            type: Object,
            required: true,
        },
        label: {
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
            const parent = this.$refs['dropdown_' + this.label];
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

.c-dropdown {
    position: relative;

    &__label {
        display: block;
        line-height: $header-height;
        padding: 0 2rem;
        font-size: 1.6rem;
        color: #35495e;
        font-weight: bold;
    }

    &__items {
        position: absolute;
        display: flex;
        flex-direction: column;
        max-height: 0;
        overflow: hidden;
        top: 100%;
        right: 0;
        background-color: $header-bg-color;
        transition: max-height linear 200ms;

        &--open {
            max-height: 15rem;
        }
    }

    &__item {
        font-size: 1.5rem;
        padding: 0.6rem 1rem;
        min-width: max-content;
        font-weight: bold;
        color: $nav-color;
    }
}
</style>
