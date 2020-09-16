<template>
  <div>
    <loginTop Text="登录bilibili">
      <span slot="right" @click="$router.push('/register')">注册</span>
    </loginTop>
        <loginText
        placeholder='请输入用户名'
        label='用户名'
        @contentWatch="res=>model.username = res"
        style="margin:15.001px 0;"
    />
        <loginText
        placeholder='请输入密码'
        label='密码'
        type ='password'
        @contentWatch="res=>model.password = res"
        style="margin:15.001px 0;"
    />
    <longinBtn BtnText="登录" @TextClick="clickRegister"/>
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
      const verify = /^.{6,16}/
      if (!this.model.username || !this.model.password) {
        this.$msg.fail('请将信息输出完整!')
        return
      }
      if (verify.test(this.model.name) && verify.test(this.model.uername) && verify.test(this.model.password)) {
        console.log('通过验证')
        const res = await this.$http.post('/login', this.model)
        console.log(res)
        if (res.data.code === 200) {
          localStorage.setItem('id', res.data.id)
          localStorage.setItem('token', res.data.token)
          setTimeout(() => {
            this.$router.push('/userinfo')
          }, 1000)
        } else {
          this.$msg.fail(res.data.msg)
        }
      } else {
        this.$msg.fail('格式不正确,请重新输入!')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
