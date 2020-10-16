<template>
  <div>
    <car-status :tenant-id="id"></car-status>
    <today-payment :tenant-id="id"></today-payment>
    <member-list :tenant-id="id"></member-list>
  </div>
</template>

<script>
import CarStatus from '@/components/admin/tenant/CarStatus'
import TodayPayment from '@/components/admin/tenant/TodayPayment'
import MemberList from '@/components/admin/tenant/MemberList'

export default {
  name: 'Home',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  components: {
    CarStatus,
    TodayPayment,
    MemberList
  },
}
</script>
