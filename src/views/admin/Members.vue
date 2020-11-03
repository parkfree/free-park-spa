<template>
  <div>
    <div class="block">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            <b-icon icon="users" type="is-primary" class="mr-1"></b-icon>
            <span class="has-text-weight-bold mr-2">账号列表</span>
          </p>
          <div class="card-header-icon">
            <p>{{ total }} 条记录</p>
          </div>
        </header>
        <div class="card-content">
          <section>
            <b-table
                :data="members"
                :loading="loading"

                scrollable
                detailed

                paginated
                backend-pagination
                backend-sorting

                :total="total"
                :per-page="20"
                @page-change="onPageChange"
                @sort="onSortChange">

              <b-table-column field="id" label="ID" sortable v-slot="props">
                {{ props.row.id }}
              </b-table-column>

              <b-table-column field="tenant" label="用户" v-slot="props">
                {{ props.row.tenant.owner }} ({{ props.row.tenant.carNumber }})
              </b-table-column>

              <b-table-column field="name" label="名字" v-slot="props">
                {{ props.row.name }}
              </b-table-column>

              <b-table-column field="points" label="积分" sortable v-slot="props">
                {{ props.row.points }}
              </b-table-column>

              <b-table-column field="name" label="手机号" v-slot="props">
                {{ props.row.mobile }}
              </b-table-column>

              <b-table-column field="enablePoint" label="参与领积分" v-slot="props">
                <b-tag v-if="props.row.enablePoint" type="is-success">是</b-tag>
                <b-tag v-else>否</b-tag>
              </b-table-column>

              <b-table-column field="enablePay" label="参与缴费" v-slot="props">
                <b-tag v-if="props.row.enablePay" type="is-success">是</b-tag>
                <b-tag v-else>否</b-tag>
              </b-table-column>

              <b-table-column field="lastPaidAt" label="缴费日期" sortable v-slot="props">
                {{ props.row.lastPaidAt }}
              </b-table-column>

              <b-table-column field="createdAt" label="创建日期" sortable v-slot="props">
                {{ props.row.createdAt }}
              </b-table-column>

              <b-table-column v-slot="props">
                <div class="buttons">
                  <b-button type="is-primary" size="is-small" icon-right="user-edit"
                            @click="updateMember(props.row.id, props.row.tenant.id)"/>
                  <b-button type="is-danger" size="is-small" icon-right="trash-alt"
                            @click="confirmDelete(props.row.id, props.row.tenant.id)"/>
                </div>
              </b-table-column>

              <template slot="detail" slot-scope="props">
                <p><strong>userId:</strong> <code>{{props.row.userId}}</code></p>
                <p><strong>openId:</strong> <code>{{props.row.openId}}</code></p>
              </template>
            </b-table>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AddMemberForm from '@/components/admin/tenant/AddMemberForm'
import UpdateMemberForm from '@/components/admin/tenant/UpdateMemberForm'
import handleApiErrorMixin from '@/mixins/handleApiError'

export default {
  mixins: [handleApiErrorMixin],
  name: 'Members',
  data () {
    return {
      members: [],
      total: 0,
      page: 0,
      sortField: 'createdAt',
      sortOrder: 'desc',
      loading: true,
    }
  },
  methods: {
    getMemberPage () {
      this.loading = true
      this.$http.get(`/admin/members?page=${this.page}&size=20&sort=${this.sortField},${this.sortOrder}`)
        .then((response) => {
          this.members = response.data.content
          this.page = response.data.number
          this.total = response.data.totalElements
        })
        .catch((err) => {
          this.handleApiError(err, '获取账号列表失败')
        })
        .finally(() => {
          this.loading = false
        })
    },
    onPageChange (page) {
      this.page = page - 1;
      this.getMemberPage()
    },
    onSortChange (field, order) {
      this.sortField = field
      this.sortOrder = order
      this.getMemberPage()
    },
    confirmDelete (id) {
      this.$buefy.dialog.confirm({
        message: '确定要删除账号吗？',
        confirmText: '确认',
        cancelText: '取消',
        onConfirm: () => this.deleteMember(id)
      })
    },
    addMember () {
      this.$buefy.modal.open({
        parent: this,
        destroyOnHide: true,
        events: {
          success: () => {
            this.getMemberPage()
          }
        },
        width: 640,
        props: {
          tenantId: this.tenantId
        },
        component: AddMemberForm,
        trapFocus: true
      })
    },
    deleteMember (id) {
      this.$http.delete(`/admin/members/${id}`)
        .then(() => {
          this.getMemberPage()
        })
        .catch((err) => {
          this.handleApiError(err, '删除账号失败')
        })
    },
    updateMember (id, tenantId) {
      this.$buefy.modal.open({
        parent: this,
        destroyOnHide: true,
        props: {
          id,
          tenantId
        },
        events: {
          success: () => {
            this.getMemberPage()
          }
        },
        width: 640,
        component: UpdateMemberForm,
        trapFocus: true
      })
    }
  },
  mounted () {
    this.getMemberPage()
  }
}
</script>

<style lang="scss">
</style>
