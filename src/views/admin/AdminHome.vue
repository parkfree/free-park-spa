<template>
  <div>
    <pay-tasks></pay-tasks>
    <check-tasks></check-tasks>
  </div>
</template>

<script>
import CheckTasks from '@/components/admin/CheckTasks'
import PayTasks from '@/components/admin/PayTasks'

export default {
  components: {
    CheckTasks,
    PayTasks
  },
}
</script>

<style lang="scss">
</style>
