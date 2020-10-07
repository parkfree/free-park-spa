<template>
  <div class="card">
    <div class="card-content">
      <h4 class="title is-4 is-spaced">添加账号</h4>
      <form @submit.prevent="addMember">
        <b-field label="手机号">
          <b-input required v-model="member.mobile" placeholder="手机号" type="tel" pattern="[0-9]{11}" validation-message="输入11位手机号"></b-input>
        </b-field>
        <b-field label="userId">
          <b-input required v-model="member.userId" placeholder="userId" type="text"></b-input>
        </b-field>

        <b-field label="openId">
          <b-input required v-model="member.openId" placeholder="openId" type="text"></b-input>
        </b-field>

        <b-field label="会员类型">
          <b-input required v-model="member.memType" type="text"></b-input>
        </b-field>

        <b-button type="is-primary" native-type="submit">登录</b-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      member: {
        mobile: '',
        userId: '',
        openId: '',
        memType: 'in卡'
      }
    }
  },
  methods: {
    addMember () {
      this.$http.post('/members', this.member)
        .then(() => {
          this.$parent.close()
          this.$buefy.notification.open({
            message: '创建成功',
            type: 'is-success'
          })
        })
        .catch((err) => {
          this.handleApiError(err, '获取账号列表失败')
        })
    }
  }
}
</script>
