<template>
  <div class="block">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <b-icon icon="clock" type="is-primary"></b-icon>
          <span class="ml-1">缴费任务</span>
        </p>
      </header>
      <div class="card-content">
        <template v-if="tasks.length === 0">
          <p class="has-text-centered">当前没有缴费任务~</p>
        </template>
        <template v-else>
          <b-table :data="tasks" striped hoverable scrollable>
            <b-table-column field="tenantId" label="用户ID" v-slot="props">
              {{ props.row.tenantId }}
            </b-table-column>
            <b-table-column field="tenantId" label="入场时间" v-slot="props">
              {{ props.row.parkAt | onlyTime }}
            </b-table-column>
            <b-table-column field="tenantId" label="创建时间" v-slot="props">
              {{ props.row.createdAt | onlyTime }}
            </b-table-column>
            <b-table-column field="initDelaySeconds" label="第一次时间" v-slot="props">
              {{ props.row | firstTime }}
            </b-table-column>
            <b-table-column field="nextScheduledAt" label="下次时间" v-slot="props">
              {{ props.row.nextScheduledAt | onlyTime }}
            </b-table-column>
            <b-table-column field="periodMinutes" label="缴费周期" v-slot="props">
              {{ props.row.periodMinutes}} 分钟
            </b-table-column>

            <b-table-column v-slot="props" label="操作">
              <div class="buttons">
                <b-button type="is-danger" size="is-small" icon-right="trash-alt"
                          @click="confirmDelete(props.row.tenantId)"></b-button>
              </div>
            </b-table-column>
          </b-table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import handleApiErrorMixin from '@/mixins/handleApiError'
import { DateTime } from 'luxon'

export default {
  name: 'PayTasks',
  mixins: [handleApiErrorMixin],
  data () {
    return {
      tasks: []
    }
  },
  filters: {
    onlyTime: function (datetimeStr) {
      return DateTime.fromSQL(datetimeStr).toFormat('HH:mm:ss')
    },
    firstTime: function (task) {
      return DateTime.fromSQL(task.createdAt)
        .plus({ seconds: task.initDelaySeconds })
        .toFormat('HH:mm:ss')
    }
  },
  methods: {
    getPayTasks () {
      this.$http.get('/admin/paytasks')
        .then((response) => {
          this.tasks = response.data
        })
        .catch((err) => {
          this.handleApiError(err, '获取缴费任务列表失败')
        })
    },
    confirmDelete (id) {
      this.$buefy.dialog.confirm({
        message: '确定要取消缴费任务吗？',
        confirmText: '确认',
        cancelText: '放弃',
        onConfirm: () => this.deletePayTask(id)
      })
    },
    deletePayTask (id) {
      this.$http.delete(`/admin/tenants/${id}/paytask`)
        .then(() => {
          this.getPayTasks()
        })
        .catch((err) => {
          this.handleApiError(err, '取消缴费任务失败')
        })
    },
  },
  mounted () {
    this.getPayTasks()
  }
}
</script>
