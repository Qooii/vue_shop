<template>
  <div class="home">
    <el-container class="home_container">
      <!-- 头部区域 -->
      <el-header>
        <div>
          <img src="../assets/img/logo.jpg" alt="logo">
          <span>电商后台管理系统</span>
        </div>
        <el-button type="info" @click="logout">退出</el-button>
      </el-header>
      <!-- 页面主体区域 -->
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <!-- 侧边栏菜单区域 -->
          <el-menu background-color="#333" text-color="#fff" active-text-color="#49f" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
            <!-- 一级菜单区域 -->
            <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
              <!-- 一级菜单模板区域 -->
              <template slot="title">
                <!-- 图标 -->
                <i :class="iconObj[item.id]"></i>
                <!-- 文本 -->
                <span>{{item.authName}}</span>
              </template>
              <!-- 二级菜单 -->
              <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
                <template slot="title">
                  <!-- 图标 -->
                  <i class="el-icon-menu"></i>
                  <!-- 文本 -->
                  <span>{{subItem.authName}}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 右侧内容主体 -->
        <el-main>
          <!-- 路由占位符 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 左侧菜单数据
      menuList: [],
      iconObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'

      },
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: ''
    }
  },
  created () {
    this.getMenuList(),
      this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout () {
      this.$message.success("退出成功！")
      // 清除指定项
      window.sessionStorage.clear()
      // 清除指定项
      // window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList () {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      else {
        this.menuList = res.data
      }
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 保存连接的激活状态
    saveNavState (activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home,
.home_container {
  height: 100%;
}

.el-header {
  background-color: #555;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;

  > div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }

  img {
    width: 64px;
    // align-items: center;
  }
}

.el-aside {
  background-color: #333;

  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eee;
}

.iconfont {
  margin-right: 10px;
  font-size: 18px;
}

.toggle-button {
  background-color: #456;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.3em;
  cursor: pointer;
}
</style>