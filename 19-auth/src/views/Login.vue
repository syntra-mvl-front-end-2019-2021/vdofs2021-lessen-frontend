<template>
    <div class="login">
        <h1>Login</h1>
        <form name="login" @submit.prevent="login">
            <label for="email">E-mailadres</label>
            <input
                type="email"
                required
                id="email"
                name="email"
                v-model="form.email"
            />
            <label for="password">Wachtwoord</label>
            <input
                required
                type="password"
                id="password"
                name="password"
                v-model="form.password"
            />
            <button
                type="submit"
                :disabled="loginState.started && !loginState.finished"
            >
                {{
                    loginState.started && !loginState.finished
                        ? 'Loading...'
                        : 'Login'
                }}
            </button>
        </form>
        <p class="error">{{ message }}</p>
    </div>
</template>

<script>
export default {
    name: 'Login',
    components: {},
    data() {
        return {
            form: {
                email: '',
                password: '',
            },
            message: '',
        };
    },
    computed: {
        loginState() {
            return this.$store.state.loginState;
        },
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
    },
    methods: {
        async login() {
            this.message = '';
            await this.$store.dispatch('login', this.form);

            if (this.isLoggedIn) {
                await this.$router.push('/admin');
            } else {
                this.form.email = '';
                this.form.password = '';

                this.message = 'Could not log in, try again';
            }
        },
    },
};
</script>

<style>
.error {
    color: red;
}
</style>
