<template>
  <div>
    <loginTop Text="注册bilibili" >
       <span slot="right" @click="$router.push('/login')">登录</span>
    </loginTop>
    <loginText
        style="margin:4.167vw 0;"
        placeholder='请输入姓名'
        label='姓名'
        @contentWatch="res=>model.name = res"
    />
        <loginText
        placeholder='请输入用户名'
        label='用户名'
        @contentWatch="res=>model.username = res"
    />
        <loginText
        style="margin-top:4.167vw;"
        placeholder='请输入密码'
        label='密码'
        type ='password'
        @contentWatch="res=>model.password = res"
    />
    <longinBtn BtnText="注册" @TextClick="clickRegister"/>
  </div>
</template>

<script>
import loginTop from '../components/comonent/LoginTop'
import loginText from '../components/comonent/LoginText'
import longinBtn from '../components/comonent/LoginBtn'
export default {
  components: {
    loginTop,
    loginText,
    longinBtn
  },
  data () {
    return {
      model: {}
    }
  },
  methods: {
    async clickRegister () {
      if (!this.model.username || !this.model.password) {
        this.$msg.fail('请将信息输出完整!')
      }
      const verify = /^.{6,16}/
      if (verify.test(this.model.name) && verify.test(this.model.uername) && verify.test(this.model.password)) {
        const res = await this.$http.post('/register', this.model)
        console.log(res)
      } else {
        this.$msg.fail('账号密码格式不正确')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
