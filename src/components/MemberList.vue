<template>
  <div class="block">
    <div class="card">
      <header class="card-header">
        <p class="card-header-title">
          <b-icon icon="users" type="is-primary"></b-icon>
          <span class="ml-1">账号列表</span>
        </p>
        <div class="card-header-icon">
          <b-button type="is-primary" size="is-small" icon-left="user-plus" @click="isAddMemberModalActive = true">
            添加账号
          </b-button>
        </div>
      </header>
      <div class="card-content">
        <template v-if="members.length === 0">
          <p class="has-text-centered">您还没有添加账号哦~</p>
        </template>
        <template v-else>
          <b-table :data="members" striped hoverable>
            <b-table-column field="mobile" label="手机号" v-slot="props">
              {{ props.row.mobile }}
            </b-table-column>
            <b-table-column field="lastPaidAt" label="最近使用日" v-slot="props">
              {{ props.row.lastPaidAt }}
            </b-table-column>
            <b-table-column field="userId" label="userId" v-slot="props">
              {{ props.row.userId }}
            </b-table-column>
            <b-table-column>
              <div class="buttons">
                <b-button type="is-primary" size="is-small" icon-right="user-edit"/>
                <b-button type="is-danger" size="is-small" icon-right="trash-alt"/>
              </div>
            </b-table-column>
          </b-table>
        </template>
      </div>
    </div>
    <b-modal
        v-model="isAddMemberModalActive"
        trap-focus
        :width="640"
        :destroy-on-hide="true"
        @close="getMembers">
      <template #default="props">
        <add-member-form @close="props.close"></add-member-form>
      </template>
    </b-modal>
  </div>
</template>

<script>
import AddMemberForm from '@/components/AddMemberForm'
import handleApiErrorMixin from '@/mixins/handleApiError'

export default {
  mixins: [handleApiErrorMixin],
  components: {
    AddMemberForm
  },
  data () {
    return {
      members: [],
      isAddMemberModalActive: false
    }
  },
  methods: {
    getMembers() {
      this.$http.get('/members')
        .then((response) => {
          this.members = response.data
        })
        .catch((err) => {
          this.handleApiError(err, '获取账号列表失败')
        })
    }
  },
  mounted () {
    this.getMembers()
  }
}
</script>
