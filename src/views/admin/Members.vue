<template>
  <div>
    <div class="block">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            <b-icon icon="users" type="is-primary" class="mr-1"></b-icon>
            <span class="has-text-weight-bold mr-2">Members</span>
          </p>
        </header>
        <div class="card-content">
          <admin-members></admin-members>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminMembers from '@/components/admin/AdminMembers'

export default {
  components: {
    AdminMembers
  },
}
</script>

<style lang="scss">
</style>
