import Repository from './Repository';

const resource = '/auth';

export default {
    login(payload) {
        return Repository.post(`${resource}/login`, payload);
    },
    test() {
        return Repository.get(`${resource}/test`);
    },
    logout(token) {
        var config = {
            headers: { token }
        };
        return Repository.post(`${resource}/logout`, null, config);
    }
}

