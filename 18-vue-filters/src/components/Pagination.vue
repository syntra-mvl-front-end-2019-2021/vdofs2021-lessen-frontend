<template>
    <div class="c-pagination">
        <button
            v-if="curPage !== 1"
            class="c-pagination__item"
            @click="changePage(1)"
        >
            1
        </button>
        <span v-if="prevPrevPage > 2" class="c-pagination__spacer">...</span>
        <div>
            <button
                v-if="prevPrevPage"
                class="c-pagination__item"
                @click="changePage(prevPrevPage)"
            >
                {{ prevPrevPage }}
            </button>
            <button
                v-if="prevPage"
                class="c-pagination__item"
                @click="changePage(prevPage)"
            >
                {{ prevPage }}
            </button>
            <button class="c-pagination__item c-pagination__item--active">
                {{ curPage }}
            </button>
            <button
                v-if="nextPage"
                class="c-pagination__item"
                @click="changePage(nextPage)"
            >
                {{ nextPage }}
            </button>
            <button
                v-if="nextNextPage"
                class="c-pagination__item"
                @click="changePage(nextNextPage)"
            >
                {{ nextNextPage }}
            </button>
        </div>
        <span v-if="curPage < totalPages - 3" class="c-pagination__spacer">
            ...
        </span>
        <button
            v-if="curPage !== totalPages"
            class="c-pagination__item"
            @click="changePage(totalPages)"
        >
            {{ totalPages }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'Pagination',
    props: {
        curPage: {
            type: Number,
            required: true,
        },
        totalPages: {
            type: Number,
            required: true,
        },
    },
    computed: {
        prevPrevPage() {
            if (this.curPage <= 3) {
                return false;
            }

            return this.curPage - 2;
        },
        prevPage() {
            if (this.curPage <= 2) {
                return false;
            }

            return this.curPage - 1;
        },

        nextNextPage() {
            if (this.curPage >= this.totalPages - 2) {
                return false;
            }

            return this.curPage + 2;
        },
        nextPage() {
            if (this.curPage >= this.totalPages - 1) {
                return false;
            }

            return this.curPage + 1;
        },
    },
    methods: {
        changePage(page) {
            this.$emit('change', page);
        },
    },
};
</script>

<style lang="scss">
.c-pagination {
    padding: 2rem 0 0;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: baseline;

    &__item {
        padding-left: 1rem;
        padding-right: 1rem;

        &:focus {
            box-shadow: none;
        }

        &--active {
            background-color: goldenrod;

            &:hover {
                background-color: darkgoldenrod;
            }
        }
    }
}
</style>
