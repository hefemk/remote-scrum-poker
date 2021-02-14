<template>
    <div class="row no-gutter">
        <div class="p-3 col-md-2 col-sm-4"
            v-for="user in table?.users"
            :key="user.name">
            <span>{{user.name}}</span>
            <Poker :point="user.point" :mask="table?.maskAll" />
        </div>
    </div>
    <div class="btn-group" v-if="isHolder">
        <button class="btn btn-primary" @click="flop()">
            Flop
        </button>
        <button class="btn btn-secondary" @click="reset()">
            Reset
        </button>
        <button class="btn btn-danger" @click="flipTable()">
            Flip Table 🤲
        </button>
    </div>
    <hr />
    <HandCards />
</template>

<script lang="ts">
    import { Options, Vue } from 'vue-class-component';
    import HandCards from './HandCards.vue';
    import Poker from './Poker.vue';
    import firebase from 'firebase';
    import { Table } from '../models/table';

    @Options({
        components: {
            HandCards,
            Poker,
        },
    })
    export default class PokerTable extends Vue {
        tableId: any;
        table: Table = new Table();

        private getRef(): string {
            return `tables/${this.tableId}`;
        }

        /** override */
        async created(): Promise<void> {
            this.tableId = this.$route.params.id;
            firebase.database()
                .ref(this.getRef())
                .on('value', (snapshot) => {
                    this.table = snapshot.val();
                });
        }

        get isHolder(): boolean {
            const myEmail = firebase.auth().currentUser?.email;
            if (myEmail) {
                const users = this.table.users;
                if (users) {
                    const me = Object.keys(users)
                        .map(key => users[key])
                        .find(user => user.email === myEmail);
                    return me?.isHolder ?? false;
                } else {
                    return false;
                }
            }
            return false;
        }

        flop() {
            if (this.isHolder) {
                const allPlayed = Object.keys(this.table.users)
                    .map(key => this.table.users[key])
                    .every((user) => user.point);
                if (allPlayed) {
                    this.table.maskAll = !this.table.maskAll;
                    this.updateDatabase();
                }
            }
        }

        reset() {
            if (this.isHolder) {
                const result: boolean = confirm('Are you sure you want to reset?');
                if (result) {
                    Object.keys(this.table.users)
                        .map(key => this.table.users[key])
                        .forEach(user => user.point = '');
                    firebase.database()
                        .ref(this.getRef())
                        .set(this.table);
                    this.table.maskAll = true;
                    this.updateDatabase();
                }
            }
        }

        private updateDatabase(): void {
            firebase.database()
                .ref(this.getRef())
                .set(this.table);
        }

        flipTable() {
            if (this.isHolder) {
                const result: boolean = confirm('Are you sure you want to flip?');
                if (result) {
                    firebase.database()
                        .ref(this.getRef())
                        .remove()
                        .then(() => {
                            this.$router.push('/lobby');
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            }
        }
    }
</script>

<style scoped>
</style>
