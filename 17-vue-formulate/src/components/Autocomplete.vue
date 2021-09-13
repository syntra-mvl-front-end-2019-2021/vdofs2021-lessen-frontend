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
            @keydown="input"
            v-model="term"
            autocomplete="no"
            @blur="blur"
        />
        <div class="c-autocomplete__results" ref="autocomplete-results">
            <button
                v-for="option in options"
                :key="option.name"
                class="c-autocomplete__result"
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
        };
    },
    watch: {
        'context.model': {
            handler(newVal, oldVal) {
                console.log(newVal, oldVal);

                if (this.selected || !newVal) {
                    return;
                }

                fetch(newVal)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('could not fetch results');
                        }

                        return response.json();
                    })
                    .then((body) => {
                        console.log(body);
                        this.selected = body;
                        this.term = body.name;
                    })
                    .catch((e) => {
                        console.error(e);
                    });
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
        input() {
            this.selected = null;
            this.options = [];
            this.context.model = '';

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
}
</style>
