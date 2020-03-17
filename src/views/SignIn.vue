<template>
    <div>
        <Header/>
        <el-row 
            type="flex" 
            class="top-10"
            justify="space-around">
            <el-col 
                :span="9" 
                class="app app-main text-align-center" >
                <el-card 
                    v-if="traggleSignIn">
                    <el-form 
                        ref="user" 
                        :model="user" 
                        label-width="80" 
                        :rules="rules1">
                        <el-form-item 
                            label="用户名：" 
                            prop="username">
                            <el-input 
                                v-model="user.username" 
                                placeholder="用户名/账号/email/phone" 
                                min="3" 
                                max="32" 
                                clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item  
                            label="密码:" 
                            prop="password" >
                            <el-input 
                                v-model="user.password" 
                                placeholder="请输入密码" 
                                type="password"
                                min="3" 
                                max="32" 
                                clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button 
                                type="primary" 
                                size="large" 
                                @click="signIn">
                                登录
                            </el-button>
                            <el-button 
                                type="danger" 
                                size="large" 
                                @click="resetForm('user')">
                                重置
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <el-button 
                        @click="traggleIsSignIn">
                        没有账号？点击注册吧
                    </el-button>
                </el-card>
                <el-card v-else>
                    <el-form 
                        ref="userSignUp" 
                        :model="userSignUp" 
                        label-width="80" 
                        :rules="rules2">
                        <el-form-item 
                            label="用户名:" 
                            prop="username" >
                            <el-input 
                              v-model="userSignUp.username" 
                              placeholder="请输入用户名"  
                              min="3" 
                              max="32" 
                              clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item 
                            label="账号:" 
                            prop="account">
                            <el-input 
                                v-model="userSignUp.account" 
                                placeholder="请输入账号"  
                                min="3"
                                max="32"
                                clearable>
                            </el-input>
                        </el-form-item >
                        <el-form-item
                            label="密码:"
                            prop="password" >
                            <el-input 
                                v-model="userSignUp.password" 
                                placeholder="请输入密码"  
                                min="3" 
                                max="32" 
                                type="password" 
                                clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item 
                            label="手机号:" 
                            prop="phone">
                            <el-input 
                                v-model="userSignUp.phone" 
                                placeholder="请输入手机号码"
                                min="3" 
                                max="32" 
                                clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item 
                            label="电子邮箱:" 
                            prop="email">
                            <el-input 
                                v-model="userSignUp.email" 
                                placeholder="请输入电子邮箱" 
                                clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button 
                                type="primary" 
                                size="large" 
                                @click="signUp">
                                注册
                            </el-button>
                            <el-button 
                                type="danger"
                                size="large" 
                                @click="resetForm('userSignUp')">
                                重置
                                </el-button>
                        </el-form-item>
                    </el-form>
                    <el-button 
                        @click="traggleIsSignIn">
                        已有账号？点击登录吧
                        </el-button>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import Header from "@/components/Header.vue";
import axios from "axios";
import qs from "qs";
export default {
  name: "signIn",
  data() {
    return {
      isSigned: false,
      traggleSignIn: true,
      user: {
        username: "",
        password: ""
      },
      userSignUp: {
        avatar: "",
        username: "",
        account: "",
        password: "",
        phone: "",
        email: ""
      },
      rules1: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      rules2: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        account: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 3 到 15 个字符之间",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "change" },
          {
            min: 3,
            max: 32,
            message: "长度在 3 到 32 个字符之间",
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "电话号码不能为空", trigger: "blur" },
          {
            min: 11,
            max: 14,
            message: "长度在 11 到 14 个数字之间",
            trigger: "change"
          }
        ],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    traggleIsSignIn() {
      this.$data.traggleSignIn = !this.$data.traggleSignIn;
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    signUp() {
      let user = this.$data.userSignUp;
      if (
        user.username == "" ||
        user.account == "" ||
        user.password == "" ||
        user.email == "" ||
        user.phone == ""
      ) {
        this.$message({
          message: "部分信息不能为空",
          type: "warning"
        });
      } else {
        const loading = this.$loading({
          lock: true,
          text: "正在注册...",
          spinner: "正在注册",
          background: "rgba(0, 0, 0, 0.7)"
        });
        let data = qs.stringify({
          username: user.username,
          account: user.account,
          password: user.password,
          email: user.email,
          phone: user.phone
        });
        axios({
          method: "post",
          url: "/BlogVue/api/sign-up",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: data
        }).then(response => {
          loading.close();
          let res = response.data;
          if (res.errorCode == 0) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.$store.commit("addUser", res.user);
            this.$store.commit("setIsSigned");
            this.$router.go(-1);
            localStorage.setItem("user", JSON.stringify(res.user));
            location.setItem("isSigned", true);
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        });
      }
    },
    signIn() {
      let user = this.$data.user;
      if (user.username == "" || user.password == "") {
        this.$message({
          message: "用户名或者密码不能为空",
          type: "warning"
        });
      } else {
        const loading = this.$loading({
          lock: true,
          text: "正在登录...",
          spinner: "正在登录",
          background: "rgba(0, 0, 0, 0.7)"
        });
        let data = qs.stringify({
          username: user.username,
          password: user.password
        });
        axios({
          method: "post",
          url: "/MyBlogServer/api/sign-in",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          data: data
        }).then(response => {
          loading.close();
          let res = response.data;
          if (res.errorCode == 0) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.$store.commit("addUser", res.user);
            this.$store.commit("setIsSigned");
            this.$router.go(-1);
            localStorage.setItem("user", JSON.stringify(res.user));
          } else {
            this.$message({
              message: res.message,
              type: "warning"
            });
          }
        });
      }
    }
  },
  components: {
    Header
  }
};
</script>
<style scoped>
.app-main {
  background-color: #ffffff;
}
.text-align-center {
  text-align: center;
}
</style>