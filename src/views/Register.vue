<template>
  <section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <h4 class="title is-4 is-spaced">注册 Free Park</h4>
            <p class="subtitle is-6 has-text-grey">联系管理员获取邀请码</p>
            <b-notification v-model="hasError" type="is-danger is-light">
              {{errorMessage}}
            </b-notification>
            <form @submit.prevent="register">
              <b-field>
                <b-input required v-model="email" placeholder="邮箱" type="email" icon="envelope"></b-input>
              </b-field>

              <b-field>
                <b-input required v-model="owner" placeholder="姓名" type="text" icon="user"></b-input>
              </b-field>

              <b-field>
                <b-input required v-model="carNumber" placeholder="车牌号" type="text" icon="car"></b-input>
              </b-field>

              <b-field>
                <b-input required v-model="inviteCode" placeholder="邀请码" type="text" icon="keyboard"></b-input>
              </b-field>

              <b-field>
                <b-input required v-model="password" placeholder="密码" type="password" icon="key"
                         password-reveal></b-input>
              </b-field>

              <b-field>
                <b-input required v-model="passwordConfirm" placeholder="确认密码" type="password" icon="key"
                         password-reveal></b-input>
              </b-field>

              <div class="level">
                <div class="level-left">
                  <div class="level-item">
                    <b-button type="is-primary" native-type="submit">注册</b-button>
                  </div>
                </div>
                <div class="level-right">
                  <router-link to="/login">已有账号登录</router-link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      owner: '',
      carNumber: '',
      password: '',
      passwordConfirm: '',
      inviteCode: '',
      hasError: false,
      errorMessage: ''
    }
  },
  methods: {
    register: function () {
      this.hasError = false
      if (this.passwordConfirm !== this.password) {
        this.hasError = true
        this.errorMessage = '两次密码输入不一致'
        return
      }

      this.$store.dispatch('register', {
        email: this.email,
        owner: this.owner,
        carNumber: this.carNumber,
        inviteCode: this.inviteCode,
        password: this.password
      })
        .then(() => this.$router.push('/'))
        .catch(err => {
          this.hasError = true
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
