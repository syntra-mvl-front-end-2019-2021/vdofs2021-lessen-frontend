<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/login">Login</router-link> |
            <router-link to="/register">Register</router-link> |
            <router-link to="/admin">Admin</router-link>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App',
};
</script>

<style lang="scss"></style>
