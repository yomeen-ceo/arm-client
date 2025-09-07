<template>
  <div class="q-pa-lg column gap-md">
    <div class="row items-center q-gutter-sm">
      <q-input v-model="projectId" label="Project ID" dense outlined style="max-width: 260px" />
      <q-btn label="Refresh Stats" @click="loadSummary" :disable="!projectId" />
    </div>

    <q-card flat bordered class="q-pa-md">
      <div class="text-subtitle1 q-mb-sm">Upload receipts</div>
      <q-file
        v-model="files"
        label="Drag or choose images"
        use-chips
        multiple
        accept="image/*"
        counter
        @rejected="onRejected"
      />
      <div class="q-mt-md row q-gutter-sm">
        <q-btn label="Upload" color="primary" :loading="uploading" :disable="!files || !files.length || !projectId" @click="doUpload" />
        <q-btn label="Clear" flat @click="files = []" />
      </div>
    </q-card>

    <q-card flat bordered class="q-pa-md">
      <div class="text-subtitle1 q-mb-sm">Project summary</div>
      <q-markup-table v-if="summary" flat>
        <thead>
          <tr>
            <th class="text-left">Receipts</th>
            <th class="text-left">Total Amount</th>
            <th class="text-left">By Currency</th>
            <th class="text-left">Latest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left">{{ summary.count }}</td>
            <td class="text-left">{{ fmtMoney(summary.total_amount, summary.base_currency) }}</td>
            <td class="text-left">
              <div v-for="(v,cur) in summary.totals_by_currency" :key="cur">{{ cur }} {{ v.toLocaleString() }}</div>
            </td>
            <td class="text-left">{{ summary.last_updated ? new Date(summary.last_updated).toLocaleString() : '-' }}</td>
          </tr>
        </tbody>
      </q-markup-table>
      <div v-else class="text-grey">No data yet</div>
    </q-card>

    <q-card flat bordered class="q-pa-md">
      <div class="text-subtitle1 q-mb-sm">Latest records</div>
      <q-table
        :rows="records"
        :columns="columns"
        row-key="_id"
        flat
        dense
        :loading="loadingRecords"
      />
    </q-card>
  </div>
</template>

<script>

import { ref } from 'vue'
const uploading = ref(false)
const files = ref([])
const projectId = ref('demo-project-001')
const summary = ref(null)
const loadingRecords = ref(false)
const records = ref([])

export default {
  name: 'PageSet',
  data () {
    return {
    }
  },
  methods: {
    fmtMoney (v, cur) {
      if (v == null) return '-'
      try {
        return `${cur || ''} ${Number(v).toLocaleString()}`
      } catch (e) {
        return String(v)
      }
    },
    onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) rejected`
      })
    },
    async doUpload () {
      uploading.value = true
      try {
        const form = new FormData()
        files.value.forEach(f => form.append('files', f))
        form.append('projectId', projectId.value)

        const res = await fetch('/api/receipts', { method: 'POST', body: form })
        if (!res.ok) throw new Error(await res.text())
        const data = await res.json()

        this.$q.notify({ type: 'positive', message: `Uploaded ${data.saved} / ${files.value.length}` })
        files.value = []
        await this.loadSummary()
        await this.loadRecords()
      } catch (err) {
        console.error(err)
        this.$q.notify({ type: 'negative', message: err.message })
      } finally { uploading.value = false }
    },
    async loadSummary () {
      if (!projectId.value) return
      const res = await fetch(`/api/projects/${encodeURIComponent(projectId.value)}/summary`)
      summary.value = res.ok ? await res.json() : null
    },
    async loadRecords () {
      loadingRecords.value = true
      try {
        const res = await fetch(`/api/projects/${encodeURIComponent(projectId.value)}/records?limit=20`)
        records.value = res.ok ? await res.json() : []
      } finally { loadingRecords.value = false }
    }
  },
  mounted () {
    this.loadSummary()
    this.loadRecords()
  }
}
</script>
