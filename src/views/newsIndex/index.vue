<template>
  <div>
    <van-nav-bar title="新闻" class="header" />
    <van-search
      v-model="searchKey"
      shape="round"
      background="#aaaaaa"
      placeholder="请输入搜索关键词"
      @search="search"
    />
    <van-list
      @load="load"
      offset="100"
      v-model="loading"
      :finished="loading"
      :immediate-check="false"
      finished-text="没有更多了"
    >
      <van-cell
        is-link
        class="cell"
        v-for="item in listData"
        :key="item.id"
        :to="{ name: 'newsDetail', query: { id: item.id } }"
      >
        <van-row gutter="20">
          <van-col :span="6">
            <van-image :src="item.image" height="40px" fit="contain" />
          </van-col>
          <van-col :span="18">
            <div class="title">{{ item.title }}</div>
            <div class="centent">{{ item.author }} {{ item.edit_time }}</div>
          </van-col>
        </van-row>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listData: [],
      current: 1,
      lastPage: 0,
      searchKey: "",
      loading: true
    };
  },
  created() {
    this.getData();
  },
  methods: {
    search() {
      this.listData = [];
      this.current = 1;
      this.getData();
    },
    async getData() {
      this.loading = true;
      const params = {
        page: this.current,
        title: this.searchKey
      };
      const data = await this.$axios.get("getAppNewsList", {
        params
      });
      if (data.error !== 200) {
        this.$notify({ type: "danger", message: data.msg });
        return false;
      }
      this.listData = [...this.listData, ...data.data.data];
      this.currentPage = data.data.current_page;
      this.lastPage = data.data.last_page;
      this.loading = false;
    },
    load() {
      this.loading = true;
      let newCurrent = this.current + 1;
      if (newCurrent > this.lastPage) {
        return false;
      }
      this.current = this.current + 1;
      this.getData();
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .van-nav-bar__title {
  color: #fff;
}
/deep/ .van-nav-bar {
  background-color: #5176ab;
}
.cell {
  display: flex;
  align-items: center;
}
.title {
  font-weight: bold;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.centent {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  color: #ddd;
}
</style>
