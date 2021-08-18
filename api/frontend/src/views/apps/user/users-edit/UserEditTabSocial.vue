<template>
    <b-form>
        <b-row>
            <b-col
                v-for="socialField in socialInputs"
                :key="socialField.dataField"
                cols="12"
                md="6"
                lg="4"
            >
                <b-form-group
                    :label="socialField.label"
                    :label-for="socialField.dataField"
                >
                    <b-input-group class="input-group-merge">
                        <b-input-group-prepend is-text>
                            <feather-icon size="16" :icon="socialField.icon" />
                        </b-input-group-prepend>
                        <b-form-input
                            :id="socialField.dataField"
                            v-model="userData[socialField.dataField]"
                            type="url"
                        />
                    </b-input-group>
                </b-form-group>
            </b-col>

            <b-col class="mt-2">
                <b-button
                    variant="primary"
                    class="mb-1 mb-sm-0 mr-0 mr-sm-1"
                    :block="$store.getters['app/currentBreakPoint'] === 'xs'"
                >
                    Save Changes
                </b-button>
                <b-button
                    variant="outline-secondary"
                    :block="$store.getters['app/currentBreakPoint'] === 'xs'"
                >
                    Reset
                </b-button>
            </b-col>
        </b-row>
    </b-form>
</template>

<script>
import {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BInputGroup,
    BInputGroupPrepend
} from "bootstrap-vue";

export default {
    components: {
        BRow,
        BCol,
        BForm,
        BFormGroup,
        BFormInput,
        BButton,
        BInputGroup,
        BInputGroupPrepend
    },
    props: {
        userData: {
            type: Object,
            required: true
        }
    },
    setup() {
        // ? dataField is field name of `userDataSocial` object
        const socialInputs = [
            {
                icon: "TwitterIcon",
                dataField: "twitter",
                label: "Twitter"
            },
            {
                icon: "OnlyFansIcon",
                dataField: "current",
                label: "OnlyFans"
            }
        ];

        return {
            socialInputs
        };
    }
};
</script>

<style></style>
