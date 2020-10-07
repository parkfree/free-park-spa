<template>
  <user-container>
    <div class="block">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            <b-icon icon="user-edit" type="is-primary"></b-icon>
            <span class="ml-1">修改个人信息</span>
          </p>
          <div class="card-header-icon">
          </div>
        </header>
        <div class="card-content">
          <form @submit.prevent="updateUser">
            <b-notification v-if="errorMessage !== ''" type="is-danger is-light">
              {{errorMessage}}
            </b-notification>
            <b-field label="邮箱" horizontal>
              <b-input required v-model="user.email" placeholder="邮箱" type="email" icon="envelope"></b-input>
            </b-field>

            <b-field label="姓名" horizontal>
              <b-input required v-model="user.owner" placeholder="姓名" type="text" icon="user"></b-input>
            </b-field>

            <b-field label="车牌号" horizontal>
              <b-input required v-model="user.carNumber" placeholder="车牌号" type="text" icon="car"></b-input>
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
    <reset-password></reset-password>
  </user-container>
</template>

<script>
import UserContainer from '@/components/UserContainer'
import ResetPassword from '@/components/ResetPassword'
import handleApiErrorMixin from '@/mixins/handleApiError'

export default {
  mixins: [handleApiErrorMixin],
  name: 'Setting',
  components: {
    UserContainer,
    ResetPassword
  },
  data: function () {
    return {
      errorMessage: '',
      user: {},
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    updateUser () {
      this.$store.dispatch('updateUser', this.user)
        .then(() => {
          this.$buefy.notification.open({
            message: '更新个人信息成功',
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
    getUser () {
      this.$http.get(`/tenant`)
        .then((response) => {
          this.user = response.data
        })
        .catch((err) => {
          this.handleApiError(err, '获取用户信息失败')
        })
    },
  }
}
</script>
