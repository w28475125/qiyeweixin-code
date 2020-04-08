<template>
  <div>
    <van-nav-bar
      title="文档浏览"
      class="header"
      left-arrow
      left-text="返回"
      @click-left="back(-1)"
    />
    <div class="title">{{ data.title }}</div>
    <div class="user-info">
      <div class="user-img">
        <img src="https://b.yzcdn.cn/vant/icon-demo-1126.png" alt="" />
      </div>
      <div class="user-author">
        <div class="author">{{ data.author }}</div>
        <div class="time">最后修改：{{ data.author }} {{ data.edit_time }}</div>
      </div>
    </div>
    <div class="accessory">
      <span>附件下载：</span>
      <a :download="data.file_name" :href="data.file_url">{{
        data.file_name
      }}</a>
    </div>
  </div>
</template>

<script>
import back from "@/mixins/back";
export default {
  mixins: [back],
  data() {
    return {
      data: {}
    };
  },
  created() {
    this.getData();
  },
  computed: {
    id() {
      return this.$route.query.id;
    }
  },
  methods: {
    async getData() {
      const params = {
        id: this.id
      };
      const data = await this.$axios.post("getAppFileDetail", params);
      if (data.error !== 200) {
        this.$notify({ type: "danger", message: data.msg });
      }
      this.data = data.data;
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
}
.user-info {
  display: flex;
  padding: 10px 20px;
  border-top: 1px dashed #ccc;
  border-bottom: 1px dashed #ccc;
  .user-img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .user-author {
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    .author {
      font-size: 14px;
      font-weight: bold;
    }
    .time {
      color: #bbb;
    }
  }
}
.accessory {
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  a {
    padding: 10px;
  }
}
</style>
