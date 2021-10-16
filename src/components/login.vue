<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="image_box">
        <img src="../assets/img/login.jpg"
             alt="头像">
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef"
               label-width="0px"
               class="login_form"
               :model="loginForm"
               :rules="loginFormRules">
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user-solid"
                    v-model="loginForm.username"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input type="password"
                    prefix-icon="el-icon-lock"
                    v-model="loginForm.password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary"
                     round
                     class="btn_left"
                     @click="login">登录</el-button>
          <el-button type="info"
                     round
                     class="btn_right"
                     @click="restLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 这是登录表单的数据对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击重置按钮，重置登录表单
    restLoginForm () {
      this.$refs.loginFormRef.resetFields()
    },
    // 点击登录按钮，实现表单的预验证
    login () {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) {
          return
        }
        else {
          const { data: res } = await this.$http.post('login', this.loginForm)
          if (res.meta.status !== 200) {
            return this.$message.error("登录失败！")
          }
          else {
            this.$message.success("登录成功！")
            // 1.将登录成功之后的 token 保存到客户端的 sessionStorage 中
            //    项目中除了登录之外的其它API接口，必须在登录之后才能访问
            //    token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
            window.sessionStorage.setItem('token', res.data.token)
            // 2.通过编程式导航跳转到后台主页，路由地址是 /home
            this.$router.push('/home')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b6b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fee;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;

  .image_box {
    height: 110px;
    width: 110px;
    border: 5px #eee solid;
    border-radius: 50%;
    padding: 3px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #eee;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #fff;
      opacity: 0.5;
    }
  }

  .login_form {
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 20px;
  }

  .btns {
    display: flex;
    justify-content: center;

    .btn_left,
    .btn_right {
      margin: 0 40px;
    }
  }
}
</style>