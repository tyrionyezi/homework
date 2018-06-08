<style scoped>
@import "./../../static/css/comm.css";
</style>

<template>
    <Row class="win-warp">
        <Col span="12">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120">
                <FormItem label="寄件人姓名" prop="fr_name">
                    <Input v-model="formValidate.fr_name" placeholder="请输入寄件人姓名"></Input>
                </FormItem>
                <FormItem label="寄件人手机号" prop="fr_tel">
                    <Input v-model="formValidate.fr_tel" placeholder="请输入寄件人手机号"></Input>
                </FormItem>
                <FormItem label="寄件地址">
                    <!-- <Input v-model="formValidate.fr_address" placeholder="请选择地址"></Input> -->
                      <al-cascader
                            v-model="formValidate.fr_address"
                            style="width:100%;"
                        />
                </FormItem>
                <FormItem label="详细地址" prop="fr_address_detail">
                    <Input v-model="formValidate.fr_address_detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写详细地址"></Input>
                </FormItem>
                <FormItem label="价格" prop="price">
                    <Input v-model="formValidate.price" placeholder="请输入价格"></Input>
                </FormItem>
                <FormItem label="重量" prop="weight">
                    <Input v-model="formValidate.weight" placeholder="请输入重量"></Input>
                </FormItem>
                <FormItem label="收件人姓名" prop="to_name">
                    <Input v-model="formValidate.to_name" placeholder="请输入姓名"></Input>
                </FormItem>
                <FormItem label="收件人手机号" prop="to_tel">
                    <Input v-model="formValidate.to_tel" placeholder="请输入手机号"></Input>
                </FormItem>
                <FormItem label="收件地址">
                    <al-cascader
                        v-model="formValidate.to_address"
                        style="width:100%;"
                    />
                </FormItem>
                 <FormItem label="详细收获地址" prop="to_address_detail">
                    <Input v-model="formValidate.to_address_detail" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="详细收获地址"></Input>
                </FormItem>
                <FormItem label="配送方式">
                    <Select v-model="formValidate.material_cate" placeholder="请选择物质类型">
                        <Option v-for="(it,index) in materialGriup" :value="it.id" :key="index">{{it.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="配送方式">
                    <Select v-model="formValidate.delivery_cate" placeholder="请选择配送方式">
                        <Option v-for="(item,index) in deliveryGroup" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="备注" prop="desc">
                    <Input v-model="formValidate.note" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请填写备注"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Col>
        <Col span="12">&nbsp;&nbsp;</Col>
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
                res1:[],
                showRes:[],
                materialGriup:[],
                deliveryGroup:[],
                formValidate: {
                    fr_name: '',
                    fr_tel: '',
                    fr_address:[],
                    fr_address_detail:'',
                    price:10,
                    weight:1,
                    to_name:'',
                    to_tel:'',
                    to_address:[],
                    to_address_detail:'',
                    material_cate:'',
                    delivery_cate:'',
                    note: ''
                },
                ruleValidate: {
                    fr_name: [
                        { required: true, message: '请填写发件人姓名', trigger: 'blur' }
                    ],
                    fr_tel: [
                        { required: true,  message: '请填写手机号！', trigger: 'blur' },
                    ],
                    fr_address_detail: [
                        { required: true,  message: '请填写详细地址！', trigger: 'blur' },
                    ],
                    // price: [
                    //     { required: true,  message: '请输入价格', trigger: 'blur' },
                    // ],
                    // weight: [
                    //     { required: true,  message: '请输入重量！', trigger: 'blur' },
                    // ],
                    to_name: [
                        { required: true,  message: '请输入收件人姓名', trigger: 'blur' },
                    ],
                    to_tel: [
                        { required: true,  message: '请输入收件人电话', trigger: 'blur' },
                    ],
                    to_address_detail: [
                        { required: true,  message: '请输入收件人详细地址', trigger: 'blur' },
                    ],
                   
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 1, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                }
            }
        },
        watch: {
            res1 (val) {
                this.showRes = val;
                console.log(this.showRes);
            },
            resDefault (val) {
                this.showRes = val;
            },
        },
        created(){
            this.getMaterialCategory();
            this.getDeliveryCategory();
            this.$store.commit('changeOneTitle',this.$route.meta.title);
            this.$store.commit('changeTwoTitle','');

        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.addLogistic();
                    } else {
                        this.$Notice.error({
                            title: "请填写必要字段！",
                         });
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },

            /**@author
             * 获取物质分类
             */
            getMaterialCategory(){
                this.$http.get(urls.cate.getList,{params:{type:1}}).then((res)=>{
                    this.materialGriup = res.data;
                    this.formValidate.material_cate = this.materialGriup[0].id;
                })
            },
            
            /**@author
             *  获取配送分类
             */
            getDeliveryCategory(){
                this.$http.get(urls.cate.getList,{params:{type:2}}).then((res)=>{
                    this.deliveryGroup = res.data;
                    this.formValidate.delivery_cate = this.deliveryGroup[0].id;                })
            },


            addLogistic(){
                let req = {};
                req = this.formValidate;
                console.log(this.formValidate);
                let fr_add = [];
                let to_add = [];

                if(this.formValidate.fr_address.length<=0){
                    this.$Notice.error({
                            title: "请选择寄件人地址",
                         });
                         return
                }

                if(this.formValidate.to_address.length<=0){
                    this.$Notice.error({
                            title: "请选择收件人地址",
                         });
                         return;
                }
                if(!this.formValidate.price){
                    this.$Notice.error({
                            title: "请输入价格默认为¥10",
                         });
                         return;
                }
                if(!this.formValidate.weight){
                    this.$Notice.error({
                            title: "请输入重量默认为1kg",
                         });
                         return;
                }

                for(let i = 0,len=this.formValidate.fr_address.length;i<len;i++){
            
                   fr_add.push(this.formValidate.fr_address[i].name);
                }

                for(let n = 0,leng=this.formValidate.to_address.length;n<leng;n++){
                    to_add.push(this.formValidate.to_address[n].name);
                }
                
                // req.fr_address = fr_add.join(',');
                // req.to_address = fr_add.join(',');
                req.fr_address = JSON.stringify(this.formValidate.fr_address);
                req.to_address = JSON.stringify(this.formValidate.to_address);

                this.$http.post(urls.logistic.addLogistic,req).then((res)=>{
                    if(res.data==1){
                        this.$Notice.success({
                            title: res.msg,
                         });
                    }else{
                        this.$Notice.error({
                            title: res.msg,
                         });
                    }
                     this.$router.replace({name:'logistics_add'});
                    
                })
            }
        }
    }
</script>
