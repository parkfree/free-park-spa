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
              <b-navbar-dropdown :label="user.owner">
                <b-navbar-item tag="router-link" :to="{path: '/setting'}">
                  个人设置
                </b-navbar-item>
                <b-navbar-item @click="logout">
                  退出
                </b-navbar-item>
              </b-navbar-dropdown>
            </template>
          </b-navbar>
        </div>
        <slot></slot>
      </div>
    </div>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>Free Park 是非盈利项目，不保证高可用性。使用 Free Park 代表您同意自己承担可能的任何后果。</p>
        <p>
          <strong>Free Park</strong> is built with <a href="https://buefy.org/" target="_blank">Buefy</a>, <a
            href="https://bulma.io" target="_blank">Bulma</a>, and <a href="https://vuejs.org"
                                                                      target="_blank">Vue.js</a>.
        </p>
      </div>
    </footer>
  </section>

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'UserContainer',
  methods: {
    logout () {
      this.$store.dispatch('logout')
        .then(() => this.$router.push('/login'))
    }
  },
  mounted () {
    this.$store.dispatch('getUser')
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>

</style>
