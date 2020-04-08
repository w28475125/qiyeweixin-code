import Vue from "vue";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/zh-cn";
dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

const filters = {
  /**
   * 功能：将时间戳按照给定的 时间/日期 格式进行处理
   * @param {Number} date 时间戳
   * @returns {String} 规范后的 时间/日期 字符串
   */
  formatDate: function(date, format) {
    if (!date) {
      return "---";
    }
    return dayjs(date.toString().length <= 10 ? date * 1000 : date).format(
      format ? format : "YYYY-MM-DD HH:mm:ss"
    ); // 使用 dayjs 格式化时间
  }
};
export default Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
