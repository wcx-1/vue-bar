<template>
  <!-- 文本框啊，单选多选框啊，有点像是注册账号时填的表格，展示了element-ui里面提供的一些常用组件 -->
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px">
      <!-- Activity name -->
      <!-- 基础的输入框 -->
      <el-form-item label="Activity name">
        <el-input v-model="form.name" />
      </el-form-item>
      <!-- Activity zone -->
      <!-- 下拉栏 -->
      <el-form-item label="Activity zone">
        <el-select v-model="form.region" placeholder="please select your zone">
          <el-option label="Zone one" value="shanghai" />
          <el-option label="Zone two" value="beijing" />
        </el-select>
      </el-form-item>
      <!-- Activity time -->
      <el-form-item label="Activity time">
        <!-- 当前的日期选择弹框 -->
        <el-col :span="11">
          <el-date-picker v-model="form.date1" type="date" placeholder="Pick a date" style="width: 100%;" />
        </el-col>
        <el-col :span="2" class="line">-</el-col>
        <!-- 当前的时间选择弹框 -->
        <el-col :span="11">
          <el-time-picker v-model="form.date2" type="fixed-time" placeholder="Pick a time" style="width: 100%;" />
        </el-col>
      </el-form-item>
      <!-- Instant delivery -->
      <!-- switch开关 -->
      <el-form-item label="Instant delivery">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <!-- Activity type -->
      <el-form-item label="Activity type">
        <!-- 多选框 -->
        <el-checkbox-group v-model="form.type">
          <el-checkbox label="Online activities" name="type" />
          <el-checkbox label="Promotion activities" name="type" />
          <el-checkbox label="Offline activities" name="type" />
          <el-checkbox label="Simple brand exposure" name="type" />
        </el-checkbox-group>
      </el-form-item>
      <!-- Resources -->
      <el-form-item label="Resources">
        <!-- 单选框 -->
        <el-radio-group v-model="form.resource">
          <el-radio label="Sponsor" />
          <el-radio label="Venue" />
        </el-radio-group>
      </el-form-item>
      <!-- Activity form -->
      <!-- 多行大输入框，可以调整大小 -->
      <el-form-item label="Activity form">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <!-- 创建取消按钮 -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit">Create</el-button>
        <el-button @click="onCancel">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
.line {
  text-align: center;
}
</style>

