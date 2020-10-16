<template>
  <div class="box">
    <div class="block">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <span class="has-text-weight-bold mr-2">{{tenant.owner}} • {{tenant.carNumber}}</span>
            <b-tag :type="status !== 'none' ? 'is-success' : ''">{{statusTag}}</b-tag>
          </div>
        </div>
        <div class="level-right">
          <div v-if="tenant.totalPaidAmount" class="level-item">
            已累计为您节省：<strong class="is-size-5 has-text-primary">{{tenant.totalPaidAmount | currency}}</strong>
          </div>
        </div>
      </div>
    </div>
    <template v-if="status === 'paying'">
      <div class="block">
        <p>您的车已于 {{task.parkAt | onlyTime}} 进入停车场，缴费任务于 {{task.createdAt | onlyTime }} 启动，第一次缴费时间为
          {{firstScheduleDateTime}}，每隔 {{task.periodMinutes}} 分钟缴费一次，下次缴费时间为 {{task.nextScheduledAt | onlyTime}}。</p>
      </div>
      <b-button type="is-danger" @click="cancelPayTask">取消自动缴费</b-button>
    </template>

    <template v-if="status === 'checking'">
      <div class="block">
        <p>正在检测您的车是否进入停车场。检测任务于 {{task.createdAt | onlyTime }} 启动，第一次检测时间为 {{firstScheduleDateTime}}，每隔
          {{task.periodMinutes}} 分钟检测一次，已检测了 {{task.checkCount}} 次，下次检测时间为
          {{task.nextScheduledAt | onlyTime}}。{{task.checkCountLimit}} 次检测不到之后取消。</p>
      </div>
      <b-button type="is-danger" @click="cancelCheckTask">取消检测任务</b-button>
    </template>

    <template v-if="status === 'none'">
      <div class="block">
        <p>周一到周五每天早上 08:30 启动自动缴费任务。您也可以点击下方按钮手动触发今天的自动缴费。</p>
      </div>
      <b-button @click="createCheckTask">触发自动缴费</b-button>
    </template>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import handleApiErrorMixin from '@/mixins/handleApiError'

const statusTags = {
  paying: '自动缴费中',
  checking: '检测中',
  none: '自动缴费没有运行'
}

export default {
  name: 'CarStatus',
  mixins: [handleApiErrorMixin],
  props: {
    tenantId: Number
  },
  data () {
    return {
      tenant: {},
      status: 'none',
      task: {},
    }
  },
  filters: {
    onlyTime: function (datetimeStr) {
      return DateTime.fromSQL(datetimeStr).toFormat('HH:mm:ss')
    },
    currency: function (amount) {
      return `￥${amount / 100}`
    }
  },
  computed: {
    statusTag: function () {
      return statusTags[this.status]
    },
    firstScheduleDateTime () {
      return DateTime.fromSQL(this.task.createdAt)
        .plus({ seconds: this.task.initDelaySeconds })
        .toFormat('HH:mm:ss')
    },
  },
  methods: {
    cancelPayTask () {
      this.$http.delete(`/admin/tenants/${this.tenantId}/paytask`)
        .then(() => this.resetStatus())
        .catch((err) => {
          this.handleApiError(err, '取消自动缴费任务失败')
        })
    },
    cancelCheckTask () {
      this.$http.delete(`/admin/tenants/${this.tenantId}/checktask`)
        .then(() => this.resetStatus())
        .catch((err) => {
          this.handleApiError(err, '取消检测任务失败')
        })
    },
    createCheckTask () {
      this.$http.post(`/admin/tenants/${this.tenantId}/checktask`)
        .then((response) => {
          this.status = 'checking'
          this.task = response.data
        })
        .catch((err) => {
          this.handleApiError(err, '创建自动缴费任务失败')
        })
    },
    resetStatus () {
      this.status = 'none'
      this.task = {}
    },
    getTenant () {
      this.$http.get(`/admin/tenants/${this.tenantId}`)
        .then((response) => {
          this.tenant = response.data
        })
        .catch((err) => {
          this.handleApiError(err, '获取用户信息失败')
        })
    },
  },
  mounted () {
    this.getTenant()

    Promise.any([this.$http.get(`/admin/tenants/${this.tenantId}/paytask`), this.$http.get(`/admin/tenants/${this.tenantId}/checktask`)])
      .then((response) => {
        this.task = response.data
        this.status = response.config.url === `/admin/tenants/${this.tenantId}/paytask` ? 'paying' : 'checking'
      })
      .catch((err) => {
        let non404Error = err.errors.find((e) => !(e.response && e.response.status === 404))
        if (non404Error) {
          this.handleApiError(non404Error, '获取任务状态失败')
        }
      })
  }
}
</script>
