<template>
    <div
        class="main-menu menu-fixed menu-accordion menu-shadow"
        :class="[
            {
                expanded:
                    !isVerticalMenuCollapsed ||
                    (isVerticalMenuCollapsed && isMouseHovered)
            },
            skin === 'semi-dark' ? 'menu-dark' : 'menu-light'
        ]"
        @mouseenter="updateMouseHovered(true)"
        @mouseleave="updateMouseHovered(false)"
    >
        <!-- main menu header-->
        <div class="navbar-header expanded">
            <slot
                name="header"
                :toggleVerticalMenuActive="toggleVerticalMenuActive"
                :toggleCollapsed="toggleCollapsed"
                :collapseTogglerIcon="collapseTogglerIcon"
            >
                <ul class="nav navbar-nav flex-row">
                    <!-- Logo & Text -->
                    <li class="nav-item mr-auto">
                        <b-link class="navbar-brand" to="/">
                            <span class="brand-logo">
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
                            </span>
                            <h2 class="brand-text">
                                {{ appName }}
                            </h2>
                        </b-link>
                    </li>

                    <!-- Toggler Button -->
                    <li class="nav-item nav-toggle">
                        <b-link class="nav-link modern-nav-toggle">
                            <feather-icon
                                icon="XIcon"
                                size="20"
                                class="d-block d-xl-none"
                                @click="toggleVerticalMenuActive"
                            />
                            <feather-icon
                                :icon="collapseTogglerIconFeather"
                                size="20"
                                class="d-none d-xl-block collapse-toggle-icon"
                                @click="toggleCollapsed"
                            />
                        </b-link>
                    </li>
                </ul>
            </slot>
        </div>
        <!-- / main menu header-->

        <!-- Shadow -->
        <div :class="{ 'd-block': shallShadowBottom }" class="shadow-bottom" />

        <!-- main menu content-->
        <vue-perfect-scrollbar
            :settings="perfectScrollbarSettings"
            class="main-menu-content scroll-area"
            tagname="ul"
            @ps-scroll-y="
                evt => {
                    shallShadowBottom = evt.srcElement.scrollTop > 0;
                }
            "
        >
            <vertical-nav-menu-items
                :items="navMenuItems"
                class="navigation navigation-main"
            />
        </vue-perfect-scrollbar>
        <!-- /main menu content-->
    </div>
</template>

<script>
import navMenuItems from "@/navigation/vertical";
import VuePerfectScrollbar from "vue-perfect-scrollbar";
import { BLink, BImg } from "bootstrap-vue";
import { provide, computed, ref } from "@vue/composition-api";
import useAppConfig from "@core/app-config/useAppConfig";
import { $themeConfig } from "@themeConfig";
import VerticalNavMenuItems from "./components/vertical-nav-menu-items/VerticalNavMenuItems.vue";
import useVerticalNavMenu from "./useVerticalNavMenu";

export default {
    components: {
        VuePerfectScrollbar,
        VerticalNavMenuItems,
        BLink,
        BImg
    },
    props: {
        isVerticalMenuActive: {
            type: Boolean,
            required: true
        },
        toggleVerticalMenuActive: {
            type: Function,
            required: true
        }
    },
    setup(props) {
        const {
            isMouseHovered,
            isVerticalMenuCollapsed,
            collapseTogglerIcon,
            toggleCollapsed,
            updateMouseHovered
        } = useVerticalNavMenu(props);

        const { skin } = useAppConfig();

        // Shadow bottom is UI specific and can be removed by user => It's not in `useVerticalNavMenu`
        const shallShadowBottom = ref(false);

        provide("isMouseHovered", isMouseHovered);

        const perfectScrollbarSettings = {
            maxScrollbarLength: 60,
            wheelPropagation: false
        };

        const collapseTogglerIconFeather = computed(() =>
            collapseTogglerIcon.value === "unpinned" ? "CircleIcon" : "DiscIcon"
        );

        // App Name
        const { appName, appLogoImage } = $themeConfig.app;

        return {
            navMenuItems,
            perfectScrollbarSettings,
            isVerticalMenuCollapsed,
            collapseTogglerIcon,
            toggleCollapsed,
            isMouseHovered,
            updateMouseHovered,
            collapseTogglerIconFeather,

            // Shadow Bottom
            shallShadowBottom,

            // Skin
            skin,

            // App Name
            appName,
            appLogoImage
        };
    }
};
</script>

<style lang="scss">
@import "~@core/scss/base/core/menu/menu-types/vertical-menu.scss";
</style>
