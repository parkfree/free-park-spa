<template>
  <section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container">
        <div class="column is-4 is-offset-4">
          <div class="box">
            <h4 class="title is-4 is-spaced">登录 Free Park</h4>
            <p class="subtitle is-6 has-text-grey">忘记密码请联系管理员更改</p>
            <form>
              <b-field>
                <b-input v-model="email" placeholder="邮箱" type="email" icon="envelope"></b-input>
              </b-field>

              <b-field>
                <b-input v-model="password" placeholder="密码" type="password" icon="key" password-reveal></b-input>
              </b-field>

              <div class="level">
                <div class="level-left">
                  <div class="level-item">
                    <b-button type="is-primary" native-type="submit">登录</b-button>
                  </div>
                </div>
                <div class="level-right">
                  <router-link to="/register">注册新账号</router-link>
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
      password: ''
    }
  }
}
</script>
