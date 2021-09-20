<template>
    <div class="home">
        <div class="comics-container">
            <Comic v-for="comic in comics" :key="comic.id" :comic="comic">
                {{ comic.title }}
            </Comic>
        </div>
        <div class="pagination-container">
            <Pagination
                :cur-page="curPage"
                :total-pages="total"
                @change="changePage"
            />
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

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
        };
    },
    components: { Pagination, Comic },
    mounted() {
        this.fetchComics();
    },
    methods: {
        fetchComics() {
            fetch(
                'https://gateway.marvel.com:443/v1/public/comics?apikey=' +
                    this.publicKey,
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Could not fetch comics');
                    }

                    return response.json();
                })
                .then((body) => {
                    console.log(body.data);
                    this.total = body.data.total;
                    this.comics = body.data.results;
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        changePage(page) {
            this.curPage = page;
        },
    },
};
</script>
