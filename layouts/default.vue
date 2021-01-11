<template>
  <div>
    <a-layout style="min-height: 100vh">
      <a-layout-sider>
        <div class="logo">
          MUSIC REVIEWER
        </div>
        <a-menu
          mode="inline"
          :default-selected-keys="['1']"
          theme="dark"
          :default-open-keys="['sub2']"
          :style="{ 'text-align': 'left'}"
        >
          <a-sub-menu key="sub1">
            <span slot="title"><a-icon type="user" />レビュワー管理</span>
            <a-menu-item key="1">
              <nuxt-link to="/users">
                レビュワー一覧
              </nuxt-link>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <span slot="title"><a-icon type="laptop" />楽曲管理</span>
            <a-menu-item key="3">
              <nuxt-link to="/music">
                楽曲一覧
              </nuxt-link>
            </a-menu-item>
          </a-sub-menu>    
        </a-menu>
      </a-layout-sider>

      <a-layout>
        <a-layout-header class="header">
          <a-avatar :src="currentUser.image" class="header__userImage"/>
          <span class="header__userName">{{ currentUser.name }}</span>
        </a-layout-header>
        <a-layout-content> 
          <Nuxt />
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  name: 'default-layout',
  data() {
    return {
      currentUser: {
        name: "IBUKI",
        image: require("~/mock/musics/users/current.jpg")
      }
    }
  },
  computed: {
  }
}
</script>

<style>
</style>
