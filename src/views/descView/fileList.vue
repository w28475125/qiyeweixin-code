<template>
  <div>
    <van-nav-bar title="最新文件" class="header" />
    <van-search
      v-model="searchKey"
      shape="round"
      background="#aaaaaa"
      placeholder="请输入搜索关键词"
      @search="search"
    />
    <van-list
      finished-text="没有更多了"
      @load="load"
      offset="100"
      v-model="loading"
      :finished="loading"
      :immediate-check="false"
    >
      <van-cell
        class="cell"
        is-link
        v-for="item in listData"
        :key="item.id"
        :to="{ name: 'descView', query: { id: item.id } }"
      >
        <div class="title van-ellipsis">
          {{ item.title }}
        </div>
        <div class="label van-ellipsis">
          <span> 所有者：{{ item.author }} </span>
          <span> 创建时间：{{ item.add_time | formatDate }} </span>
          <span> 修改时间：{{ item.edit_time }} </span>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKey: "",
      listData: [],
      current: 1,
      lastPage: 0,
      loading: true
    };
  },
  created() {
    this.getData();
  },
  computed: {
    type() {
      return this.$route.query.type;
    }
  },
  methods: {
    search() {
      this.listData = [];
      this.current = 1;
      this.lastPage = 0;
      this.getData();
    },
    async getData() {
      this.loading = true;
      const params = {
        type: this.type,
        title: this.searchKey,
        page: this.current
      };
      const data = await this.$axios.get("getAppFileList", {
        params
      });
      if (data.error !== 200) {
        this.$notify({ type: "danger", message: data.msg });
        return false;
      }
      this.listData = [...this.listData, ...data.data.data];
      this.current = data.data.current_page;
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
/deep/ .van-search {
  padding: 5px;
}
.cell {
  display: flex;
  align-items: center;
  .title {
    font-weight: bold;
    font-size: 14px;
  }
  .label {
    color: #bbb;
    font-size: 12px;
  }
}
</style>
