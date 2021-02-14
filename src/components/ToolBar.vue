<template>
    <nav class="navbar navbar-dark bg-dark">
        <span class="navbar-brand mb-0 h1">Remote Scrum Poker</span>
        <button
            class="btn btn-dark"
            v-if="isSignedIn"
            @click="logout()">
            Logout
        </button>
    </nav>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import firebase from "firebase";

    @Options({
        props: {
            isSignedIn: {
                type: Boolean,
                required: true
            },
        },
    })
    export default class ToolBar extends Vue {
        logout(): void {
            firebase.auth().signOut()
                .then(() => {
                    this.$router.push('/login');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.error(errorCode, errorMessage);
                }
            );
        }
    }
</script>

<style scoped>
</style>
