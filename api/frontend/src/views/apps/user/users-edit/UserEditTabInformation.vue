<template>
    <div>
        <!-- Header: Personal Info -->
        <div class="d-flex">
            <feather-icon icon="UserIcon" size="19" />
            <h4 class="mb-0 ml-50">
                Personal Information
            </h4>
        </div>

        <!-- Form: Personal Info Form -->
        <b-form class="mt-1">
            <b-row>
                <!-- Field: Birth Date -->
                <b-col cols="12" md="6" lg="4">
                    <b-form-group label="Birth Date" label-for="birth-date">
                        <flat-pickr
                            v-model="userData.birthday"
                            class="form-control"
                            :config="{ dateFormat: 'Y-m-d' }"
                            placeholder="YYYY-MM-DD"
                        />
                    </b-form-group>
                </b-col>

                <!-- Field: Gender -->
                <b-col cols="12" md="6" lg="4">
                    <b-form-group
                        label="Gender"
                        label-for="gender"
                        label-class="mb-1"
                    >
                        <b-form-radio-group
                            id="gender"
                            v-model="userData.gender"
                            :options="genderOptions"
                            value="male"
                        />
                    </b-form-group>
                </b-col>
            </b-row>

            <!-- Header: Personal Info -->
            <div class="d-flex mt-2">
                <feather-icon icon="MapPinIcon" size="19" />
                <h4 class="mb-0 ml-50">
                    Address
                </h4>
            </div>

            <!-- Form: Personal Info Form -->
            <b-row class="mt-1">
                <!-- Field: Country -->
                <b-col cols="12" md="6" lg="4">
                    <b-form-group label="Country" label-for="country">
                        <b-form-input
                            id="country"
                            v-model="userData.country"
                            placeholder="United States"
                        />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row class="mt-2">
                <b-col>
                    <b-button
                        variant="primary"
                        class="mb-1 mb-sm-0 mr-0 mr-sm-1"
                        :block="
                            $store.getters['app/currentBreakPoint'] === 'xs'
                        "
                    >
                        Save Changes
                    </b-button>
                    <b-button
                        variant="outline-secondary"
                        :block="
                            $store.getters['app/currentBreakPoint'] === 'xs'
                        "
                    >
                        Reset
                    </b-button>
                </b-col>
            </b-row>
        </b-form>
    </div>
</template>

<script>
import {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BFormRadioGroup,
    BFormCheckboxGroup,
    BButton
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import { ref } from "@vue/composition-api";
import vSelect from "vue-select";

export default {
    components: {
        BRow,
        BCol,
        BForm,
        BFormGroup,
        flatPickr,
        BFormInput,
        vSelect,
        BFormRadioGroup,
        BFormCheckboxGroup,
        BButton
    },
    props: {
        userData: {
            type: Object,
            required: true
        }
    },
    setup() {
        const genderOptions = [
            { text: "Male", value: "male" },
            { text: "Female", value: "female" },
            { text: "Trans", value: "trans" },
            { text: "Non-Binary", value: "no-binary" }
        ];

        return {
            genderOptions
        };
    }
};
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
