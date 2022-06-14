<template>
<!-- 编辑性别导出层组件 -->
<!-- @cancel="$emit('close')"给父级（views-(user-profile)-index.vue)传事件 -->
<!-- :default-index="value"设置初始选中项的索引 -->
  <div class="update-gender">
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/user'

export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: { // 接收父级（views-(user-profile)-index.vue)传过来的数据，默认是“value”
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示
      })

      try {
        const localGender = this.localGender

        await updateUserProfile({
          gender: localGender
        })

        // 更新视图
        // 给父级（views-(user-profile)-index.vue)传递信息 因为父级使用v-model绑定的数据  所以这里默认是是‘input’
        this.$emit('input', localGender)

        // 关闭弹层
        this.$emit('close')

        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },

    onPickerChange (picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style scoped lang="less"></style>
