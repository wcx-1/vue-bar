<template>
  <div class="app-container">
    <!-- 一个搜索框，搜节点的名字 -->
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />
    <!-- 树的展示 -->
    <el-tree ref="tree2" :data="data2" :props="defaultProps" :filter-node-method="filterNode" class="filter-tree" default-expand-all />

  </div>
</template>

<script>
export default {

  data() {
    return {
      filterText: '',
      // 这里头就是树的结构，id、标签、子节点
      data2: [{
        id: 1,
        label: 'Level one 1',
        children: [{
          id: 4,
          label: 'Level two 1-1',
          children: [{
            id: 9,
            label: 'Level three 1-1-1'
          }, {
            id: 10,
            label: 'Level three 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: 'Level one 2',
        children: [{
          id: 5,
          label: 'Level two 2-1'
        }, {
          id: 6,
          label: 'Level two 2-2'
        }]
      }, {
        id: 3,
        label: 'Level one 3',
        children: [{
          id: 7,
          label: 'Level two 3-1'
        }, {
          id: 8,
          label: 'Level two 3-2'
        }]
      }],
      // 这是啥？props？为啥不直接props？
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    // 对搜索框进行监视，只要搜索框输入了信息，就对树进行过滤搜索
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
    // 树节点过滤方法
    filterNode(value, data) {
      // 如果输入框里面没有值，就不用过滤
      if (!value) return true
      // 将不等于-1（没被过滤掉）的展示出来
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

