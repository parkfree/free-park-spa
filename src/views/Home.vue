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
        <member-list></member-list>
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
import MemberList from '@/components/MemberList'

export default {
  name: 'Home',
  components: {
    CarStatus,
    PaymentList,
    MemberList
  },
  data () {
    return {
      status: 'none',
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
