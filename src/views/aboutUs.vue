<template>
  <div >
    <div style="height:50px;line-height:50px;text-align: center;font-size:20px">添加关于我们</div>
    <div style="height:40px;padding-right:20px"><el-button type="primary" style="float:right" @click="handleSend">保存</el-button></div>
    <div style="width:98%;margin: 10px auto;height:500px" >
      <quill-editor 
        v-model="content" 
        ref="myQuillEditor" 
        :options="editorOption" 
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
      </quill-editor>
    </div>
  </div>
     
</template> 
<script>
    import { quillEditor } from 'vue-quill-editor'
    import {storeAboutUs} from '@/api/table'
    export default{
        data(){
            return {
                content:null,
                editorOption: {
                 modules: {
                  toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'color': [] }, { 'background': [] }],
                    ['clean'],
                    [{ 'align': [] },'image'],
                  ]
                },
                placeholder:'请输入关于我们的内容 ...'
                 },
                articleTitle:'关于我们',
            }
        },
        methods:{
            onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            console.log('', )
            },
            handleSend(){
              if (!this.content) {
                this.$message.error('内容不能为空');
                return
              }
              let params = {
                content: this.content
              }
              storeAboutUs(params).then( res => {
                 this.$notify({
                  title: '成功',
                  message: '操作成功',
                  type: 'success',
                  duration: 2000
                })
              })
            }
        }
    }
</script>
<style scoped>
.quill-editor{
  height: 600px!important;
}
</style>
