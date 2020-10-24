<template>
  <div class="block">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <b-icon icon="tags" type="is-primary"></b-icon>
          <span class="ml-1">今日缴费记录</span>
        </p>
        <div class="card-header-icon">
          <b-button type="is-primary" size="is-small" icon-left="yen-sign" @click="confirmPayment"
                    :loading="createPaymentLoading">
            缴费一次
          </b-button>
        </div>
      </header>
      <div class="card-content">
        <template v-if="payments.length === 0">
          <p class="has-text-centered">今日没有缴费记录~</p>
        </template>
        <template v-else>
          <b-table :data="payments" striped hoverable>
            <b-table-column field="paidAt" label="缴费时间" v-slot="props">
              {{ props.row.paidAt }}
            </b-table-column>
            <b-table-column field="member.mobile" label="使用账号" v-slot="props">
              {{ props.row.member ? props.row.member.mobile : "无" }}
            </b-table-column>
            <b-table-column field="amount" label="缴费金额" v-slot="props">
              {{ props.row.amount | currency }}
            </b-table-column>
            <b-table-column field="comment" label="缴费结果" v-slot="props">
              <b-tag :type="payStatusToTagClass(props.row.status)">
                {{ props.row.comment }}
              </b-tag>
            </b-table-column>
          </b-table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import handleApiErrorMixin from '@/mixins/handleApiError'

export default {
  mixins: [handleApiErrorMixin],
  filters: {
    currency: function (amount) {
      return `￥${amount / 100}`
    }
  },
  methods: {
    payStatusToTagClass (payStatus) {
      switch (payStatus) {
        case 'SUCCESS':
          return 'is-success'
        case 'NO_NEED_TO_PAY':
        case 'CAR_NOT_FOUND':
          return 'is-warning'
        case 'NEED_WECHAT_PAY':
        case 'NO_AVAILABLE_MEMBER':
        case 'PAY_API_ERROR':
        case 'PARK_DETAIL_API_ERROR':
        case 'MEMBER_NO_DISCOUNT':
          return 'is-danger'
      }
    },
    confirmPayment () {
      this.$buefy.dialog.confirm({
        message: '确定要手动缴费一次吗？',
        confirmText: '确认',
        cancelText: '取消',
        onConfirm: () => this.createPayment()
      })
    },
    createPayment () {
      this.createPaymentLoading = true
      this.$http.post('/payments')
        .then((response) => {
          this.$buefy.notification.open({
            message: '缴费结果：' + response.data.comment,
            type: response.data.status === 'SUCCESS' ? 'is-success' : 'is-danger'
          })
          this.getPayments()
        })
        .catch((err) => {
          this.handleApiError(err, '缴费失败')
        })
        .finally(() => {
          this.createPaymentLoading = false
        })
    },
    getPayments () {
      this.$http.get('/payments/today')
        .then((response) => {
          this.payments = response.data
        })
        .catch((err) => {
          this.handleApiError(err, '获取缴费记录失败')
        })
    }
  },
  data () {
    return {
      payments: [],
      createPaymentLoading: false
    }
  },
  mounted () {
    this.getPayments()
  }
}
</script>
