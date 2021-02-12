<template>
    <button @click="signIn()">Sign in with Google</button>    
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';

    @Options({
        props: {},
    })
    export default class Login extends Vue {
        signIn(): void {
            this.$router.push('/table');
        }
    }
</script>

<style scoped>
</style>
