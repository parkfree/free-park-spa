<template>
  <div class="card">
    <div class="card-content">
      <h4 class="title is-4 is-spaced">添加账号</h4>
      <form @submit.prevent="addMember">
        <b-notification v-if="errorMessage !== ''" type="is-danger is-light">
          {{errorMessage}}
        </b-notification>
        <b-field label="手机号">
          <b-input required v-model="member.mobile" placeholder="手机号" type="tel" pattern="[0-9]{11}"
                   validation-message="输入11位手机号"></b-input>
        </b-field>
        <b-field label="名字">
          <b-input required v-model="member.name" placeholder="名字" type="text"></b-input>
        </b-field>
        <b-field label="userId">
          <b-input required v-model="member.userId" placeholder="userId" type="text" pattern="[a-f0-9]{32}"
                   validation-message="只允许字符：[a-f0-9]，且长度必须为32"></b-input>
        </b-field>

        <b-field label="openId">
          <b-input required v-model="member.openId" placeholder="openId" type="text" pattern="[A-Za-z0-9_\-]{28}"
                   validation-message="只允许字符：[A-Za-z0-9_\-]，且长度必须为28"></b-input>
        </b-field>

        <b-field grouped>
          <b-field label="是否参与领积分">
            <b-switch v-model="member.enablePoint">{{member.enablePoint ? '是' : '否'}}</b-switch>
          </b-field>

          <b-field label="是否参与缴费">
            <b-switch v-model="member.enablePay">{{member.enablePay ? '是' : '否'}}</b-switch>
          </b-field>
        </b-field>

        <b-field label="会员类型">
          <b-input required v-model="member.memType" type="text"></b-input>
        </b-field>

        <b-button type="is-primary" native-type="submit">保存</b-button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tenantId: Number
  },
  data: function () {
    return {
      errorMessage: '',
      member: {
        mobile: '',
        userId: '',
        openId: '',
        memType: 'in卡',
        name: '',
        enablePay: true,
        enablePoint: false
      }
    }
  },
  methods: {
    addMember () {
      this.$http.post(`/admin/tenants/${this.tenantId}/members`, this.member)
        .then(() => {
          this.$parent.close()
          this.$emit('success')
          this.$buefy.notification.open({
            message: '添加账号成功',
            type: 'is-success'
          })
        })
        .catch((err) => {
          if (err.response) {
            this.errorMessage = err.response.data.message
          } else {
            this.errorMessage = '未知错误'
          }
        })
    }
  }
}
</script>
