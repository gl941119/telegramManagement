<template>
  <el-container>
    <el-header class="header">
      <com-header :titleName="titleName"></com-header>
    </el-header>
    <el-main>
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="设备列表" name="list">
            <com-facility-list :type="activeName"></com-facility-list>
          </el-tab-pane>
          <el-tab-pane label="设备绑定" name="bind">
            <com-facility-bind></com-facility-bind>
          </el-tab-pane>
          <el-tab-pane label="手机号绑定" name="phone">
            <!--<com-facility-phonebind></com-facility-phonebind>-->
            <com-facility-list :type="activeName"></com-facility-list>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </el-main>
  </el-container>
</template>
<script>
  import Cache from '@/utils/cache'
  import Request from '@/utils/require'
  import cache from "../../../utils/cache";
  import config from "../../../utils/config";
  import ComHeader from '@/components/header'
  import ComFacilityList from './com/com-facilityList'
  import ComFacilityBind from './com/com-facilityBind'
  // import ComFacilityPhonebind from './com/com-facilityPhoneBind'

  export default {
    name: "chatLog",
    components: {
      ComHeader,ComFacilityList,ComFacilityBind
    },
    data() {
      return {
        titleName: '设备管理',
        activeName: 'bind',

      }
    },
    mounted() {
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    },
  }
</script>

<style lang="scss" scoped>
  .el-container {
    background: #f4f4f4;
  }

  .header {
    background: white;
    height: 100px;
    line-height: 50px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
  }


</style>
