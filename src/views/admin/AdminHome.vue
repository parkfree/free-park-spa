<template>
  <div>
    <tenants></tenants>
    <pay-tasks></pay-tasks>
    <check-tasks></check-tasks>
  </div>
</template>

<script>
import CheckTasks from '@/components/admin/CheckTasks'
import PayTasks from '@/components/admin/PayTasks'
import Tenants from '@/components/admin/Tenants'

export default {
  components: {
    CheckTasks,
    PayTasks,
    Tenants
  },
}
</script>

<style lang="scss">
</style>
