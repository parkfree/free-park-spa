<template>
  <section class="has-background-light">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
        <div class="block">
          <b-navbar shadow>
            <template slot="brand">
              <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <b-icon
                    icon="parking"
                    size="is-large"
                    type="is-primary">
                </b-icon>
                <div class="has-text-weight-bold is-size-5 has-text-primary">Free Park</div>
              </b-navbar-item>
            </template>

            <template slot="start">
            </template>

            <template slot="end">
              <b-navbar-item href="#">
                管理界面
              </b-navbar-item>
              <b-navbar-dropdown :label="user.owner">
                <b-navbar-item href="#">
                  个人设置
                </b-navbar-item>
                <b-navbar-item href="#">
                  退出
                </b-navbar-item>
              </b-navbar-dropdown>
            </template>
          </b-navbar>
        </div>
        <car-status></car-status>
        <payment-list></payment-list>
        <div class="block">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">
                <b-icon icon="users" type="is-info"></b-icon>
                <span>账号列表</span>
              </p>
            </header>
            <div class="card-content">
              <b-table :data="payments" :columns="columns" striped hoverable></b-table>
            </div>
          </div>
        </div>
      </div>

    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>Free Park</strong> is built with <a href="https://buefy.org/" target="_blank">Buefy</a>, <a
            href="https://bulma.io" target="_blank">Bulma</a>,
          and <a href="https://vuejs.org" target="_blank">Vue.js</a>.
        </p>
      </div>
    </footer>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import CarStatus from '@/components/CarStatus'
import PaymentList from '@/components/TodayPayment'

export default {
  name: 'Home',
  components: { CarStatus, PaymentList },
  data () {
    return {
      status: 'none',
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
          'status': 'SUCCESS',
          'amount': 300,
          'comment': '支付成功',
          'paidAt': '2020-09-20 00:00:03'
        },
        {
          'id': 3,
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
  },
  mounted: function () {
    this.$store.dispatch('getUser')
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
