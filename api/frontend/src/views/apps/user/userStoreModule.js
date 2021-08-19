import axios from "@axios";

export default {
    namespaced: true,
    state: {},
    getters: {},
    mutations: {},
    actions: {
        fetchUsers(ctx, queryParams) {
            return new Promise((resolve, reject) => {
                axios
                    .get("/admin/users", { params: queryParams })
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            });
        },
        fetchUser(ctx, { id }) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/admin/users/${id}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            });
        },
        addUser(ctx, userData) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/apps/user/users", { user: userData })
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            });
        },
        approveCreator(ctx, { id }) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/admin/users/${id}/approve`)
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            });
        },
        rejectCreator(ctx, { id }) {
            return new Promise((resolve, reject) => {
                axios
                    .get(`/admin/users/${id}/reject`)
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            });
        },
        deleteUser(ctx, { id }) {
            return new Promise((resolve, reject) => {
                axios
                    .delete(`/admin/users/${id}`)
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            });
        }
    }
};
