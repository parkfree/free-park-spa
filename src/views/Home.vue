<template>
  <div class="tile">
    {{user.owner}}
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
