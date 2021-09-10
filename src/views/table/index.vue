<template>
  <!-- example下面的table表格 -->
  <div class="app-container">
    <el-table v-loading="listLoading" :data="list" element-loading-text="Loading" border fit highlight-current-row>
      <!-- id列 -->
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <!-- title列 -->
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <!-- author列 -->
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <!-- pageviews列 -->
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <!-- status列 -->
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <!-- Display_time列 -->
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入getList函数
import { getList } from '@/api/table'

export default {
  // 过滤器
  filters: {
    // 根据state展示不同颜色
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 存储表格数据
      list: null,
      // 表格是否正在加载中
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取表格数据
    fetchData() {
      // 表格加载中
      this.listLoading = true
      // getList调用了api/table.js里面的向后端请求数据的接口
      getList().then(response => {
        this.list = response.data.items
        // 表格已加载完成
        this.listLoading = false
      })
    }
  }
}
</script>
