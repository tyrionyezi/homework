<style scoped>
.fifter-box{
    width: 100%;
    margin-bottom: 5px;
    padding-left: 2%;
    padding-top: 5px;
}
</style>

<template>
    <Row>
        <Col span="24" class="fifter-box">
            <Button type="primary" @click="updateLogistic">配送物流</Button>  
            <Button type="primary" @click="updateTransmission">获取最新物流</Button>     
        </Col>
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
            title="提取物流"
            width="60%"
            :loading="loading"
            @on-ok="edit">
                <Transfer
                :data="sourceList"
                :target-keys="targetList"
                :list-style="listStyle"
                :render-format="itemRender"
                :operations="['返回','提取']"
                :titles="['上一站','下一站']"
                @on-change="handleChange">
                <!-- <div :style="{float: 'right', margin: '5px'}">
                    <Button type="ghost" size="small" @click="reloadMockData">Refresh</Button>
                </div> -->
                 </Transfer>   
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
import Cookies from 'js-cookie';
    export default {
        components: {
            alCascader,
        },
        data () {
            return {
                sourceList:[],
                targetList:[],
                list:[],
                delFlag:false,
                editFlag:false,
                infoForm:{},
                loading: true,
                addr:[],
                data3: this.getMockData(),
                targetKeys3: this.getTargetKeys(),
                listStyle: {
                    width: '42%',
                    height: '400px'
                },
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        "fixed": "left",
                    },
                    {
                        "title": "订单编号",
                        "key": "id",
                        "width": 125,
                    },
                    {
                        "title": "收件人",
                        "key": "to_person",
                        "width": 100,
                    },
                    {
                        "title": "签收",
                        "key": "is_end",
                        "width": 150,
                        render:(h,params)=>{
                            return h('div',this.frAddress(params.index));
                        }
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
                        "title": "价格",
                        "key": "price",
                        "width": 80,
                        "sortable": true
                    },
                    {
                        "title": "备注",
                        "key": "note",
                        "width": 100,
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
                req['data']= this.targetList;
                console.log(this.targetList);
                console.log(req);
                
                this.$http.post(urls.logistic.userUpdateTransmission,req).then((res)=>{
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
                let areaId = Cookies.get('userAreaId')
                this.$http.get(urls.logistic.userGetTransmission,{params:{areaId:areaId}}).then((res)=>{
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
                let rt = '';
                if(this.list[index].is_end==2){
                    rt = '签收'
                }else{
                    rt = '未签收'
                }
                return rt;
                
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
            },

            updateLogistic(){
                this.editFlag = true;
                this.getSourceList();
                
            },


            getSourceList(){
                let areaId = Cookies.get('userAreaId');
                this.sourceList = [];
                this.$http.get(urls.logistic.getAreaLogistic,{params:{areaId}}).then((res)=>{
                    let result = res.data;
                    for(let i =0,len = result.length;i<len;i++){
                     this.sourceList.push({
                        key: result[i].id,
                        label: result[i].number,
                        next_stop: result[i].next_stop,
                        next_id:result[i].next_id,
                    });
                }
                })
            },

            getTargetList(){
                this.$http.get().then((res)=>{

                })

            },
            updateTransmission(){
                this.$http.get(urls.logistic.updateTransmission).then((res)=>{
                   
                })
            },
         

            getMockData () {
                let mockData = [];
                for (let i = 1; i <= 20; i++) {
                    mockData.push({
                        key: i.toString(),
                        label: 'Content ' + i,
                        description: 'The desc of content  ' + i,
                    });
                }
                return mockData;
            },
            getTargetKeys () {
                return this.getMockData()
                        .filter(() => Math.random() * 2 > 1)
                        .map(item => item.key);
            },
            handleChange (newTargetKeys) {
                console.log(newTargetKeys);
                this.targetList = newTargetKeys;
            },
            itemRender (item) {
                return item.label + ' - ' + item.next_stop;
            },
            reloadMockData () {
                this.data3 = this.getMockData();
                console.log(this.data3);
                this.targetKeys3 = this.getTargetKeys();
            }
        }
    }
</script>
