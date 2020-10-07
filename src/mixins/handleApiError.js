export default {
  methods: {
    handleApiError (err, message) {
      if (err.response) {
        this.$buefy.notification.open({
          message: `${message}：${err.response.data.message}`,
          type: 'is-danger'
        })
      }
    }
  }
}
