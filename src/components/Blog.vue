<template>        
  <el-row
      type="flex" 
      justify="space-around"
      class="blog">
      <el-col>
          <el-card shadow="hover" class="blog-body">
              <p>博客分类：{{blog.category}}</p>
              <p>作者：{{blog.blogUsername}}</p>
              <h2 class="blog-title text-align-center">
                <router-link :to="/blog/+blog.id">{{blog.title}}</router-link>
                </h2>
              <p class="blog-content">简介：{{blog.introduction}}</p>   
              <el-collapse-transition>
                  <div v-if="blog.isShown">
                      <div v-html="blog.content" class="blog-content"></div>
                      <p>编辑于：{{blog.uploadTime}}</p>
                  </div>
              </el-collapse-transition>
            <div class="text-align-center">
              <el-button
                  round
                  @click="blog.isShown = !blog.isShown">
                  {{!blog.isShown ? "阅读全文" : "收起"}}
              </el-button>
            </div>
          </el-card>
      </el-col>
  </el-row>
</template>
<script>
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
export default {
  props: ["blog"],
  components: {
    CollapseTransition
  }
};
</script>
<style scoped>
.blog {
  margin-top: 20px;
  margin-bottom: 20px;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
    sans-serif;
  font-size: 15px;
}
.blog-body {
  border-radius: 15px;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica Neue, PingFang SC,
    Microsoft YaHei, Source Han Sans SC, Noto Sans CJK SC, WenQuanYi Micro Hei,
    sans-serif;
  font-size: 15px;
}
.blog-title {
  color: #303133;
}
.blog-content {
  color: #313235;
  word-break: break-word;
  line-height: 1.6;
}
h2 {
  margin-top: 1.66667em;
  margin-bottom: 0.83333em;
  font-size: 1.2em;
  line-height: 1.5;
  font-weight: 600;
  font-synthesis: style;
}
a {
  text-decoration: none;
  color: #313235;
}
a:hover{
  color:#409eff;
}
pre {
  padding: 0.88889em;
  font-size: 0.9em;
  word-wrap: normal;
  white-space: pre;
  background: #f6f6f6;
  border-radius: 4px;
}
.text-align-center {
  text-align: center;
}
body {
  color: #1a1a1a;
}
</style>


