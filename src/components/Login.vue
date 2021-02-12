<template>
    <button @click="signIn()">Sign in with Google</button>    
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';

    @Options({
        props: {},
    })
    export default class HelloWorld extends Vue {
        signIn(): void {}
    }
</script>

<style scoped>
</style>
