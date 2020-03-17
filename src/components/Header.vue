<template>
    <el-card shadow="hover">
        <el-row :gutter="1" class="app" type="flex" justify="center">
            <el-col :span="2">
                <router-link to="/" class="logo">知客</router-link>
            </el-col>
            <el-col :span="4">
                <el-autocomplete
                    v-model="queryString"
                    clearable
                    style="{width:400px}"
                    :fetch-suggestions="search"
                    placeholder="请输入内容"
                    @select="handleSelect"
                    >
                </el-autocomplete>
            </el-col>
            <el-col :span="1">
                <el-button
                    @click="handleSearch" 
                    icon="el-icon-search" 
                    circle 
                    class="search"
                    title="搜索">
                </el-button>
            </el-col>
            <el-col :span="1">
                <el-button 
                    class="menu-item" 
                    title="写博客"
                    @click="writeBlog"  
                    circle 
                    icon="el-icon-edit">
                </el-button>           
            </el-col>
            <el-col :span="1" v-if="isSigned">
                <el-popover>        
                    <el-row>
                      <el-col>
                        <el-button @click="userInfo">我的信息</el-button>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-button @click="userBlogs">我的博客</el-button>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col>
                        <el-button @click="signOut">退出登录</el-button>
                      </el-col>
                    </el-row>
                    <el-button class="menu-item" title="个人中心" circle icon="el-icon-more" slot="reference"></el-button>
                    </el-popover>
            </el-col>
            <el-col :span="1" v-if="!isSigned">
                <el-button class="menu-item" @click="signIn">登录/注册</el-button>
            </el-col>
        </el-row>
    </el-card>    
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isSigned: false,
      queryString: "",
      isDisabled: true,
      user: {}
    };
  },
  methods: {
    returnQueryStringToHome() {
      let queryString = this.queryString;
      this.$emit("get-query-string", queryString);
    },
    userInfo() {
      let user = this.$store.getters.getUser;
      this.$router.push(`/user/${user.id}/info`);
    },
    userBlogs() {
      let user = this.$store.getters.getUser;
      this.$router.push(`/user/${user.id}/blog`);
    },
    signOut() {
      localStorage.clear();
      this.user = null;
      this.isSigned = false;
      this.$store.commit("removeUser");
      this.$store.commit("removeIsSigned");
      this.$router.push("/");
    },
    search(queryString, cb) {
      let condition = this.queryString;
      let results = [];
      let array = [];
      axios
        .get("/BlogVue/api/blogs-condition", {
          params: {
            condition: condition
          }
        })
        .then(response => {
          let data = response.data;
          let blogs = data.blogs;
          if (data.errorCode == 0) {
            for (let blog of blogs) {
              let item = {
                value: blog.title,
                category: blog.category,
                blogId: blog.id
              };
              array.push(item);
            }
          }
          results = condition
            ? array.filter(this.createFilter(condition))
            : array;
          cb(results);
        });
    },
    createFilter(queryString) {
      return item => {
        return (
          item.value.indexOf(queryString) >= 0 ||
          item.category.indexOf(queryString) >= 0
        );
      };
    },
    handleSearch() {
      let queryString = this.queryString;
      this.$store.commit("addQueryString", queryString);
      // let pageNum = 1;
      this.$emit("get-query-string", queryString);
    },
    handleSelect(item) {
      // console.log(item);
      // console.log(this.queryString);
    },
    signIn() {
      this.$router.push("/signIn");
    },
    writeBlog() {
      let isSigned = this.$store.getters.getIsSigned;
      if (isSigned) this.$router.push("/write");
      else {
        this.$message.error("还没登录，先去登录吧！");
        this.$router.push("/signIn");
      }
    }
  },
  beforeMount() {
    this.isSigned = this.$store.getters.getIsSigned;
    this.user = this.$store.getters.getUser;
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
}
a:hover {
  color: #303133;
}
.logo {
  text-align: center;
  font-weight: bolder;
  color: #409eff;
  font-size: 30px;
}
.search:hover {
  color: #409eff;
}
.el-col {
  text-align: center;
  height: 50px;
  line-height: 50px;
}
.menu-item {
  color: #606266;
}
a:hover {
  color: #409eff;
}
.el-input_inner {
  display: block;
}
</style>

