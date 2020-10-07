<template>
  <user-container>
    <car-status></car-status>
    <payment-list></payment-list>
    <member-list></member-list>
  </user-container>
</template>

<script>
import CarStatus from '@/components/CarStatus'
import PaymentList from '@/components/TodayPayment'
import MemberList from '@/components/MemberList'
import UserContainer from '@/components/UserContainer'

export default {
  name: 'Home',
  components: {
    CarStatus,
    PaymentList,
    MemberList,
    UserContainer
  },
}
</script>
