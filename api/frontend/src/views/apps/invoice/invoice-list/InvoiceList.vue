<template>
    <!-- Table Container Card -->
    <b-card no-body>
        <div class="m-2">
            <!-- Table Top -->
            <b-row>
                <!-- Search -->
                <b-col cols="12" md="6">
                    <div class="d-flex align-items-center justify-content-end">
                        <b-form-input
                            v-model="searchQuery"
                            class="d-inline-block mr-1"
                            placeholder="Search..."
                        />
                    </div>
                </b-col>
            </b-row>
        </div>

        <b-table
            ref="refInvoiceListTable"
            :items="fetchInvoices"
            responsive
            :fields="tableColumns"
            primary-key="id"
            :sort-by.sync="sortBy"
            show-empty
            empty-text="No matching records found"
            :sort-desc.sync="isSortDirDesc"
            class="position-relative"
        >
            <template #head(invoiceStatus)>
                <feather-icon icon="TrendingUpIcon" class="mx-auto" />
            </template>

            <!-- Column: Id -->
            <template #cell(id)="data">
                <b-link
                    :to="{
                        name: 'apps-invoice-preview',
                        params: { id: data.item.id }
                    }"
                    class="font-weight-bold"
                >
                    #{{ data.value }}
                </b-link>
            </template>

            <!-- Column: Invoice Status -->
            <template #cell(invoiceStatus)="data">
                <b-avatar
                    :id="`invoice-row-${data.item.id}`"
                    size="32"
                    :variant="
                        `light-${
                            resolveInvoiceStatusVariantAndIcon(
                                data.item.invoiceStatus
                            ).variant
                        }`
                    "
                >
                    <feather-icon
                        :icon="
                            resolveInvoiceStatusVariantAndIcon(
                                data.item.invoiceStatus
                            ).icon
                        "
                    />
                </b-avatar>
                <b-tooltip
                    :target="`invoice-row-${data.item.id}`"
                    placement="top"
                >
                    <p class="mb-0">
                        {{ data.item.invoiceStatus }}
                    </p>
                    <p class="mb-0">Balance: {{ data.item.balance }}</p>
                    <p class="mb-0">Due Date: {{ data.item.dueDate }}</p>
                </b-tooltip>
            </template>

            <!-- Column: Issued Date -->
            <template #cell(issuedDate)="data">
                <span class="text-nowrap">
                    {{ data.value }}
                </span>
            </template>

            <!-- Column: Balance -->
            <template #cell(balance)="data">
                <template v-if="data.value === 0">
                    <b-badge pill variant="light-success">
                        Paid
                    </b-badge>
                </template>
                <template v-else>
                    {{ data.value }}
                </template>
            </template>

            <!-- Column: Actions -->
            <template #cell(actions)="data">
                <div class="text-nowrap">
                    <feather-icon
                        :id="`invoice-row-${data.item.id}-preview-icon`"
                        icon="EyeIcon"
                        size="16"
                        class="mx-1"
                        @click="
                            $router.push({
                                name: 'apps-invoice-preview',
                                params: { id: data.item.id }
                            })
                        "
                    />
                    <b-tooltip
                        title="View Transaction In FTM"
                        :target="`invoice-row-${data.item.id}-preview-icon`"
                    />
                </div>
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
                        :total-rows="totalInvoices"
                        :per-page="perPage"
                        first-number
                        last-number
                        class="mb-0 mt-1 mt-sm-0"
                        prev-class="prev-item"
                        next-class="next-item"
                    >
                        <template #prev-text>
                            <feather-icon icon="ChevronLeftIcon" size="18" />
                        </template>
                        <template #next-text>
                            <feather-icon icon="ChevronRightIcon" size="18" />
                        </template>
                    </b-pagination>
                </b-col>
            </b-row>
        </div>
    </b-card>
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
    BPagination,
    BTooltip
} from "bootstrap-vue";
import { avatarText } from "@core/utils/filter";
import vSelect from "vue-select";
import { onUnmounted } from "@vue/composition-api";
import store from "@/store";
import useInvoicesList from "./useInvoiceList";

import invoiceStoreModule from "../invoiceStoreModule";

export default {
    components: {
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
        BTooltip,

        vSelect
    },
    setup() {
        const INVOICE_APP_STORE_MODULE_NAME = "app-invoice";

        // Register module
        if (!store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
            store.registerModule(
                INVOICE_APP_STORE_MODULE_NAME,
                invoiceStoreModule
            );

        // UnRegister on leave
        onUnmounted(() => {
            if (store.hasModule(INVOICE_APP_STORE_MODULE_NAME))
                store.unregisterModule(INVOICE_APP_STORE_MODULE_NAME);
        });

        const statusOptions = [
            "Downloaded",
            "Draft",
            "Paid",
            "Partial Payment",
            "Past Due"
        ];

        const {
            fetchInvoices,
            tableColumns,
            perPage,
            currentPage,
            totalInvoices,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refInvoiceListTable,

            statusFilter,

            refetchData,

            resolveInvoiceStatusVariantAndIcon,
            resolveClientAvatarVariant
        } = useInvoicesList();

        return {
            fetchInvoices,
            tableColumns,
            perPage,
            currentPage,
            totalInvoices,
            dataMeta,
            perPageOptions,
            searchQuery,
            sortBy,
            isSortDirDesc,
            refInvoiceListTable,

            statusFilter,

            refetchData,

            statusOptions,

            avatarText,
            resolveInvoiceStatusVariantAndIcon,
            resolveClientAvatarVariant
        };
    }
};
</script>

<style lang="scss" scoped>
.per-page-selector {
    width: 90px;
}

.invoice-filter-select {
    min-width: 190px;

    ::v-deep .vs__selected-options {
        flex-wrap: nowrap;
    }

    ::v-deep .vs__selected {
        width: 100px;
    }
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
