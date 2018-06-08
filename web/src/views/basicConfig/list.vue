<style scoped>
@import "./../../static/css/comm.css";
</style>
<template>
    <Row>
        <Col span="24">
        <Table border :columns="columns" :data="list" style="width:100%"></Table>
        </Col>

        <Modal
            v-model="editFlag"
            title="修改信息"
            :loading="loading"
            @on-ok="edit">
            <Form ref="" :model="infoForm" :label-width="100" label-position="right">
                    <FormItem label="名称">
                        <Input v-model="infoForm.name"></Input>
                    </FormItem>
                    <FormItem label="描述">
                        <Input v-model="infoForm.desc"></Input>
                    </FormItem>
                    <FormItem label="备注">
                        <Input v-model="infoForm.note"></Input>
                    </FormItem>
                </Form>
        </Modal>
    </Row>
</template>
<script scoped>
import urls from  './../../url/index';
    export default {
        data () {
            return {
                TY:1,
                editFlag:false,
                loading: true,
                infoForm:{
                    id:'',
                    name:'',
                    desc:'',
                    note:'',
                },
                columns: [
                    {
                        title: '名称',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '描述',
                        key: 'desc'
                    },
                    {
                        title: '备注',
                        key: 'note'
                    },
                    {
                        title: '修改时间',
                        key: 'create_time'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delCategory(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                list:[],
            }
        },
        created(){
            // alert(1);
            this.TY=this.$route.query.type;
            this.getList(this.TY);
        },
        computed: {
            currentTY:function(){
                console.log(1);
                return this.$route.query.type;
            }
        },
        watch:{
            currentTY:'this.getList', 
            
        },
        methods: {
            show (index) {
                this.editFlag = true;
                this.infoForm.id = this.list[index].id;
                this.infoForm.name = this.list[index].name;
                this.infoForm.desc = this.list[index].desc;
                this.infoForm.note = this.list[index].note;
            },
            edit(){
                let req = {};
                req['data'] = this.infoForm;
                req['type'] = this.TY;
                this.$http.post(urls.cate.editItemList,req).then((res)=>{
                    if(res.data==1){
                          this.$Notice.success({
                            title: res.msg,
                         });
                    }else{
                        this.$Notice.error({
                            title: res.msg,
                         });
                    }
                    this.getList();
                    this.editFlag = false;

                })

            },
            remove (index) {
                this.data6.splice(index, 1);
            },

            delCategory(index){
                 let req = {};
                req['data'] = this.list[index].id;
                req['type'] = this.TY;
                this.$http.post(urls.cate.delCategory,req).then((res)=>{
                    if(res.data==1){
                          this.$Notice.success({
                            title: res.msg,
                         });
                    }else{
                        this.$Notice.error({
                            title: res.msg,
                         });
                    }
                    this.getList(this.TY);
                    this.editFlag = false;
                })

            },
            
            /**@author
             *获取数据
             */
            getList(ty){
                
                this.$http.get(urls.cate.getList,{params:{type:this.TY}}).then((res)=>{
                    this.list = res.data;
                })
                

            }



        }
    }
</script>
