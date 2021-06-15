<template>
    <div class="c-notify">
        <div class="c-notify__item" v-for="(text, index) in items" :key="index">
            <button class="c-notify__item-close" @click="closeItem(index)">
                close
            </button>
            <p>{{ text }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Notify',
    data() {
        return {
            highestIndex: 0,
            items: {},
        };
    },
    created() {
        this.$root.$on('notify', this.addItem);
    },
    beforeDestroy() {
        this.$root.$off('notify', this.addItem);
    },
    methods: {
        closeItem(index) {
            this.$delete(this.items, index);
        },
        addItem(text) {
            this.highestIndex++;
            this.$set(this.items, this.highestIndex, text);
            const curIndex = this.highestIndex;
            setTimeout(() => {
                this.closeItem(curIndex);
            }, 2000);
        },
    },
};
</script>

<style lang="scss">
.c-notify {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    height: 0;
    width: calc(100% - 2rem);
    max-width: 59rem;
    display: flex;
    flex-direction: column-reverse;

    &__item {
        background-color: goldenrod;
        margin-top: 1rem;
        text-align: left;
        position: relative;
        padding: 1rem 3rem 1rem 1rem;

        &-close {
            background-color: #fff;
            border: none;
            outline: none;
            width: 2rem;
            height: 2rem;
            color: transparent;
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            border-radius: 50%;
            &:after,
            &:before {
                content: '';
                width: 2px;
                height: 1.2rem;
                position: absolute;
                top: 50%;
                left: 50%;
                margin-top: -0.6rem;
                margin-left: -1px;
                background-color: black;
            }

            &:before {
                transform: rotate(45deg);
            }
            &:after {
                transform: rotate(-45deg);
            }
        }
    }
}
</style>
