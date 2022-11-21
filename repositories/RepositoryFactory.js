import AuthRepository from './authRepository'
import ShopRepository from './shopRepository'

const repositories = {
    auth: AuthRepository,
    shop: ShopRepository
};

export const RepositoryFactory = {
    get: name => repositories[name]
};