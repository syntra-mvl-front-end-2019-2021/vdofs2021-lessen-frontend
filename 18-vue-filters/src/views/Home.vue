<template>
    <div class="home">
        <aside class="home__aside">
            <form @submit.prevent="setFilters">
                <label for="start">Van:</label>
                <input
                    id="start"
                    type="date"
                    name="start"
                    v-model="filters.start"
                />
                <label for="end">Tot:</label>
                <input id="end" type="date" name="end" v-model="filters.end" />
                <button type="submit" class="home__filter-submit">
                    Filter
                </button>
            </form>
        </aside>
        <main class="home__main">
            <div
                :class="{
                    'comics-container': true,
                    'comics-container--loading': fetching,
                }"
            >
                <Comic v-for="comic in comics" :key="comic.id" :comic="comic">
                    {{ comic.title }}
                </Comic>
            </div>
            <div class="pagination-container">
                <Pagination
                    v-if="total > limit"
                    :cur-page="curPage"
                    :total-pages="totalPages"
                    @change="changePage"
                />
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios';
import Comic from '@/components/Comic';
import Pagination from '@/components/Pagination';
export default {
    name: 'Home',
    data() {
        return {
            publicKey: '73d1f9264e33cfeed75510d126300b53',
            comics: [],
            limit: 20,
            total: 0,
            fetching: true,
            curPage: 1,
            filters: {
                start: '',
                end: '',
            },
        };
    },
    components: { Pagination, Comic },
    mounted() {
        this.fetchComics();
    },
    watch: {
        $route: {
            immediate: true,
            handler: function () {
                if (this.$route.query.page) {
                    this.curPage = parseInt(this.$route.query.page);
                }

                if (this.$route.query.start !== this.filters.start) {
                    this.filters.start = this.$route.query.start;
                }

                if (this.$route.query.end !== this.filters.end) {
                    this.filters.end = this.$route.query.end;
                }

                this.fetchComics();
            },
        },
    },
    computed: {
        totalPages() {
            return Math.ceil(this.total / this.limit);
        },
        offset() {
            return (this.curPage - 1) * this.limit;
        },
        dateRange() {
            if (!this.filters.start && !this.filters.end) {
                return null;
            }

            return (
                (this.filters.start ? this.filters.start : '1000-01-01') +
                ',' +
                (this.filters.end ? this.filters.end : '2050-01-01')
            );
        },
    },
    methods: {
        async fetchComics() {
            this.fetching = true;

            try {
                const response = await axios(
                    'https://gateway.marvel.com:443/v1/public/comics',
                    {
                        method: 'GET',
                        params: {
                            apikey: this.publicKey,
                            offset: this.offset,
                            dateRange: this.dateRange,
                        },
                    },
                );

                console.log(response.data.data);
                this.total = response.data.data.total;
                this.comics = response.data.data.results;
                this.fetching = false;
            } catch (error) {
                console.error(error);
            }
        },
        changePage(page) {
            const curQuery = Object.assign({}, this.$route.query, {
                page: '' + page,
            });

            this.$router.push({
                path: this.$route.path,
                query: curQuery,
            });
        },
        setFilters() {
            const newFilters = {
                page: 1,
            };

            if (this.filters.start) {
                newFilters.start = this.filters.start;
            }

            if (this.filters.end) {
                newFilters.end = this.filters.end;
            }

            const curQuery = Object.assign({}, this.$route.query, newFilters);

            this.$router.push({
                path: this.$route.path,
                query: curQuery,
            });
        },
    },
};
</script>

<style lang="scss">
.home {
    &__aside {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 30%;
        overflow-y: auto;
        border-right: 2px solid goldenrod;
        padding: 2rem 2rem 5rem;
        input {
            width: 100%;
        }
    }

    &__main {
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 70%;
        overflow-x: auto;
        padding: 2rem;
    }

    &__filter-submit {
        position: absolute;
        bottom: 1rem;
        left: 2rem;
        width: calc(100% - 4rem);
    }
}

.comics-container {
    min-height: 10rem;
    position: relative;
    &--loading {
        &:before {
            display: block;
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(32, 43, 56, 0.7);
        }
        &:after {
            display: block;
            content: '';
            width: 3rem;
            height: 3rem;
            border-radius: 50%;
            border-style: solid;
            border-width: 6px;
            border-color: goldenrod transparent;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -1.5rem;
            margin-left: -1.5rem;
            animation: rotate 2s infinite alternate;
        }
    }
}

@keyframes rotate {
    0% {
        transform: rotate(0);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
