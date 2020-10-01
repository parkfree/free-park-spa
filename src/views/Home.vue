<template>
  <div class="columns">
    <div class="column is-three-fifths is-offset-one-fifth">
      <b-navbar>
        <template slot="brand">
          <b-navbar-item tag="router-link" :to="{ path: '/' }">
            <b-icon
                icon="parking"
                size="is-large"
                type="is-primary">
            </b-icon>
            <div class="has-text-weight-bold is-size-5">Free Park</div>
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
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      user: {}
    }
  },
  beforeMount: function () {
    this.$http.get('/tenant').then((response) => {
      this.user = response.data
    })
  }
}
</script>
