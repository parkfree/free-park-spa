<template>
  <div>
    <div class="block">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            <b-icon icon="tags" type="is-primary" class="mr-1"></b-icon>
            <span class="has-text-weight-bold mr-2">缴费记录</span>
          </p>
        </header>
        <div class="card-content">
          <section>
            <b-table
                :data="payments"
                :loading="loading"

                scrollable

                paginated
                backend-pagination
                :total="total"
                :per-page="20"
                @page-change="onPageChange">

              <b-table-column field="id" label="ID" v-slot="props">
                {{ props.row.id }}
              </b-table-column>

              <b-table-column field="tenant" label="用户" v-slot="props">
                {{ props.row.tenant.owner }}
              </b-table-column>

              <b-table-column field="tenant" label="车牌号" v-slot="props">
                {{ props.row.tenant.carNumber }}
              </b-table-column>

              <b-table-column field="member" label="使用账号" v-slot="props">
                  {{ props.row.member ? `${props.row.member.mobile} (${props.row.member.name})` : '无' }}
              </b-table-column>

              <b-table-column field="amount" label="缴费金额" v-slot="props">
                {{ props.row.amount | currency }}
              </b-table-column>

              <b-table-column field="paidAt" label="缴费时间" v-slot="props">
                {{ props.row.paidAt }}
              </b-table-column>

              <b-table-column field="comment" label="缴费结果" v-slot="props">
                <b-tag :type="payStatusToTagClass(props.row.status)">
                  {{ props.row.comment }}
                </b-tag>
              </b-table-column>


            </b-table>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import handleApiErrorMixin from '@/mixins/handleApiError'

export default {
  mixins: [handleApiErrorMixin],
  name: 'Payments',
  data () {
    return {
      payments: [],
      total: 0,
      page: 0,
      loading: true,
    }
  },
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
          return 'is-danger'
      }
    },
    getPaymentPage () {
      this.loading = true
      this.$http.get(`/admin/payments?page=${this.page}&size=20&sort=paidAt,desc`)
        .then((response) => {
          this.payments = response.data.content
          this.page = response.data.number
          this.total = response.data.totalElements
        })
        .catch((err) => {
          this.handleApiError(err, '获取缴费记录列表失败')
        })
        .finally(() => {
          this.loading = false
        })
    },

    onPageChange (page) {
      this.page = page - 1;
      this.getPaymentPage()
    },
  },
  mounted () {
    this.getPaymentPage()
  }
}
</script>

<style lang="scss">
</style>
