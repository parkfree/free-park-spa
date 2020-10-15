<template>
  <section class="sidebar-layout has-background-light">
    <b-sidebar position="static" fullheight open mobile="reduce">
      <div class="sidebar">
        <div class="block">
          <div class="has-text-primary is-size-3 has-text-weight-bold">
            Free Park
          </div>
        </div>
        <b-menu class="is-custom-mobile">
          <b-menu-list label="menu">
            <b-menu-item icon="tachometer-alt" label="控制台" @click="$router.push('/admin')"></b-menu-item>
            <b-menu-item icon="users" label="账号列表" @click="$router.push('/admin/members')"></b-menu-item>
            <b-menu-item icon="tags" label="缴费记录"></b-menu-item>
          </b-menu-list>
          <b-menu-list label="自己">
            <b-menu-item icon="user" label="个人主页"></b-menu-item>
            <b-menu-item icon="sign-out-alt" label="退出"></b-menu-item>
          </b-menu-list>
        </b-menu>
      </div>
    </b-sidebar>
    <div class="main-content">
      <router-view></router-view>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      expandOnHover: false,
      mobile: 'reduce',
      reduce: false
    }
  }
}
</script>

<style lang="scss" scoped>
.p-1 {
  padding: 1em;
}

.sidebar-layout {
  display: flex;
  flex-direction: row;
  align-items: stretch;

  .sidebar {
    padding: 1em;
    min-height: 100vh;
  }

  .main-content {
    padding: 1em;
    width: 100%;
  }
}

@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }

              ul {
                padding-left: 0;

                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }

          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                span:nth-child(2) {
                  display: none;
                }
              }

              ul {
                padding-left: 0;

                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }

          .menu-label:not(:last-child) {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
