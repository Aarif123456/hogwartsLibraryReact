import { makeObservable, observable } from 'mobx';

class UserStore {
    @observable loading = true;
    @observable isLoggedIn = false;
    @observable username = '';

    constructor() {
        makeObservable(this);
    }
}

export default new UserStore();
