<template>
    <div class="admin">
        <h1>Admin</h1>

        {{ user.firstname | test }}
    </div>
</template>

<script>
import auth from '@/mixins/auth';
import lower from '@/mixins/lower';

export default {
    name: 'Admin',
    components: {},
    created() {
        console.log('component');
    },
    computed: {
        user() {
            return this.$store.state.user;
        },
    },
    mixins: [auth, lower],
    filters: {
        test(val) {
            return val + 's';
        },
    },
};
</script>
