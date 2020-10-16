<template>
  <div>
    <car-status :tenant-id="$route.params.id"></car-status>
    <today-payment :tenant-id="$route.params.id"></today-payment>
    <member-list :tenant-id="$route.params.id"></member-list>
  </div>
</template>

<script>
import CarStatus from '@/components/admin/tenant/CarStatus'
import TodayPayment from '@/components/admin/tenant/TodayPayment'
import MemberList from '@/components/admin/tenant/MemberList'

export default {
  name: 'Home',
  components: {
    CarStatus,
    TodayPayment,
    MemberList
  },
}
</script>
