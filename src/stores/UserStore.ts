import { makeObservable, observable, runInAction } from 'mobx';

class UserStore {
    @observable loading = true;
    @observable isLoggedIn = false;
    @observable username = '';

    constructor() {
        makeObservable(this);
    }

    storeLoggedIn(success: boolean) {
        runInAction(() => {
            this.isLoggedIn = success;
        });
    }
}

export default new UserStore();
