<template>
	<b-container fluid>

			<b-alert
				:show="dismissCountDown"
				variant="success"
				dismissible
				class="mt-3"
				@dismiss-count-down="countDownChanged">
				{{ feedbackMessage }}
			</b-alert>

		<b-row class="mt-5">
			<b-col md="6" class="my-1">
				<b-form-group label-cols-sm="3" label="Filter" class="mb-0">
					<b-input-group>
						<b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
						<b-input-group-append>
							<b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
						</b-input-group-append>
					</b-input-group>
				</b-form-group>
			</b-col>

			<b-col md="6" class="my-1">
				<b-form-group label-cols-sm="3" label="Per page" class="mb-0">
					<b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
				</b-form-group>
			</b-col>
		</b-row>

		<b-row>
			<b-col md="6" class="my-1">
				<b-form-group label-cols-sm="3" label="Page" class="mb-0">
					<b-pagination
						v-model="currentPage"
						:total-rows="totalRows"
						:per-page="perPage"
						class="my-0"
					></b-pagination>
				</b-form-group>
			</b-col>

			<b-col md="6" class="my-1">
				<b-form-group label-cols-sm="3" label="Insert record" class="mb-0">
					<b-button class="mr-1 mb-3" variant="success" @click="createButton($event.target)">
						Create
					</b-button>
				</b-form-group>
			</b-col>
		</b-row>

		<b-row align-h="center" class="mx-0">
			<b-row class="stacked-responsive-table">
				<b-table
					striped
					hover
					bordered
					show-empty
					small
					caption-top
					stacked="md"
					class="table-packed mb-5"
					:items="items"
					:current-page="currentPage"
					:per-page="perPage"
					:filter="filter"
					:sort-by.sync="sortBy"
					:sort-direction="sortDirection"
					:fields="fields"
					@filtered="onFiltered">

					<template slot="table-caption">{{ pageTitle }}</template>

					<template slot="actions" slot-scope="row">
						<b-button size="sm" class="mr-1" variant="warning" @click="editButton(row.item, row.index, $event.target)">
							Edit
						</b-button>
						<b-button size="sm" class="mr-1" variant="info" @click="copyButton(row.item, row.index, $event.target)">
							Copy
						</b-button>
						<b-button size="sm" class="mr-1" variant="danger" @click="deleteButton(row.item, row.index, $event.target)">
							Delete
						</b-button>
					</template>

				</b-table>
			</b-row>
		</b-row>

		<b-modal
			:id="editModal.id"
			v-model="editShow"
			:title="editModal.title"
			size="lg"
			ok-variant="success"
			ok-title="Save"
			@ok="editEvent"
			@cancel="editCancel">
			<b-alert v-model="editAlert" variant="danger" dismissible>
				{{ feedbackMessage }}
			</b-alert>
			<b-form-group v-for="field in editFields" :key="field.key" label-cols-sm="3" :label="titleCase(field.key)" class="mb-3">
					<b-input-group>
						<b-form-input v-if="isPassword(field)" v-model="field.value" type="password"></b-form-input>
						<b-form-input v-else v-model="field.value"></b-form-input>
						<b-input-group-append v-if="field.list">
							<b-form-select
								id="inline-form-custom-select-pref"
								v-model="field.list_mode"
								class="mb-2 mr-sm-2 mb-sm-0"
								:options="['Set', 'Push', 'Push Unique']"
							></b-form-select>
						</b-input-group-append>
					</b-input-group>
			</b-form-group>
		</b-modal>

		<b-modal
			:id="createModal.id"
			v-model="createShow"
			:title="createModal.title"
			size="lg"
			ok-variant="success"
			ok-title="Save"
			@ok="createEvent"
			@cancel="createCancel">
			<b-alert v-model="createAlert" variant="danger" dismissible>
				{{ feedbackMessage }}
			</b-alert>
			<b-form-group v-for="field in createFields" :key="field.key" label-cols-sm="3" :label="titleCase(field.key)" class="mb-3">
					<b-form-input v-if="isPassword(field)" v-model="field.value" type="password"></b-form-input>
					<b-form-input v-else v-model="field.value"></b-form-input>
			</b-form-group>
		</b-modal>

		<b-modal
			:id="deleteModal.id"
			v-model="deleteShow"
			:title="deleteModal.title"
			size="lg"
			ok-variant="danger"
			ok-title="Delete"
			@ok="deleteEvent"
			@cancel="deleteCancel">
			<b-alert v-model="deleteAlert" variant="danger" dismissible>
				{{ feedbackMessage }}
			</b-alert>
			<strong>Are you sure you want to delete the following record?</strong>
			<pre>{{ deleteModal.content }}</pre>
		</b-modal>

	</b-container>
</template>

<script>

import format from 'date-fns/format'
import { startCase, camelCase } from 'lodash'
import { apiReq } from '~/plugins/misc-functions'

export default {
	middleware: ['authToken'],

	data () {
		return {
			items: [],
			feedbackMessage: '',
			editAlert: false,
			createAlert: false,
			deleteAlert: false,
			dismissSecs: 3,
			dismissCountDown: 0,
			editShow: false,
			createShow: false,
			deleteShow: false,
			totalRows: 1,
			currentPage: 1,
			perPage: 5,
			pageOptions: [5, 10, 25, 50, 100],
			sortBy: null,
			sortDirection: 'asc',
			filter: null,
			fields: [],
			editFields: [],
			createFields: [],
			primary_key: null,
			primaryValTemp: '',
			primary_val: '',
			listKeys: [],
			allKeys: [],
			pageTitle: '',
			editModal: {
				id: 'edit-modal',
				title: '',
			},
			createModal: {
				id: 'create-modal',
				title: '',
			},
			deleteModal: {
				id: 'delete-modal',
				title: '',
				content: ''
			}
		}
	},
	async mounted() {
		await this.getAttributes();
		await this.apiReset();
	},
	methods: {
		async getAttributes() {
			const apiReqCnst = await apiReq(this, `${this.$route.query.model}/schema`)
			this.primary_key = apiReqCnst.response.primary_key
			this.listKeys = apiReqCnst.response.list_fields
			this.allKeys = apiReqCnst.response.schema
			this.pageTitle = this.titleCase(this.$route.query.model)
		},
		async apiReset() {

			this.fields = [];
			this.editFields = [];
			this.createFields = [];

			const items = await apiReq(this, `${this.$route.query.model}/get_all`)

			if (items.status === 'ok') {

				const deleteKeys = ['_id', 'uid', '__v']

				for (const key of deleteKeys) {
					const delIndex = this.allKeys.indexOf(key)
					if (delIndex >= 0) {
						this.allKeys.splice(this.allKeys.indexOf(key), 1)
					}
				}

				for (let i = items.response.length - 1; i >= 0; i--) {
					for (const key of [...this.allKeys, ...deleteKeys]) {
						if (this.listKeys.includes(key)) {
							items.response[i][key] = items.response[i][key].toString();
						}
						if (deleteKeys.includes(key)) {
							delete items.response[i][key];
						}
					}
					items.response[i].createdAt = format(items.response[i].createdAt, 'YYYY/MM/DD HH:mm:ss');
					items.response[i].updatedAt = format(items.response[i].updatedAt, 'YYYY/MM/DD HH:mm:ss');
				}

				this.items = items.response;
				this.totalRows = this.items.length;

				for (const key of this.allKeys) {
					this.fields.push({ key, "sortable": true });
					if (!['createdAt', 'updatedAt'].includes(key)) {

						const fieldsDict = { key, "value": '', "list_mode": 'Set' };
						if (this.listKeys.includes(key)) {
							fieldsDict.list = true;
						}
						else {
							fieldsDict.list = false;
						}
						if (key === this.primary_key) {
							fieldsDict.primary = true;
						}
						else {
							fieldsDict.primary = false
						}
						this.editFields.push(fieldsDict);
						this.createFields.push(fieldsDict);
					}
				}
				if (this.fields.length > 0) {
					this.fields.push({ key: "actions", sortable: false });
				}

			}
			else {

				if (items.response.message != null && items.response.message !== '') {
					this.errorMessage = items.response.message;
				}
				else {
					this.errorMessage = 'Could not fetch table data.'
				}
				this.showAlert = true;
			}
		},
		onFiltered(filteredItems) {
			this.totalRows = filteredItems.length
			this.currentPage = 1
		},
		editButton(item, index, button) {
			this.editModal.title = `Edit row ${index}`
			this.populateForms(item, this.editFields)
			this.$root.$emit('bv::show::modal', this.editModal.id, button)
			for (let i = 0; i <= this.editFields.length - 1; i++) {
				if (this.editFields[i].key === this.primary_key) {
					this.primaryValTemp = this.editFields[i].value
				}
			}
		},
		copyButton(item, index, button) {
			this.createModal.title = `Copy row ${index}`
			this.populateForms(item, this.createFields)
			this.$root.$emit('bv::show::modal', this.createModal.id, button)
		},
		createButton(button) {
			this.createModal.title = 'Create a new record'
			this.$root.$emit('bv::show::modal', this.createModal.id, button)
		},
		deleteButton(item, index, button) {
			this.deleteModal.title = `Delete row ${index}?`
			this.deleteModal.content = JSON.stringify(item, null, 2)
			this.$root.$emit('bv::show::modal', this.deleteModal.id, button)
			this.primary_val = item[this.primary_key]
		},
		resetModal(modal) {
			modal.title = ''
			modal.content = ''
			this.primary_val = ''
			this.editAlert = this.createAlert = this.deleteAlert = false
		},
		resetFormModal(modal, modalFields) {
			modal.title = ''
			for (let i = modalFields.length - 1; i >= 0; i--) {
				modalFields[i].value = '';
				modalFields[i].list_mode = 'Set';
			}
			this.editAlert = this.createAlert = this.deleteAlert = false
		},
		populateForms(item, modalFields) {
			const itemKeys = Object.keys(item);
			for (const itemKey of itemKeys) {
				for (let i = modalFields.length - 1; i >= 0; i--) {
					if (modalFields[i].key === itemKey) {
						modalFields[i].value = item[itemKey];
					}
				}
			}
		},
		titleCase(string) {
			return startCase(camelCase(string));
		},
		isPassword(field) {
			return (field.key === 'password')
		},
		countDownChanged(dismissCountDown) {
			this.dismissCountDown = dismissCountDown
		},
		createCancel(evt) {
			evt.preventDefault()
			this.createShow = false
			this.createAlert = false
			this.resetFormModal(this.createModal, this.createFields)
		},
		editCancel(evt) {
			evt.preventDefault()
			this.editShow = false
			this.editAlert = false
			this.resetFormModal(this.editModal, this.editFields)
			this.primaryValTemp = ''
		},
		deleteCancel(evt) {
			evt.preventDefault()
			this.deleteShow = false
			this.deleteAlert = false
			this.resetModal(this.deleteModal)
		},
		async createEvent(evt) {
			evt.preventDefault()
			const createDict = {}
			for (let i = this.createFields.length - 1; i >= 0; i--) {
				if (this.createFields[i].value !== '') {
					createDict[this.createFields[i].key] = this.createFields[i].value;
				}
			}
			if (Object.keys(createDict).length > 0) {
				const apiReqCnst = await apiReq(this, `${this.$route.query.model}/insert`, createDict)
				if (apiReqCnst.status === 'error') {
					if (apiReqCnst.response.message != null && apiReqCnst.response.message !== '') {
						this.feedbackMessage = apiReqCnst.response.message
					}
					else {
						this.feedbackMessage = apiReqCnst.response.errmsg
					}
					this.createAlert = true
				}
				else if (apiReqCnst.status === 'ok') {
					await this.apiReset()
					this.createShow = false
					this.createAlert = false
					this.resetFormModal(this.createModal, this.createFields)
					this.feedbackMessage = 'Record created successfully'
					this.dismissCountDown = this.dismissSecs
				}
			}
		},
		async editEvent(evt) {
			evt.preventDefault()
			const editDict = {}
			const pushList = []
			const pushuniqueList = []
			const setList = []
			editDict[this.primary_key] = this.primaryValTemp

			for (let i = this.editFields.length - 1; i >= 0; i--) {
				if (this.editFields[i].value !== '') {
					if (!this.editFields[i].list) {
						if (this.editFields[i].key !== this.primary_key) {
							editDict[this.editFields[i].key] = this.editFields[i].value;
						}
						else if (this.editFields[i].key === this.primary_key) {
							editDict.update_primary = this.editFields[i].value
						}
					}
					else if (this.editFields[i].list_mode === 'Set') {
							setList.push({ [this.editFields[i].key]: this.editFields[i].value })
						}
						else if (this.editFields[i].list_mode === 'Push') {
							pushList.push({ [this.editFields[i].key]: this.editFields[i].value })
						}
						else if (this.editFields[i].list_mode === 'Push Unique') {
							pushuniqueList.push({ [this.editFields[i].key]: this.editFields[i].value })
						}
				}
			}

			const actions = []
			if (Object.keys(editDict).length > 0) {
				actions.push({ action: 'update', dict: editDict })
			}
			for (let i = pushList.length - 1; i >= 0; i--) {
				pushList[i][this.primary_key] = editDict.update_primary
				actions.push({ action: 'push', dict: pushList[i] })
			}
			for (let i = pushuniqueList.length - 1; i >= 0; i--) {
				pushuniqueList[i][this.primary_key] = editDict.update_primary
				actions.push({ action: 'push_unique', dict: pushuniqueList[i] })
			}
			for (let i = setList.length - 1; i >= 0; i--) {
				setList[i][this.primary_key] = editDict.update_primary
				actions.push({ action: 'set', dict: setList[i] })
			}

			// const hasError = false
			for (let i = 0; i <= actions.length - 1; i++) {
				const apiReqCnst = await apiReq(this, `${this.$route.query.model}/${actions[i].action}`, actions[i].dict)
				if (apiReqCnst.status === 'error') {
					if (apiReqCnst.response.message != null && apiReqCnst.response.message !== '') {
						this.feedbackMessage = apiReqCnst.response.message
					}
					else {
						this.feedbackMessage = apiReqCnst.response.errmsg
					}
					this.editAlert = true
					return
				}
				else if (apiReqCnst.status === 'ok') {
					if (i === (actions.length - 1)) {
						await this.apiReset()
						this.editShow = false
						this.editAlert = false
						this.resetFormModal(this.editModal, this.editFields)
						this.primaryValTemp = ''
						this.feedbackMessage = 'Record updated successfully'
						this.dismissCountDown = this.dismissSecs
						return
					}
				}
			}
		},
		async deleteEvent(evt) {
			const deleteDict = { [this.primary_key]: this.primary_val }
			if (deleteDict[this.primary_key] != null) {
				const apiReqCnst = await apiReq(this, `${this.$route.query.model}/delete`, deleteDict)
				if (apiReqCnst.status === 'error') {
					if (apiReqCnst.response.message != null && apiReqCnst.response.message !== '') {
						this.feedbackMessage = apiReqCnst.response.message
					}
					else {
						this.feedbackMessage = apiReqCnst.response.errmsg
					}
					this.deleteAlert = true
				}
				else if (apiReqCnst.status === 'ok') {
					await this.apiReset()
					this.deleteShow = false
					this.deleteAlert = false
					this.resetModal(this.deleteModal)
					this.feedbackMessage = 'Record deleted successfully'
					this.dismissCountDown = this.dismissSecs
				}
			}
		},
	},
}

</script>
pt>
