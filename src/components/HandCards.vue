<template>
    <div class="row">
        <div class="col-md-2 col-sm-4 my-2" v-for="p in pokerPoints" :key="p">
            <Poker 
                :ref="setItemRef"
                :point="p"
                @on-card-play="onCardPlay" />
        </div>
    </div>
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import Poker from './Poker.vue';

    @Options({
        components: {
            Poker,
        },
    })
    export default class HandCards extends Vue {
        private pokerEls: Poker[] = [];
        pokerPoints: string[] = [
            '0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '∞', '?', '☕'
        ];

        onCardPlay(cardPoint: string) {
            this.pokerEls.forEach((poker: Poker) => {
                poker.played = false;
                if (poker.point === cardPoint) {
                    poker.played = true;
                }
            });
        }

        setItemRef(el: any) {
            if (el) {
                this.pokerEls.push(el);
            }
        }

        onBeforeUpdate(): void {
            this.pokerEls = [];
        }

    }
</script>

<style scoped>

</style>
