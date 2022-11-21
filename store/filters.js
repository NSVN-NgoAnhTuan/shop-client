import { defineStore } from 'pinia'

export const useFiltersStore = defineStore({
    id: 'filter-store',
    state: () => {
        return {
            filtersList: ['youtube', 'twitch'],
        }
    },
    actions: {
        addFilter(newFilter) {
            this.filtersList.push(newFilter)
        }
    },
    // getters: {
    //     filtersList: state => state.filtersList,
    // },
})
//https://www.youtube.com/watch?v=kqs9oegfZGU