<template>
    <div
        :class="`c-autocomplete formulate-input-element formulate-input-element--${context.class}`"
        :data-type="context.type"
    >
        <input type="hidden" v-model="context.model" />
        <input
            class="c-autocomplete__input"
            v-bind="context.attributes"
            type="text"
            @input="input"
            v-model="term"
            autocomplete="no"
            @blur="blur"
            @keydown.enter.prevent="select(options[selectIndex])"
            @keydown.down="next"
            @keydown.up="prev"
        />
        <div class="c-autocomplete__results" ref="autocomplete-results">
            <button
                v-for="(option, index) in options"
                :key="option.name"
                :class="{
                    'c-autocomplete__result': true,
                    'c-autocomplete__result--active': selectIndex === index,
                }"
                @click="select(option)"
            >
                {{ option.name }}
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Autocomplete',
    props: {
        context: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            timeOut: null,
            term: '',
            options: [],
            selected: null,
            selectIndex: null,
        };
    },
    watch: {
        'context.model': {
            async handler(newVal, oldVal) {
                console.log(newVal, oldVal);

                if (this.selected || !newVal) {
                    return;
                }
                try {
                    const response = await fetch(newVal);

                    if (!response.ok) {
                        throw new Error('could not fetch results');
                    }

                    const body = await response.json();

                    console.log(body);
                    this.selected = body;
                    this.term = body.name;
                } catch (e) {
                    console.error(e);
                }
            },
            immediate: true,
        },
    },
    methods: {
        blur(e) {
            if (!this.$refs['autocomplete-results'].contains(e.relatedTarget)) {
                this.options = [];
            }
            this.context.blurHandler();
        },
        select(item) {
            this.selected = item;
            this.term = item.name;
            this.options = [];
            this.context.model = item.url;
        },
        next() {
            if (this.selectIndex === null) {
                this.selectIndex = 0;
                return;
            }

            if (this.selectIndex === this.options.length - 1) {
                return;
            }

            this.selectIndex++;
        },
        prev() {
            if (this.selectIndex === 0) {
                this.selectIndex = null;
            }

            this.selectIndex--;
        },
        input() {
            this.selected = null;
            this.options = [];
            this.context.model = '';
            this.selectIndex = null;

            clearTimeout(this.timeOut);

            if (!this.term) {
                return;
            }

            this.timeOut = setTimeout(() => {
                fetch(
                    'https://swapi.dev/api/people/?search=' +
                        encodeURI(this.term),
                )
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('could not fetch results');
                        }

                        return response.json();
                    })
                    .then((body) => {
                        console.log(body);
                        this.options = body.results;
                    })
                    .catch((e) => {
                        console.error(e);
                    });
            }, 500);
        },
    },
};
</script>

<style lang="scss">
.c-autocomplete {
    position: relative;

    &__input {
        box-sizing: border-box;
    }

    &__results {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        display: flex;
        flex-direction: column;
    }

    &__result {
        background-color: white;
        border: none;
        outline: none;
        border-radius: 0;
        color: black;
        font-size: 1rem;
        line-height: 1.4rem;
        border: solid 1px cornflowerblue;

        &--active {
            background-color: goldenrod;
        }
    }
}
</style>
