export default {
  methods: {
    // eslint-disable-next-line no-unused-vars
    back(index = -1) {
      this.$router.go(index);
    }
  }
};
