<template>
    <span class="card text-center"
        :class="{ active: played }"
        @click="play()">
        {{ point }}
    </span>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
    @Options({
        props: {
            point: {
                type: String,
                required: true
            },
        },
        emits: ['on-card-play']
    })
    export default class Poker extends Vue {
        point!: string;
        played: boolean = false;

        play(): void {
            this.played = true;
            this.$emit('on-card-play', this.point);
        }
    }
</script>

<style scoped>
    .card {
        cursor: pointer;
    }
    .active {
        font-weight: bold;
    }
</style>
