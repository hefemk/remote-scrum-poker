<template>
    <ToolBar :isSignedIn="isSignedIn" />
    <div class="container">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from "vue-class-component";
    import ToolBar from './components/ToolBar.vue';
    import firebase from "firebase";

    @Options({
        components: {
            ToolBar,
        }
    })
    export default class App extends Vue {
        isSignedIn: boolean = false;

        /** override */
        created(): void {
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    this.isSignedIn = true;
                    this.$router.push('/lobby');
                } else {
                    this.isSignedIn = false;
                    this.$router.push('/login');
                }
            });
        }
    }
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
</style>
