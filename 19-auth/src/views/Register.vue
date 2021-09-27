<template>
    <div class="register">
        <h1>Register</h1>

        <form name="register" @submit.prevent="register">
            <label for="name">Naam</label>
            <input
                type="text"
                required
                id="name"
                name="name"
                v-model="form.name"
            />
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
            <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Register',
    components: {},
    data() {
        return {
            form: {
                name: '',
                email: '',
                password: '',
            },
        };
    },
    methods: {
        register() {
            fetch('http://localhost:8000/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.form),
            })
                .then((resposne) => {
                    if (!resposne.ok) {
                        throw new Error('could not register');
                    }

                    return resposne.json();
                })
                .then((body) => {
                    console.log(body);
                })
                .catch((error) => {
                    console.error(error);
                });
        },
    },
};
</script>
