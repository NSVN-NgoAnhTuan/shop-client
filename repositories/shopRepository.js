import Repository from './Repository';

const resource = '/shop';

export default {
    findTags() {
        return Repository.get(`${resource}/tags`);
    }
}

