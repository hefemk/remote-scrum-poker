<template>
    <div class="text-center mt-4">
        <button class="btn btn-primary" @click="signIn()">
            Sign in with Google
        </button>
    </div>
</template>

<script lang="ts">
import firebase from "firebase";
import { Options, Vue } from "vue-class-component";

@Options({
    props: {},
})
export default class Login extends Vue {
    signIn(): void {
        this.signWithPopup();
    }
    private signWithPopup(): void {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((user) => {
                // user signed in
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
