<template>
    <div class="tree">
        <div class="leftTree">
            <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            @node-click="handleNodeClick"
            @check-change="handleCheckChange" 
            :default-expand-all="true"
            :render-after-expand="false"
            :props="defaultProps"
            :check-on-click-node="true"
            >      
        </el-tree>
        </div> 
    </div>
</template>

<script>
  export default {
    data() {
      return {
        data: [{
          id: 1,
          label: '城市概览',
          icon:'el-icon-platform-eleme',
          children: [{
            id: '2',
            label: '烟感器',
          },{
            id:'3',
            label:'智能垃圾桶' 
          },{
              id:'4',
              label:'重点旧村改造'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods:{
        handleNodeClick(a,b,c){
           
        },
        handleCheckChange(a,b,c){
            console.log(a,b,c)
        }
    }
  };
</script>

<style lang="less" scoped>
.tree{
    width: 300px;
    height: 100px;
    position: absolute;
    top: 110px;
    left: 450px;
    zoom: 4;
}
.leftTree{
    width: 300px;
    height: 100px;
}

.el-tree{
    background: black;
    color: #fff;
    font-size: 24px;
}
/deep/ .el-icon-caret-right:before{
    content: '';
}
/deep/ .el-tree-node__content:hover{
    background-color: black;
}
</style>