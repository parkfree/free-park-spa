<template>
  <div class="block">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <b-icon icon="users" type="is-primary"></b-icon>
          <span class="ml-1">账号列表</span>
        </p>
        <div class="card-header-icon">
          <b-button type="is-primary" size="is-small" icon-left="user-plus" @click="addMember">
            添加账号
          </b-button>
        </div>
      </header>
      <div class="card-content">
        <template v-if="members.length === 0">
          <p class="has-text-centered">您还没有添加账号哦~</p>
        </template>
        <template v-else>
          <b-table :data="members" striped hoverable detailed>
            <b-table-column field="mobile" label="手机号" v-slot="props">
              {{ props.row.mobile }}
            </b-table-column>

            <b-table-column field="name" label="名字" v-slot="props">
              {{ props.row.name }}
            </b-table-column>

            <b-table-column field="points" label="积分" v-slot="props">
              {{ props.row.points }}
            </b-table-column>

            <b-table-column field="enablePoint" label="参与领积分" v-slot="props">
              <b-tag v-if="props.row.enablePoint" type="is-success">是</b-tag>
              <b-tag v-else>否</b-tag>
            </b-table-column>

            <b-table-column field="enablePay" label="参与缴费" v-slot="props">
              <b-tag v-if="props.row.enablePay" type="is-success">是</b-tag>
              <b-tag v-else>否</b-tag>
            </b-table-column>

            <b-table-column field="lastPaidAt" label="缴费日期" v-slot="props">
              {{ props.row.lastPaidAt }}
            </b-table-column>

            <b-table-column v-slot="props">
              <div class="buttons">
                <b-button type="is-primary" size="is-small" icon-right="user-edit" @click="updateMember(props.row.id)"/>
                <b-button type="is-danger" size="is-small" icon-right="trash-alt" @click="confirmDelete(props.row.id)"/>
              </div>
            </b-table-column>

            <template slot="detail" slot-scope="props">
              <p><strong>userId:</strong> <code>{{props.row.userId}}</code></p>
              <p><strong>openId:</strong> <code>{{props.row.openId}}</code></p>
            </template>
          </b-table>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import AddMemberForm from '@/components/AddMemberForm'
import UpdateMemberForm from '@/components/UpdateMemberForm'
import handleApiErrorMixin from '@/mixins/handleApiError'

export default {
  mixins: [handleApiErrorMixin],
  data () {
    return {
      members: [],
    }
  },
  methods: {
    getMembers () {
      this.$http.get('/members')
        .then((response) => {
          this.members = response.data
        })
        .catch((err) => {
          this.handleApiError(err, '获取账号列表失败')
        })
    },
    confirmDelete (id) {
      this.$buefy.dialog.confirm({
        message: '确定要删除账号吗？',
        confirmText: '确认',
        cancelText: '取消',
        onConfirm: () => this.deleteMember(id)
      })
    },
    deleteMember (id) {
      this.$http.delete(`/members/${id}`)
        .then(() => {
          this.getMembers()
        })
        .catch((err) => {
          this.handleApiError(err, '删除账号失败')
        })
    },
    addMember () {
      this.$buefy.modal.open({
        parent: this,
        destroyOnHide: true,
        events: {
          success: () => {
            this.getMembers()
          }
        },
        width: 640,
        component: AddMemberForm,
        trapFocus: true
      })
    },
    updateMember (id) {
      this.$buefy.modal.open({
        parent: this,
        destroyOnHide: true,
        props: { id },
        events: {
          success: () => {
            this.getMembers()
          }
        },
        width: 640,
        component: UpdateMemberForm,
        trapFocus: true
      })
    }
  },
  mounted () {
    this.getMembers()
  }
}
</script>
