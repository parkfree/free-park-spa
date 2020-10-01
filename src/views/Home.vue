<template>
  <section class="has-background-light">
    <div class="columns">
      <div class="column is-three-fifths is-offset-one-fifth">
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
        <div class="card">
          <div class="card-content">
            <div class="block">
              <span class="has-text-weight-bold">川AC123B </span>
              <b-tag type="is-success">自动缴费中</b-tag>
            </div>
            <div class="block">
              <p>您的车已于 08:30:00 进入停车场，缴费任务于 08:30:00 启动，第一次缴费时间为 08:30:10，每隔 60 分钟缴费一次，下次缴费时间为 09:30:10。</p>
            </div>
            <b-button type="is-danger">取消自动缴费</b-button>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="block">
              <p><span class="has-text-weight-bold">川AC123B </span>
                <b-tag>自动支付没有运行</b-tag>
              </p>
            </div>
            <div class="block">
              <p>周一到周五每天早上 08:30 自动启动缴费任务。您也可以点击下方按钮手动触发今天的自动缴费。</p>
            </div>
            <b-button>触发自动缴费</b-button>
          </div>
        </div>
        <div class="card">
          <div class="card-content">
            <div class="block">
              <p><span class="has-text-weight-bold">川AC123B </span>
                <b-tag type="is-success">检测中</b-tag>
              </p>
            </div>
            <div class="block">
              <p>正在检测您的车是否进入停车场。检测任务于 08:30:00 启动，第一次检测时间为 08:30:10，每隔 20 分钟检测一次，已检测了 3 次，下次检测时间为 09:30:10。9
                次检测不到之后取消。</p>
            </div>
            <b-button type="is-danger">取消检测任务</b-button>
          </div>
        </div>
      </div>
    </div>
  </section>
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
