import { makeObservable, observable } from 'mobx';

class UserStore {
    @observable loading = true;
    @observable isLoggedIn = false;
    @observable username = '';

    constructor() {
        makeObservable(this);
        if (localStorage.getItem('isLoggedIn') !== null) {
            const isLoggedIn: boolean | null = JSON.parse(localStorage.getItem('isLoggedIn')!);
            if (isLoggedIn !== null) {
                this.isLoggedIn = isLoggedIn;
            }
        }
    }

    storeLoggedIn(success: boolean) {
        this.isLoggedIn = success;
        localStorage.setItem('isLoggedIn', JSON.stringify(success));
    }
}

export default new UserStore();
