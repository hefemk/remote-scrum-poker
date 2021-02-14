<template>
    <div class="mt-4 text-center">
        <button
            class="btn btn-primary"
            @click="createTable()">
            Create Table
        </button>
        <hr />
        <p>or Join Table</p>
        <div class="input-group">
            <input class="form-control"
                type="text"
                required
                v-model="existedTableId" />
            <div class="input-group-append">
                <button
                    class="btn btn-outline-primary"
                    @click="joinTable()">
                    Join
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import firebase from "firebase";
import { Options, Vue } from "vue-class-component";
import { User } from '../models/user';
import { Table } from '../models/table';

@Options({
    props: {},
})
export default class Lobby extends Vue {
    existedTableId: string = '';
    async createTable(): Promise<void> {
        const timestamp = Date.now();
        const user = this.mapToUserObj(true);
        if (user) {
            const table = new Table();
            table.createdOn = timestamp;

            table.users = {
                '0': user
            };

            firebase.database()
                .ref(`tables/${timestamp}`)
                .set(table)
                .then(() => {
                    this.goToTable(`/table/${timestamp}`);
                })
                .catch((error) => {
                    console.error(error);
                }
            );
        }
    }

    private mapToUserObj(isHolder: boolean = false): User | null {
        const currentUser = firebase.auth().currentUser;
        if (currentUser) {
            const _user = new User();
            _user.isHolder = isHolder;
            _user.email = currentUser.email ?? 'null';
            _user.name = currentUser.displayName ?? 'null';
            return _user;
        } else {
            return null;
        }
    }

    private goToTable(tableId: string): void {
        this.$router.push(tableId);
    }

    async joinTable(): Promise<void> {
        if (this.existedTableId?.length > 0) {
            const user = this.mapToUserObj();
            if (user) {
                const ref = firebase.database().ref(`tables/${this.existedTableId}`);

                const tableSnapshot = await ref.get();
                const users = (tableSnapshot.val() as Table).users;
                const me = Object.keys(users)
                    .map(key => users[key])
                    .find(u => u.email === user.email);
                if (me) {
                    console.warn(`You are already joined.`);
                    this.goToTable(`/table/${this.existedTableId}`);
                } else {
                    ref.child(`users`)
                        .push(user)
                        .then(() => {
                            this.goToTable(`/table/${this.existedTableId}`);
                        })
                        .catch((error) => {
                            console.error(error);
                        }
                    );
                }
            }
        }
    }
}
</script>

<style scoped>
</style>
