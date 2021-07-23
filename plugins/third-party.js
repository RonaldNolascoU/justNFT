import Vue from 'vue'
import VTooltip from 'v-tooltip'
import VueDatePicker from '@mathieustan/vue-datepicker'
import vueFilePond from 'vue-filepond'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

// Styles
import '@mathieustan/vue-datepicker/dist/vue-datepicker.min.css'
import 'filepond/dist/filepond.min.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css'

// End Styles

// Install required rule.
extend('required', { ...required, message: '{_field_} is required' })

// Install email rule.
extend('email', email)

const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
)

Vue.component(FilePond)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.use(VTooltip).use(VueDatePicker)
