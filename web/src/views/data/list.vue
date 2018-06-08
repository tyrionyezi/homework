<template>
    <Row>
        <Col span="24"> 
            <Table :columns="columns" :data="list" size="small" ref="table"></Table>
        </Col>
        <Modal
            v-model="delFlag"
            title="确认"
            @on-ok="delItem"
            width="300">
            <p style="text-align:center">确认删除？</p>
        </Modal>

        <Modal
            v-model="editFlag"
            title="修改信息"
            :loading="loading"
            @on-ok="edit">
            <Form ref="" :model="infoForm" :label-width="100" label-position="right">
                    <FormItem label="重量">
                        <Input v-model="infoForm.weigth"></Input>
                    </FormItem>
                     <FormItem label="价格">
                        <Input v-model="infoForm.price"></Input>
                    </FormItem>
                    <FormItem label="收件人">
                        <Input v-model="infoForm.to_person"></Input>
                    </FormItem>
                    <FormItem label="收件电话">
                        <Input v-model="infoForm.to_tel"></Input>
                    </FormItem>
                    <!-- <FormItem label="收件地址">
                        <al-cascader
                        v-model="infoForm.to_address"
                        style="width:100%;"
                    /> -->
                    </FormItem>
                     <FormItem label="详细地址">
                        <Input v-model="infoForm.to_add_detail"></Input>
                    </FormItem>
                    <FormItem label="发件人">
                        <Input v-model="infoForm.fr_person"></Input>
                    </FormItem>
                    <FormItem label="发件电话">
                        <Input v-model="infoForm.fr_tel"></Input>
                    </FormItem>
                    <!-- <FormItem label="发件地址">
                       <al-cascader
                        v-model="infoForm.fr_address"
                        style="width:100%;"
                    />
                    </FormItem> -->
                     <FormItem label="详细地址">
                        <Input v-model="infoForm.fr_add_detail"></Input>
                    </FormItem>
                    <FormItem label="备注">
                        <Input v-model="infoForm.note"></Input>
                    </FormItem>
                </Form>
        </Modal>
        <!-- <Col span="24">
            <Button type="primary" size="large" @click="exportData(1)"><Icon type="ios-download-outline"></Icon> Export source data</Button>
            <Button type="primary" size="large" @click="exportData(2)"><Icon type="ios-download-outline"></Icon> Export sorting and filtered data</Button>
            <Button type="primary" size="large" @click="exportData(3)"><Icon type="ios-download-outline"></Icon> Export custom data</Button>
        </Col> -->
    </Row>
</template>
<script>
import alCascader from './../../components/area-linkage/al-cascader.vue';
import urls from  './../../url/index';
    export default {
        components: {
            alCascader,
        },
        data () {
            return {
                list:[],
                delFlag:false,
                editFlag:false,
                infoForm:{},
                loading: true,
                addr:[],
                columns: [
                    {
                        "title": "订单编号",
                        "key": "id",
                        "fixed": "left",
                        "width": 125,
                    },
                    {
                        "title": "收件人",
                        "key": "to_person",
                        "width": 100,
                    },
                    {
                        "title": "价格",
                        "key": "price",
                        "width": 80,
                        "sortable": true
                    },
                    {
                        "title": "重量",
                        "key": "weigth",
                        "width": 80,
                    },
                    {
                        "title": "备注",
                        "key": "note",
                        "width": 100,
                    },
                    {
                        "title": "收件电话",
                        "key": "to_tel",
                        "width": 120,
                    },
                    {
                        "title": "收件人地址",
                        "key": "to_address",
                        "width": 200,
                        render:(h,params)=>{
                            return h('div',this.toAddress(params.index));
                        }
                    },
                    {
                        "title": "收件详细地址",
                        "key": "to_add_detail",
                        "width": 150,
                        
                    },
                    {
                        "title": "寄件人",
                        "key": "fr_person",
                        "width": 100,
                    },
                    {
                        "title": "寄件电话",
                        "key": "fr_tel",
                        "width": 120,
                    },
                    {
                        "title": "收件人地址",
                        "key": "fr_address",
                        "width": 200,
                        render:(h,params)=>{
                            return h('div',this.frAddress(params.index));
                        }
                    },
                    {
                        "title": "寄件详细地址",
                        "key": "fr_add_detail",
                        "width": 200,
                    },
                    {
                        "title": "编辑时间",
                        "key": "edit_time",
                        "width": 150,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        fixed:'right',
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
                                            this.showDelModal(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
            }
        },
        created(){
            this.getList();
            this.$store.commit('changeOneTitle',this.$route.meta.title);
            this.$store.commit('changeTwoTitle','');
        },
        methods: {
            exportData (type) {
                if (type === 1) {
                    this.$refs.table.exportCsv({
                        filename: 'The original data'
                    });
                } else if (type === 2) {
                    this.$refs.table.exportCsv({
                        filename: 'Sorting and filtering data',
                        original: false
                    });
                } else if (type === 3) {
                    this.$refs.table.exportCsv({
                        filename: 'Custom data',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
            },
            

            show(index){
                this.infoForm =Object.assign({},this.list[index]);
                // this.infoForm.to_address = JSON.parse(this.infoForm.to_address);
                // this.infoForm.fr_address = JSON.parse(this.infoForm.fr_address);
                this.editFlag = true;
                console.log(this.infoForm);
            },
            edit(){
                this.editFlag = false;
                let req = {};
                console.log(this.infoForm);
                this.$http.post(urls.logistic.updateLogistic,this.infoForm).then((res)=>{
                    if(res.data==1){
                          this.$Notice.success({
                            title: res.msg,
                         });
                    }else{
                        this.$Notice.error({
                            title: res.msg,
                         });
                    };

                    this.getList();

                })

            },
            showDelModal(index){
                this.delFlag =  true;
                this.loId = this.list[index].id;
            },

            getList(){
                this.$http.get(urls.logistic.getLogisticList).then((res)=>{
                    this.list = res.data;
                })
            },
            toAddress(index){
                let strToAddress = [];
                let temArr = JSON.parse(this.list[index].to_address);
                for(let i=0,len = temArr.length;i<len;i++){
                    strToAddress.push(temArr[i].name);
                }
                return strToAddress.join(',');
                
            },
            frAddress(index){
                let strFrAddress = [];
                let temArr = JSON.parse(this.list[index].fr_address);
                for(let i=0,len = temArr.length;i<len;i++){
                    strFrAddress.push(temArr[i].name);
                }
                return strFrAddress.join(',');
                
            },
            delItem(){
                this.$http.post(urls.logistic.delLogistic,{id:this.loId}).then((res)=>{
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
                    this.delFlag = false;

                })
            }
        }
    }
</script>
