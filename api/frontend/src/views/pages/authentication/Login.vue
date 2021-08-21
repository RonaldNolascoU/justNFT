<template>
    <div class="auth-wrapper auth-v2">
        <b-row class="auth-inner m-0">
            <!-- Brand logo-->
            <b-link class="brand-logo">
                <svg
                    width="68"
                    height="30"
                    viewBox="0 0 68 51"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M3.39062 -0.000976562H39.6581L21.5244 30.146L3.39062 -0.000976562Z"
                        fill="#233D9B"
                    />
                    <path
                        d="M38.5364 50.9997H20.1763L49.622 -0.000976562H67.9821L38.5364 50.9997Z"
                        fill="#D64973"
                    />
                    <path
                        d="M0 34.9062H18.5636L10.487 48.2717C9.98389 49.1043 9.27439 49.7929 8.42714 50.2708C7.57989 50.7488 6.62361 50.9999 5.65085 50.9998C4.15215 50.9998 2.71484 50.4045 1.6551 49.3447C0.595356 48.285 0 46.8477 0 45.349V34.9062Z"
                        fill="#D64973"
                    />
                </svg>
                <h2 class="brand-text text-primary ml-1">
                    Just Yours
                </h2>
            </b-link>
            <!-- /Brand logo-->

            <!-- Left Text-->
            <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
                <div
                    class="w-100 d-lg-flex align-items-center justify-content-center px-5"
                >
                    <b-img fluid :src="imgUrl" alt="Login V2" />
                </div>
            </b-col>
            <!-- /Left Text-->

            <!-- Login-->
            <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
                <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
                    <b-card-title class="mb-1 font-weight-bold" title-tag="h2">
                        Welcome to Just Yours! 👋
                    </b-card-title>
                    <b-card-text class="mb-2">
                        Please sign-in to your account
                    </b-card-text>

                    <!-- form -->
                    <validation-observer ref="loginForm" #default="{invalid}">
                        <b-form
                            class="auth-login-form mt-2"
                            @submit.prevent="login"
                        >
                            <!-- email -->
                            <b-form-group label="Email" label-for="login-email">
                                <validation-provider
                                    #default="{ errors }"
                                    name="Email"
                                    vid="email"
                                    rules="required|email"
                                >
                                    <b-form-input
                                        id="login-email"
                                        v-model="userEmail"
                                        :state="
                                            errors.length > 0 ? false : null
                                        "
                                        name="login-email"
                                        placeholder="john@example.com"
                                    />
                                    <small class="text-danger">{{
                                        errors[0]
                                    }}</small>
                                </validation-provider>
                            </b-form-group>

                            <!-- checkbox -->
                            <b-form-group>
                                <b-form-checkbox
                                    id="remember-me"
                                    v-model="status"
                                    name="checkbox-1"
                                >
                                    Remember Me
                                </b-form-checkbox>
                            </b-form-group>

                            <!-- submit buttons -->
                            <b-button
                                type="submit"
                                variant="primary"
                                block
                                :disabled="invalid"
                            >
                                Sign in
                            </b-button>
                        </b-form>
                    </validation-observer>
                </b-col>
            </b-col>
            <!-- /Login-->
        </b-row>
    </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BAlert,
    VBTooltip
} from "bootstrap-vue";
import useJwt from "@/auth/jwt/useJwt";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import { getHomeRouteForLoggedInUser } from "@/auth/utils";

import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";

export default {
    directives: {
        "b-tooltip": VBTooltip
    },
    components: {
        BRow,
        BCol,
        BLink,
        BFormGroup,
        BFormInput,
        BInputGroupAppend,
        BInputGroup,
        BFormCheckbox,
        BCardText,
        BCardTitle,
        BImg,
        BForm,
        BButton,
        BAlert,
        VuexyLogo,
        ValidationProvider,
        ValidationObserver
    },
    mixins: [togglePasswordVisibility],
    data() {
        return {
            status: "",
            password: null,
            userEmail: null,
            sideImg: require("@/assets/images/pages/login-v2.svg"),

            // validation rules
            required,
            email
        };
    },
    computed: {
        passwordToggleIcon() {
            return this.passwordFieldType === "password"
                ? "EyeIcon"
                : "EyeOffIcon";
        },
        imgUrl() {
            if (store.state.appConfig.layout.skin === "dark") {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
                return this.sideImg;
            }
            return this.sideImg;
        }
    },
    methods: {
        login() {
            this.$refs.loginForm.validate().then(success => {
                if (success) {
                    useJwt
                        .login({
                            email: this.userEmail,
                            password: this.password
                        })
                        .then(response => {
                            const { user, token, success } = response.data;
                            console.log(user, "data");
                            if (user && user.role_id != 0) return;

                            useJwt.setToken(token);
                            useJwt.setRefreshToken(token);
                            localStorage.setItem(
                                "userData",
                                JSON.stringify({
                                    ...user,
                                    ability: [
                                        { action: "manage", subject: "all" }
                                    ]
                                })
                            );
                            this.$ability.update([
                                {
                                    action: "manage",
                                    subject: "all"
                                }
                            ]);

                            // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
                            this.$router
                                .replace(getHomeRouteForLoggedInUser("admin"))
                                .then(() => {
                                    this.$toast({
                                        component: ToastificationContent,
                                        position: "top-right",
                                        props: {
                                            title: `Welcome Admin`,
                                            icon: "CoffeeIcon",
                                            variant: "success",
                                            text: `You have successfully logged in!`
                                        }
                                    });
                                });
                        })
                        .catch(error => {
                            this.$refs.loginForm.setErrors(
                                error.response.data.error
                            );
                        });
                }
            });
        }
    }
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
