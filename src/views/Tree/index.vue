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
            :props="defaultProps">
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

<style scoped>
.tree{
    width: 300px;
    height: 100px;
    position: absolute;
    top: 150px;
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
</style>