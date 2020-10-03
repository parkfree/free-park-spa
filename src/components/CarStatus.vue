<template>
  <div class="block">
    <div class="card">
      <div class="card-content">
        <div class="block">
          <span class="has-text-weight-bold">{{user.carNumber}} </span>
          <b-tag :type="{'is-success': status !== 'none'}">{{statusTag}}</b-tag>
        </div>
        <template v-if="status === 'paying'">
          <div class="block">
            <p>您的车已于 08:30:00 进入停车场，缴费任务于 08:30:00 启动，第一次缴费时间为 08:30:10，每隔 60 分钟缴费一次，下次缴费时间为 09:30:10。</p>
          </div>
          <b-button type="is-danger">取消自动缴费</b-button>
        </template>

        <template v-if="status === 'checking'">
          <div class="block">
            <p>正在检测您的车是否进入停车场。检测任务于 08:30:00 启动，第一次检测时间为 08:30:10，每隔 20 分钟检测一次，已检测了 3 次，下次检测时间为 09:30:10。9
              次检测不到之后取消。</p>
          </div>
          <b-button type="is-danger">取消检测任务</b-button>
        </template>

        <template v-if="status === 'none'">
          <div class="block">
            <p>周一到周五每天早上 08:30 自动启动缴费任务。您也可以点击下方按钮手动触发今天的自动缴费。</p>
          </div>
          <b-button>触发自动缴费</b-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

const statusTags = {
  paying: '自动缴费中',
  checking: '检测中',
  none: '自动缴费没有运行'
}

export default {
  name: 'CarStatus',
  data () {
    return {
      status: 'none',
    }
  },
  computed: {
    statusTag: function () {
      return statusTags[this.status]
    },
    ...mapState(['user'])
  }
}
</script>
