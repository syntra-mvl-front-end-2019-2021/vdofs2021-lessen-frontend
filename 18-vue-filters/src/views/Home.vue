<template>
    <div class="home">
        <aside class="home__aside">
            <form
                @submit.prevent="setFilters"
                id="filter-form"
                class="home__filter-form"
            >
                <label for="start">Van:</label>
                <input
                    id="start"
                    type="date"
                    name="start"
                    v-model="filters.start"
                />
                <label for="end">Tot:</label>
                <input
                    id="end"
                    type="date"
                    name="end"
                    v-model="filters.end"
                    :max="today"
                />

                <div class="home__filter-creators">
                    <div
                        v-for="creator in creators"
                        :key="'creator_' + creator.id"
                    >
                        <input
                            :id="'creator_' + creator.id"
                            type="checkbox"
                            name="creators"
                            :value="creator.id"
                            v-model="filters.creators"
                        />

                        <label :for="'creator_' + creator.id">
                            {{ creator.fullName }}
                        </label>
                    </div>
                </div>
            </form>

            <button
                form="filter-form"
                type="submit"
                class="home__filter-submit"
            >
                Filter
            </button>
        </aside>
        <main class="home__main">
            <h1>Comics</h1>
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
            creators: [],
            filters: {
                start: '',
                end: '',
                creators: [],
            },
        };
    },
    components: { Pagination, Comic },
    mounted() {
        this.fetchComics();
        this.fetchCreators();
    },
    watch: {
        $route: {
            immediate: true,
            handler: function () {
                if (this.$route.query.page) {
                    this.curPage = parseInt(this.$route.query.page);
                }

                if (
                    this.$route.query.start &&
                    this.$route.query.start !== this.filters.start
                ) {
                    this.filters.start = this.$route.query.start;
                }

                if (
                    this.$route.query.end &&
                    this.$route.query.end !== this.filters.end
                ) {
                    this.filters.end = this.$route.query.end;
                }

                if (
                    this.$route.query.creators &&
                    JSON.stringify(this.$route.query.creators) !==
                        JSON.stringify(this.filters.creators)
                ) {
                    this.filters.creators = this.$route.query.creators;
                }

                this.fetchComics();
            },
        },
    },
    computed: {
        today() {
            return new Date().toISOString().split('T')[0];
        },
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
        async fetchCreators() {
            try {
                const response = await axios(
                    'https://gateway.marvel.com:443/v1/public/creators',
                    {
                        method: 'GET',
                        params: {
                            apikey: this.publicKey,
                            limit: 50,
                        },
                    },
                );

                this.creators = response.data.data.results;
            } catch (error) {
                console.error(error);
            }
        },
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
                            creators: this.filters.creators,
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

            if (this.filters.creators.length) {
                newFilters.creators = this.filters.creators;
            }

            this.$router.push({
                path: this.$route.path,
                query: newFilters,
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
        overflow-y: hidden;
        border-right: 2px solid goldenrod;
        padding: 2rem 0 5rem;
        input[type='date'] {
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
        padding: 2rem 2rem 1rem;
        display: flex;
        flex-direction: column;
    }

    &__filter {
        &-form {
            width: 100%;
            height: 100%;
            padding: 0 2rem;
            overflow-y: auto;
        }
        &-submit {
            position: absolute;
            bottom: 1rem;
            left: 2rem;
            width: calc(100% - 4rem);
        }

        &-creators {
            margin-top: 1rem;
            max-height: 10rem;
            overflow: auto;
        }
    }
}

.comics-container {
    flex-grow: 1;
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
