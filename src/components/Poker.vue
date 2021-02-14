<template>
    <span class="card text-center"
        :class="{ active: played }"
        @click="play()">
        <span v-if="mask">
            ⏳
        </span>
        <span v-else>
            {{ point }}
        </span>
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
            mask: {
                type: Boolean,
                required: false
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
