<template>
    <div>
        <user-list-add-new
            :is-add-new-user-sidebar-active.sync="isAddNewUserSidebarActive"
            @refetch-data="refetchData"
        />

        <!-- Filters -->
        <users-list-filters
            :role-filter.sync="roleFilter"
            :role-options="roleOptions"
        />

        <!-- Table Container Card -->
        <b-card no-body class="mb-0">
            <div class="m-2">
                <!-- Table Top -->
                <b-row>
                    <!-- Search -->
                    <b-col cols="12" md="6">
                        <div
                            class="d-flex align-items-center justify-content-end"
                        >
                            <b-form-input
                                v-model="searchQuery"
                                class="d-inline-block mr-1"
                                placeholder="Search..."
                            />
                        </div>
                    </b-col>
                    <b-col cols="12" md="6" class="d-flex justify-content-end">
                        <b-button
                            variant="primary"
                            @click="isAddNewUserSidebarActive = true"
                        >
                            <span class="text-nowrap">Add User</span>
                        </b-button>
                    </b-col>
                </b-row>
            </div>

            <b-table
                ref="refUserListTable"
                class="position-relative"
                :items="fetchUsers"
                responsive
                :fields="tableColumns"
                primary-key="id"
                :sort-by.sync="sortBy"
                show-empty
                empty-text="No matching records found"
                :sort-desc.sync="isSortDirDesc"
            >
                <!-- Column: User -->
                <template #cell(username)="data">
                    <b-media vertical-align="center">
                        <template #aside>
                            <b-avatar
                                size="32"
                                :src="data.item.avatar"
                                :text="avatarText(data.item.fullName)"
                                :variant="
                                    `light-${resolveUserRoleVariant(
                                        data.item.role
                                    )}`
                                "
                                :to="{
                                    name: 'apps-users-view',
                                    params: { id: data.item._id }
                                }"
                            />
                        </template>
                        <b-link
                            :to="{
                                name: 'apps-users-view',
                                params: { id: data.item._id }
                            }"
                            class="font-weight-bold d-block text-nowrap"
                        >
                            {{ data.item.name }}
                        </b-link>
                        <small class="text-muted"
                            >@{{ data.item.username }}</small
                        >
                    </b-media>
                </template>

                <!-- Column: Status -->
                <template #cell(status)="data">
                    <b-badge
                        pill
                        :variant="
                            `light-${resolveUserStatusVariant(
                                data.item.status
                            )}`
                        "
                        class="text-capitalize"
                    >
                        {{ data.item.status }}
                    </b-badge>
                </template>

                <!-- Column: Actions -->
                <template #cell(actions)="data">
                    <b-dropdown
                        variant="link"
                        no-caret
                        :right="$store.state.appConfig.isRTL"
                    >
                        <template #button-content>
                            <feather-icon
                                icon="MoreVerticalIcon"
                                size="16"
                                class="align-middle text-body"
                            />
                        </template>
                        <b-dropdown-item
                            :to="{
                                name: 'apps-users-view',
                                params: { id: data.item._id }
                            }"
                        >
                            <feather-icon icon="FileTextIcon" />
                            <span class="align-middle ml-50">Details</span>
                        </b-dropdown-item>

                        <b-dropdown-item
                            :to="{
                                name: 'apps-users-edit',
                                params: { id: data.item._id }
                            }"
                        >
                            <feather-icon icon="EditIcon" />
                            <span class="align-middle ml-50">Edit</span>
                        </b-dropdown-item>

                        <b-dropdown-item>
                            <feather-icon icon="TrashIcon" />
                            <span class="align-middle ml-50">Delete</span>
                        </b-dropdown-item>
                    </b-dropdown>
                </template>
            </b-table>
            <div class="mx-2 mb-2">
                <b-row>
                    <b-col
                        cols="12"
                        sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-start"
                    >
                        <span class="text-muted"
                            >Showing {{ dataMeta.from }} to {{ dataMeta.to }} of
                            {{ dataMeta.of }} entries</span
                        >
                    </b-col>
                    <!-- Pagination -->
                    <b-col
                        cols="12"
                        sm="6"
                        class="d-flex align-items-center justify-content-center justify-content-sm-end"
                    >
                        <b-pagination
                            v-model="currentPage"
                            :total-rows="totalUsers"
                            :per-page="perPage"
                            first-number
                            last-number
                            class="mb-0 mt-1 mt-sm-0"
                            prev-class="prev-item"
                            next-class="next-item"
                        >
                            <template #prev-text>
                                <feather-icon
                                    icon="ChevronLeftIcon"
                                    size="18"
                                />
                            </template>
                            <template #next-text>
                                <feather-icon
                                    icon="ChevronRightIcon"
                                    size="18"
                                />
                            </template>
                        </b-pagination>
                    </b-col>
                </b-row>
            </div>
        </b-card>
    </div>
</template>

<script>
import {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination
} from "bootstrap-vue";
import vSelect from "vue-select";
import store from "@/store";
import { ref, onUnmounted } from "@vue/composition-api";
import { avatarText } from "@core/utils/filter";
import UsersListFilters from "./UsersListFilters.vue";
import useUsersList from "./useUsersList";
import userStoreModule from "../userStoreModule";
import UserListAddNew from "./UserListAddNew.vue";

export default {
    components: {
        UsersListFilters,
        UserListAddNew,

        BCard,
        BRow,
        BCol,
        BFormInput,
        BButton,
        BTable,
        BMedia,
        BAvatar,
        BLink,
        BBadge,
        BDropdown,
        BDropdownItem,
        BPagination,

        vSelect
    },
    setup() {
        const USER_APP_STORE_MODULE_NAME = "app-user";

        // Register module
        if (!store.hasModule(USER_APP_STORE_MODULE_NAME))
            store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule);

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(USER_APP_STORE_MODULE_NAME))
                store.unregisterModule(USER_APP_STORE_MODULE_NAME);
        });

        const isAddNewUserSidebarActive = ref(false);

        const roleOptions = [
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
            { label: "Content Creator", value: "creator" },
            { label: "Metamask", value: "metamask" }
        ];

        const {
            fetchUsers,
            tableColumns,
            perPage,
            currentPage,
            totalUsers,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refUserListTable,
            refetchData,

            // UI
            resolveUserRoleVariant,
            resolveUserRoleIcon,
            resolveUserStatusVariant,

            // Extra Filters
            roleFilter
        } = useUsersList();

        return {
            // Sidebar
            isAddNewUserSidebarActive,

            fetchUsers,
            tableColumns,
            perPage,
            currentPage,
            totalUsers,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refUserListTable,
            refetchData,

            // Filter
            avatarText,

            // UI
            resolveUserRoleVariant,
            resolveUserRoleIcon,
            resolveUserStatusVariant,

            roleOptions,

            // Extra Filters
            roleFilter
        };
    }
};
</script>

<style lang="scss" scoped>
.per-page-selector {
    width: 90px;
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
