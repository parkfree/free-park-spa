<template>
  <div class="block">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <b-icon icon="tags" type="is-success"></b-icon>
          <span> 今日缴费记录</span>
        </p>
      </header>
      <div class="card-content">
        <b-table :data="payments" striped hoverable>
          <b-table-column field="paidAt" label="缴费时间" v-slot="props">
            {{ props.row.paidAt }}
          </b-table-column>
          <b-table-column field="member.mobile" label="使用账号" v-slot="props">
            {{ props.row.member.mobile }}
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
          return 'is-danger'
      }
      if(payStatus === 'SUCCESS') {
        return 'is-success'
      }
    }
  },
  data () {
    return {
      payments: [
        {
          'id': 1,
          'tenantId': 1,
          'member': {
            'id': 1,
            'mobile': '13688882222'
          },
          'status': 'SUCCESS',
          'amount': 300,
          'comment': '支付成功',
          'paidAt': '2020-09-20 00:00:03'
        },
        {
          'id': 2,
          'tenantId': 1,
          'member': {
            'id': 1,
            'mobile': '13688882222'
          },
          'status': 'NEED_WECHAT_PAY',
          'amount': 600,
          'comment': '需要通过微信手工支付',
          'paidAt': '2020-09-20 00:00:03'
        },
        {
          'id': 3,
          'tenantId': 1,
          'member': {
            'id': 1,
            'mobile': '13688882222'
          },
          'status': 'NO_NEED_TO_PAY',
          'amount': 300,
          'comment': '当前时段已经支付过，不需要再支付',
          'paidAt': '2020-09-20 00:00:03'
        },
        {
          'id': 4,
          'tenantId': 1,
          'member': {
            'id': 1,
            'mobile': '13688882222'
          },
          'status': 'CAR_NOT_FOUND',
          'amount': 300,
          'comment': '车辆不在停车场',
          'paidAt': '2020-09-20 00:00:03'
        },
        {
          'id': 4,
          'tenantId': 1,
          'member': {
            'id': 1,
            'mobile': '13688882222'
          },
          'status': 'NO_AVAILABLE_MEMBER',
          'amount': 300,
          'comment': '没有可用的会员账号用于支付',
          'paidAt': '2020-09-20 00:00:03'
        },
      ],
      columns: [
        {
          field: 'id',
          label: '#',
          width: '40',
          numeric: true
        },
        {
          field: 'paidAt',
          label: '缴费时间',
        },
        {
          field: 'member.mobile',
          label: '使用账号',
        },
        {
          field: 'amount',
          label: '金额',
          centered: true
        },
        {
          field: 'comment',
          label: '缴费结果',
        }
      ]
    }
  }
}
</script>
