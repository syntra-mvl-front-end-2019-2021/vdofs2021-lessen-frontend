<template>
    <div
        :class="{
            'c-subdropdown': true,
            'c-subdropdown--open': open,
        }"
        @focusout="blur"
        :ref="'subdropdown_' + id"
    >
        <span class="c-subdropdown__label" tabindex="0" @focus="focus">
            <slot />
        </span>
        <div class="c-subdropdown__items">
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
        padding: 0.6rem 1.5rem;
        min-width: max-content;
        font-weight: bold;
        color: $nav-color;
        cursor: pointer;

        &:after {
            display: block;
            content: '';
            position: absolute;
            width: 0px;
            height: 0px;
            left: 2px;
            top: 50%;
            margin-top: -5px;
            border-style: solid;
            border-width: 5px 8px 5px 0;
            border-color: transparent $nav-color transparent transparent;
            transition: transform 200ms linear;
        }
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

    &--open {
        .c-subdropdown {
            &__label:after {
                transform: rotate(180deg);
            }

            &__items {
                max-height: 15rem;
            }
        }
    }
}
</style>
