<template>
    <div>
        <b-card>
            <b-row>
                <!-- User Info: Left col -->
                <b-col
                    cols="21"
                    xl="6"
                    class="d-flex justify-content-between flex-column"
                >
                    <!-- User Avatar & Action Buttons -->
                    <div class="d-flex justify-content-start">
                        <b-avatar
                            :src="
                                'https://d8v7xo28xqxp.cloudfront.net/' +
                                    userData.profile_img
                            "
                            :text="avatarText(userData.fullName)"
                            :variant="
                                `light-${resolveUserRoleVariant(userData.role)}`
                            "
                            size="104px"
                            rounded
                        />
                        <div class="d-flex flex-column ml-1">
                            <div class="mb-1">
                                <h4 class="mb-0">
                                    {{ userData.name }}
                                </h4>
                                <span class="card-text">{{
                                    userData.email
                                }}</span>
                            </div>
                            <div class="d-flex flex-wrap">
                                <b-button
                                    :to="{
                                        name: 'apps-users-edit',
                                        params: { id: userData._id }
                                    }"
                                    variant="primary"
                                >
                                    Edit
                                </b-button>
                                <b-button
                                    variant="outline-danger"
                                    class="ml-1"
                                    v-b-modal.modal-no-backdrop
                                >
                                    Delete
                                </b-button>
                                <b-button
                                    variant="success"
                                    class="ml-1"
                                    v-if="
                                        userData.creator_request_sent &&
                                            !approved
                                    "
                                    @click="approveContentCreator"
                                >
                                    Approve
                                </b-button>
                                <b-button
                                    variant="danger"
                                    class="ml-1"
                                    v-if="
                                        userData.creator_request_sent &&
                                            approved
                                    "
                                    @click="rejectContentCreator"
                                >
                                    Reject
                                </b-button>
                            </div>
                        </div>
                    </div>

                    <!-- User Stats -->
                    <div class="d-flex align-items-center mt-2">
                        <div class="d-flex align-items-center mr-2">
                            <b-avatar variant="light-primary" rounded>
                                <feather-icon icon="DollarSignIcon" size="18" />
                            </b-avatar>
                            <div class="ml-1">
                                <h5 class="mb-0">
                                    23.3k
                                </h5>
                                <small>Monthly Sales</small>
                            </div>
                        </div>

                        <div class="d-flex align-items-center">
                            <b-avatar variant="light-success" rounded>
                                <feather-icon icon="TrendingUpIcon" size="18" />
                            </b-avatar>
                            <div class="ml-1">
                                <h5 class="mb-0">
                                    $99.87k
                                </h5>
                                <small>Annual Profit</small>
                            </div>
                        </div>
                    </div>
                </b-col>

                <!-- Right Col: Table -->
                <b-col cols="12" xl="6">
                    <table class="mt-2 mt-xl-0 w-100">
                        <tr v-if="userData.role_id == 2">
                            <th class="pb-50">
                                <feather-icon icon="UserIcon" class="mr-75" />
                                <span class="font-weight-bold">Username</span>
                            </th>
                            <td class="pb-50">
                                {{ userData.username }}
                            </td>
                        </tr>
                        <tr>
                            <th class="pb-50">
                                <feather-icon icon="StarIcon" class="mr-75" />
                                <span class="font-weight-bold">Role</span>
                            </th>
                            <td class="pb-50 text-capitalize">
                                {{ getUserRole(userData.role_id) }}
                            </td>
                        </tr>
                        <tr v-if="userData.role_id == 2">
                            <th class="pb-50">
                                <feather-icon icon="FlagIcon" class="mr-75" />
                                <span class="font-weight-bold">Country</span>
                            </th>
                            <td class="pb-50">
                                {{ userData.country }}
                            </td>
                        </tr>
                        <tr v-if="userData.role_id == 2">
                            <th>
                                <feather-icon icon="PhoneIcon" class="mr-75" />
                                <span class="font-weight-bold"
                                    >Subscription Rate</span
                                >
                            </th>
                            <td>{{ userData.rate || 0 }} $JUST</td>
                        </tr>
                        <tr>
                            <th>
                                <feather-icon
                                    icon="CreditCardIcon"
                                    class="mr-75"
                                />
                                <span class="font-weight-bold"
                                    >Wallet Address</span
                                >
                            </th>
                            <td>
                                {{ userData.wallet_address }}
                            </td>
                        </tr>
                    </table>
                </b-col>
            </b-row>
        </b-card>
        <b-card>
            <b-card-text>
                IDs
            </b-card-text>
            <b-row>
                <!-- User Info: Left col -->
                <b-col
                    cols="21"
                    xl="6"
                    class="d-flex justify-content-between flex-column"
                >
                    <!-- User Avatar & Action Buttons -->
                    <div class="d-flex justify-content-start">
                        <b-img-lazy
                            thumbnail
                            fluid
                            :src="
                                'https://d8v7xo28xqxp.cloudfront.net/' +
                                    userData.id_img_1
                            "
                            :text="avatarText(userData.name)"
                            style="width:30%; height:200px"
                        ></b-img-lazy>
                        <div class="d-flex flex-column ml-1">
                            <div class="mb-1">
                                <h4 class="mb-0">
                                    Front ID
                                </h4>
                            </div>
                        </div>
                    </div>
                </b-col>
                <b-col
                    cols="21"
                    xl="6"
                    class="d-flex justify-content-between flex-column"
                >
                    <!-- User Avatar & Action Buttons -->
                    <div class="d-flex justify-content-start">
                        <b-img-lazy
                            thumbnail
                            fluid
                            :src="
                                'https://d8v7xo28xqxp.cloudfront.net/' +
                                    userData.id_img_2
                            "
                            :text="avatarText(userData.name)"
                            style="width:30%; height:200px;"
                        ></b-img-lazy>
                        <div class="d-flex flex-column ml-1">
                            <div class="mb-1">
                                <h4 class="mb-0">
                                    Back ID
                                </h4>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>
        </b-card>
        <b-modal
            id="modal-no-backdrop"
            no-close-on-backdrop
            content-class="shadow"
            :title="`Warning`"
            ok-title="Yes, delete"
            @ok="deleteUser"
        >
            <b-card-text>
                Are you sure you want to delete this user?
            </b-card-text>
        </b-modal>
    </div>
</template>

<script>
import {
    BCard,
    BButton,
    BAvatar,
    BRow,
    BCol,
    BCardText,
    BImgLazy
} from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import useUsersList from "../users-list/useUsersList";
import store from "@/store";
import router from "@/router";
import { useToast } from "vue-toastification/composition";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
    components: {
        BCard,
        BButton,
        BRow,
        BCol,
        BAvatar,
        BCardText,
        BImgLazy
    },
    props: {
        userData: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            approved: false
        };
    },
    setup() {
        const { resolveUserRoleVariant } = useUsersList();
        const toast = useToast();

        return {
            avatarText,
            resolveUserRoleVariant,
            toast
        };
    },
    mounted() {
        this.approved = this.userData.approved;
    },
    methods: {
        deleteUser() {
            store
                .dispatch(`app-user/deleteUser`, {
                    id: this.userData._id
                })
                .then(response => {
                    const { user, success } = response.data;
                    if (success) {
                        this.showToast("Deleted", "CheckIcon", "success");
                        this.$router.push("/");
                    } else {
                        this.showToast("Error", "AlertTriangleIcon", "danger");
                    }
                })
                .catch(error => {
                    this.showToast("Error", "AlertTriangleIcon", "danger");
                });
        },
        getUserRole(id) {
            switch (id) {
                case 0:
                    return "Admin";
                    break;
                case 1:
                    return "User";
                    break;
                case 2:
                    return "Content Creator";
                    break;
                case 3:
                    return "Metamask";
                    break;
            }
        },
        showToast(title, icon, variant) {
            this.toast({
                component: ToastificationContent,
                props: {
                    title,
                    icon,
                    variant
                }
            });
        },
        approveContentCreator() {
            store
                .dispatch(`app-user/approveCreator`, {
                    id: router.currentRoute.params.id
                })
                .then(response => {
                    const { user, success } = response.data;
                    if (success) {
                        this.showToast("Approved", "CheckIcon", "success");
                        this.approved = true;
                    } else {
                        this.showToast("Error", "AlertTriangleIcon", "danger");
                        this.approved = true;
                    }
                })
                .catch(error => {
                    this.showToast("Error", "AlertTriangleIcon", "danger");
                    this.approved = true;
                });
        },
        rejectContentCreator() {
            store
                .dispatch(`app-user/rejectCreator`, {
                    id: router.currentRoute.params.id
                })
                .then(response => {
                    const { user, success } = response.data;
                    if (success) {
                        this.showToast("Rejected", "CheckIcon", "success");
                        this.approved = false;
                    } else {
                        this.showToast("Error", "AlertTriangleIcon", "danger");
                        this.approved = false;
                    }
                })
                .catch(error => {
                    this.showToast("Error", "AlertTriangleIcon", "danger");
                    this.approved = false;
                });
        }
    }
};
</script>

<style></style>
