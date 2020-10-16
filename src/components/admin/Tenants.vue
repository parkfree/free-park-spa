<template>
  <div class="block">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <b-icon icon="user" type="is-primary"></b-icon>
          <span class="ml-1">用户</span>
        </p>
      </header>
      <div class="card-content">
        <b-table :data="tenants" striped hoverable scrollable>
          <b-table-column field="tenantId" label="ID" v-slot="props">
            {{ props.row.id }}
          </b-table-column>
          <b-table-column field="carNumber" label="车牌号" v-slot="props">
            {{ props.row.carNumber }}
          </b-table-column>
          <b-table-column field="owner" label="名字" v-slot="props">
            {{ props.row.owner }}
          </b-table-column>
          <b-table-column field="nextScheduledAt" label="角色" v-slot="props">
            {{ props.row.role === 'ROLE_ADMIN' ? 'ADMIN' : 'USER' }}
          </b-table-column>
          <b-table-column field="periodMinutes" label="总缴费" v-slot="props">
            {{ props.row.totalPaidAmount / 100 }}
          </b-table-column>
          <b-table-column field="createdAt" label="注册时间" v-slot="props">
            {{ props.row.createdAt }}
          </b-table-column>

          <b-table-column label="操作" v-slot="props">
            <div class="buttons">
              <b-button type="is-info" size="is-small" icon-right="info-circle" tag="router-link" :to="{path: '/admin/tenant/' + props.row.id}"></b-button>
            </div>
          </b-table-column>
        </b-table>
      </div>
    </div>
  </div>
</template>

<script>
import handleApiErrorMixin from '@/mixins/handleApiError'

export default {
  name: 'Tenants',
  mixins: [handleApiErrorMixin],
  data () {
    return {
      tenants: []
    }
  },
  methods: {
    getTenants () {
      this.$http.get('/admin/tenants')
        .then((response) => {
          this.tenants = response.data
        })
        .catch((err) => {
          this.handleApiError(err, '获取用户列表失败')
        })
    }
  },
  mounted () {
    this.getTenants()
  }
}
</script>
