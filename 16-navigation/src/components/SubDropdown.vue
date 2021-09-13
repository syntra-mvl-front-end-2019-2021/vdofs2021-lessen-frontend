<template>
    <div
        :class="{
            'c-subdropdown': true,
            'c-subdropdown--open': open,
        }"
        @focusout="blur"
        :ref="'subdropdown_' + id"
    >
        <span
            class="c-subdropdown__label"
            tabindex="0"
            @focus="focus"
            :ref="'subdropdown_label_' + id"
        >
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
    created() {
        this.$root.$on('close-dropdown', this.doBlur);
    },
    destroyed() {
        this.$root.$off('close-dropdown', this.doBlur);
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
        doBlur() {
            this.$refs['subdropdown_label_' + this.id].blur();
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
        position: relative;
        @media screen and (max-width: 600px) {
            padding-left: 3rem;
        }

        &:after {
            display: block;
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            left: 2px;
            top: 50%;
            margin-top: -5px;
            border-style: solid;
            border-width: 5px 8px 5px 0;
            border-color: transparent $nav-color transparent transparent;
            transition: transform 200ms linear;

            @media screen and (max-width: 600px) {
                right: 0;
                left: unset;
                margin-top: -5px;
                border-width: 10px 7px 0 7px;
                border-color: $nav-color transparent transparent;
            }
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

        @media screen and (max-width: 600px) {
            position: static;
            max-height: unset;
        }

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

        @media screen and (max-width: 600px) {
            text-align: left;
            padding-left: 4.5rem;
        }
    }

    &--open {
        .c-subdropdown {
            &__label:after {
                transform: rotate(180deg);

                @media screen and (max-width: 600px) {
                    transform: unset;
                }
            }

            &__items {
                max-height: 15rem;
            }
        }
    }
}
</style>
