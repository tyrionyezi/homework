<style scoped>
@import "./../../static/css/comm.css";
.btn-warp{
    height: 50px;
    text-align: center;
}
</style>
<template>
    <Row class="win-warp">
        <Col span="12">
            <Form ref="formInline" :model="formInfo" :rules="ruleInline" label-position="right" :label-width="100">
                <FormItem label="名称：" prop="name">
                    <Input type="text" v-model.trim="formInfo.name" placeholder="请输入名称">
                    </Input>
                </FormItem>
                <FormItem label="描述：" prop="desc">
                    <Input v-model.trim="formInfo.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述..."></Input>
                </FormItem>
                <FormItem label="备注：">
                     <Input v-model="formInfo.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入描述..."></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="add">提交</Button>
                </FormItem>
            </Form>
        </col>
        <Col span="6">
         <span>&nbsp</span>
        </Col>
        <Col span="8">
            <div class="btn-warp">
                <Button v-show="addType==1" type="primary" @click="setAddType(1,'物质类型添加')">物质类型添加</Button>
                <Button v-show="addType!=1" type="text" @click="setAddType(1,'物质类型添加')">物质类型添加</Button>
            </div>
            <div class="btn-warp">
                <Button v-show="addType==2" type="primary" @click="setAddType(2,'运输方式添加')">运输方式添加</Button>
                <Button v-show="addType !=2" type="text" @click="setAddType(2,'运输方式添加')">运输方式添加</Button>
            </div>
            <div class="btn-warp">
                <Button v-show="addType==3" type="primary" @click="setAddType(3,'添加仓库')">添加仓库</Button>
                <Button v-show="addType !=3" type="text" @click="setAddType(3,'添加仓库')">添加仓库</Button>
            </div>
            <div class="btn-warp">
                <!-- <Button  type="text" @click="setStoreroom">添加仓库配置</Button> -->
            </div>
        </Col>
    </Row>
</template>
<script>
import urls from  './../../url/index';
import areaData from 'area-data';
    export default {
        data () {          
            return {
                formInfo:{
                    name:"",
                    desc:"",
                    note:"",
                },
                addType:1,
                addTypeName:'',
                ruleInline: {
                    name: [
                        { required: true, message: '请输入名称', trigger: 'blur' }
                    ],
                    desc: [
                        { required: true, message: '请输入描述简介', trigger: 'blur' },
                    ]
                }
            }
        },
        created(){
            this.$store.commit('changeOneTitle','添加配置');
            this.$store.commit('changeTwoTitle','物质类型添加');
        },
        methods: {
            /**@author 
             *  提交添加
             */
            add:function(){
                let self = this;
                let req = {};
                req['data']= self.formInfo;
                req['type'] = this.addType;
                if(!req.data.name){
                    this.$Notice.warning({
                            title: '名称不能为空！',
                        });
                    return
                }
                if(!req.data.desc){
                    this.$Notice.warning({
                            title: '描述不能为空！',
                        });
                    return
                }
                self.$http.post(urls.cate.addConfig,req).then((res)=>{
                    self.formInfo.name = '';
                    self.formInfo.desc = '';
                    self.formInfo.note = '';
                    if(res.data==1){
                        self.$Notice.success({
                            title: res.msg,
                         });
                    }else{
                        self.$Notice.error({
                            title: res.msg,
                         });
                    }
                })
            },

            /**@author yezi
             * 设置添加的类型
             */
            setAddType(type,typeName){
                this.addType = type;
                this.$store.commit('changeTwoTitle',typeName);
                // if(type==1){
                //     this.addType =1;
                //     // this.$store.commit(setCurrentPath('wuzhi'))
                   
                // }else if(type==2){
                //     this.addType =2;
                // }
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },

            setStoreroom(){
                this.$http.post(urls.cate.setStoreroom).then((res)=>{

                })
            }
        }
    }
</script>
