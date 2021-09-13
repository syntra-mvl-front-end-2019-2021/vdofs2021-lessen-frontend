<template>
    <div
        :class="{
            'c-dropdown': true,
            'c-dropdown--open': open,
        }"
        @focusout="blur"
        :ref="'dropdown_' + label"
    >
        <span
            class="c-dropdown__label"
            tabindex="0"
            @focus="focus"
            :ref="'dropdown_label_' + label"
        >
            {{ label }}
        </span>
        <div class="c-dropdown__items">
            <component
                v-for="(item, itemLabel) in items"
                :key="label + '_' + itemLabel"
                :class="{ 'c-dropdown__item': typeof item === 'string' }"
                :is="typeof item === 'string' ? 'router-link' : 'SubDropdown'"
                :to="typeof item === 'string' ? item : null"
                :items="typeof item === 'string' ? null : item"
                :id="typeof item === 'string' ? null : itemLabel"
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
            const parent = this.$refs['dropdown_' + this.label];
            if (parent.contains(e.relatedTarget)) {
                return;
            }
            this.open = false;
        },
        doBlur() {
            this.$refs['dropdown_label_' + this.label].blur();
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
        background-color: $header-bg-color;
        cursor: pointer;
        position: relative;

        @media screen and (max-width: 600px) {
            line-height: 3rem;
        }

        &:after {
            display: block;
            content: '';
            position: absolute;
            width: 0;
            height: 0;
            right: 0;
            top: 50%;
            margin-top: -5px;
            border-style: solid;
            border-width: 10px 7px 0 7px;
            border-color: $nav-color transparent transparent;
            transition: transform 200ms linear;
        }
    }

    &__items {
        position: absolute;
        display: flex;
        flex-direction: column;
        top: 100%;
        right: 0;
        transform: translateY(-100%);
        background-color: $header-bg-color;
        z-index: -1;
        transition: transform ease-in-out 200ms;

        @media screen and (max-width: 600px) {
            position: static;
            transform: unset;
        }
    }

    &__item {
        font-size: 1.5rem;
        padding: 0.6rem 1.5rem;
        min-width: max-content;
        font-weight: bold;
        color: $nav-color;
        text-align: center;
        text-decoration: none;
        background-color: $header-bg-color;

        @media screen and (max-width: 600px) {
            text-align: left;
            padding-left: 3rem;
        }
    }

    &--open {
        .c-dropdown {
            &__label:after {
                transform: rotate(180deg);

                @media screen and (max-width: 600px) {
                    transform: unset;
                }
            }

            &__items {
                transform: translateY(0);
            }
        }
    }
}
</style>
