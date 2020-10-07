<template>
  <div class="block">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <b-icon icon="key" type="is-primary"></b-icon>
          <span class="ml-1">修改密码</span>
        </p>
        <div class="card-header-icon">
        </div>
      </header>
      <div class="card-content">
        <form @submit.prevent="resetPassword">
          <b-notification v-if="errorMessage !== ''" type="is-danger is-light">
            {{errorMessage}}
          </b-notification>

          <b-field label="旧密码" horizontal>
            <b-input required v-model="oldPassword" placeholder="旧密码" type="password" icon="key"
                     password-reveal></b-input>
          </b-field>

          <b-field label="新密码" horizontal>
            <b-input required v-model="newPassword" placeholder="新密码" type="password" icon="key"
                     password-reveal></b-input>
          </b-field>

          <b-field label="确认密码" horizontal>
            <b-input required v-model="passwordConfirm" placeholder="再次输入新密码" type="password" icon="key"
                     password-reveal></b-input>
          </b-field>

          <b-field horizontal>
            <p class="control">
              <b-button type="is-primary" native-type="submit">保存</b-button>
            </p>
          </b-field>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResetPassword',
  data: function () {
    return {
      errorMessage: '',
      oldPassword: '',
      newPassword: '',
    }
  },
  methods: {
    resetPassword () {
      this.errorMessage = ''
      if (this.passwordConfirm !== this.newPassword) {
        this.errorMessage = '两次密码输入不一致'
        return
      }

      this.$http.put('/password', {
        oldPassword: this.oldPassword,
        newPassword: this.newPassword,
      })
        .then(() => {
          this.$buefy.notification.open({
            message: '密码更新成功',
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
    },
  }
}
</script>

<style scoped>

</style>
