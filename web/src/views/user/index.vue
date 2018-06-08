<style scoped>
.input-warp{
    text-align: center;
    font-size: 16px;
}
.input-row{
    height: 35px;
    line-height: 35px;
}
.input-key{
    text-align: right;
}
.input-value{
    text-align: left;
}
.icon-warp{
    width: 200px;
    height: 200px;
    border-radius: 100%;
    position: absolute;
    left: 50%;
    top: 0px;
    overflow: hidden;
    transform: translate(-50%);
}
.right-warp{
    width: 100%;
    height: auto;
    position: relative;
    text-align: center;
}
.icon-warp img {
    width: 100%;
}
.op-warp{
    padding-top: 220px;
}
.ot-warp{
    padding-top: 50px;
}
</style>


<template>
<div>
    <div class="input-warp">
        <Row>
            <Col span="12" style="border-right:1px;">
                <Row class="input-row">
                    <i-col span="6" class="input-key">姓名：</i-col>
                    <i-col span="1">  &nbsp;&nbsp;</i-col>
                    <i-col class="input-value" span="17">{{userInfo.name}}</i-col>
                </Row>
                <Row class="input-row">
                    <i-col span="6" class="input-key">性别：</i-col>
                    <i-col span="1">  &nbsp;&nbsp;</i-col>
                    <i-col class="input-value" span="17">{{userInfo.sex==1? "男":"女"}}</i-col>
                </Row>
                <Row class="input-row">
                    <i-col class="input-key" span="6">手机号：</i-col>
                    <i-col span="1">  &nbsp;&nbsp;</i-col>
                    <i-col class="input-value" span="17">{{userInfo.tel1}}</i-col>
                </Row>
                <Row class="input-row">
                    <i-col class="input-key" span="6">职位：</i-col>
                    <i-col span="1">  &nbsp;&nbsp;</i-col>
                    <i-col class="input-value" span="17">主管</i-col>
                </Row>
                <Row class="input-row">
                    <i-col class="input-key" span="6">邮箱：</i-col>
                    <i-col span="1">  &nbsp;&nbsp;</i-col>
                    <i-col class="input-value" span="17">{{userInfo.email}}</i-col>
                </Row>
                <Row class="input-row">
                    <i-col class="input-key" span="6">所属区域：</i-col>
                    <i-col span="1">  &nbsp;&nbsp;</i-col>
                    <i-col class="input-value" span="17">{{userInfo.area}}</i-col>
                </Row>
                <Row class="input-row">
                    <i-col class="input-key" span="6">密码：</i-col>
                    <i-col span="1">  &nbsp;&nbsp;</i-col>
                    <i-col class="input-value" span="17">
                        <i-button type="primary" size="small" @click="pwdFlag = true">修改密码</i-button>
                    </i-col>
                </Row>
            </Col>
            <Col span="12"><span>&nbsp;&nbsp;</span>
                <div class="right-warp">
                     <div class="icon-warp">
                        <img src="./../../static/images/icon2.jpg" alt="icon">
                    </div>
                    <div class="op-warp">
                        <Button type="ghost" @click="showInfoFlag">修改个人资料</Button>
                    </div>
                    <div class="ot-warp">
                        <Button type="ghost" @click="addFlag=true">添加用户</Button>
                    </div>
                </div>
            </Col>
        </Row>

    </div>
     <Modal
        v-model="pwdFlag"
        title="修改密码"
        :loading="loading"
        @on-ok="eidtUserPassword">
        <Form ref="editPasswordForm" :model="editPasswordForm" :label-width="100" label-position="right">
                <FormItem label="原密码" :error="oldPassError">
                    <Input v-model="editPasswordForm.oldPass" placeholder="请输入现在使用的密码" ></Input>
                </FormItem>
                <FormItem label="新密码" >
                    <Input v-model="editPasswordForm.newPass" placeholder="请输入新密码，至少6位字符" ></Input>
                </FormItem>
                <FormItem label="确认新密码" >
                    <Input v-model="editPasswordForm.rePass" placeholder="请再次输入新密码" ></Input>
                </FormItem>
            </Form>
     </Modal>

    <Modal
        v-model="infoFlag"
        title="修改个人信息"
        :loading="loading"
        @on-ok="updateUserInfo">
        <Form ref="editPasswordForm" :model="editUserInfoForm" :label-width="100" label-position="right">
                <FormItem label="姓名">
                    <Input v-model="editUserInfoForm.name"></Input>
                </FormItem>
                <FormItem label="性别">
                        <RadioGroup v-model="editUserInfoForm.sex">
                            <Radio label="1">
                                <span>男</span>
                            </Radio>
                            <Radio label="2">
                                <span>女</span>
                            </Radio>
                        </RadioGroup>
                </FormItem>
                <FormItem label="手机号1">
                    <Input v-model="editUserInfoForm.tel1"></Input>
                </FormItem>
                <FormItem label="手机号2">
                    <Input v-model="editUserInfoForm.tel2"></Input>
                </FormItem>
                <FormItem label="邮箱">
                    <Input v-model="editUserInfoForm.email"></Input>
                </FormItem>
                <!-- <FormItem label="管理区域">
                    <Select v-model="editUserInfoForm.areaId" placeholder="请选择配送区域">
                        <Option v-for="(item,index) in storeroomList" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem> -->
            </Form>
     </Modal>

     <Modal
        v-model="addFlag"
        title="添加用户"
        :loading="loading"
        @on-ok="handleSubmit('addUserInfoFrom')">
        <Form ref="addUserInfoFrom" :model="addUserInfoFrom" :rules="ruleValidate" :label-width="100" label-position="right">
                <FormItem label="姓名" prop="name">
                    <Input v-model="addUserInfoFrom.name"></Input>
                </FormItem>
                <FormItem label="性别" prop="sex">
                        <RadioGroup v-model="addUserInfoFrom.sex">
                            <Radio label="1">
                                <span>男</span>
                            </Radio>
                            <Radio label="2">
                                <span>女</span>
                            </Radio>
                        </RadioGroup>
                </FormItem>
                <FormItem label="手机号1" prop="tel1">
                    <Input v-model="addUserInfoFrom.tel1"></Input>
                </FormItem>
                <FormItem label="手机号2" prop="tel2">
                    <Input v-model="addUserInfoFrom.tel2"></Input>
                </FormItem>
                <FormItem label="邮箱" prop="email">
                    <Input v-model="addUserInfoFrom.email"></Input>
                </FormItem>
                <FormItem label="选择省份">
                    <Select v-model="oneAddressId" @on-change="getTwoAddess" placeholder="请选择配送区域">
                        <Option v-for="(item,index) in oneAddress" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem label="选择市">
                    <Select v-model="twoAddressId" @on-change="getFifterStoreroom" placeholder="请选择配送区域">
                        <Option v-for="(item,index) in twoAddress" :value="item.id" :key="item.id">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <!-- <FormItem label="管理区域">
                    <Select v-model="storeroomId" placeholder="请选择配送区域">
                        <Option v-for="(item,index) in storeroomList" :value="item.number" :key="item.number">{{item.name}}</Option>
                    </Select>
                </FormItem> -->
            </Form>
     </Modal>
    
</div>
  
</template>

<script>
import urls from  './../../url/index';
import Cookies from 'js-cookie';
import areaData from 'area-data';
export default {
    data () {
            const valideRePassword = (rule, value, callback) => {
                if (value !== this.editPasswordForm.newPass) {
                    callback(new Error('两次输入密码不一致'));
                } else {
                    callback();
                }
            };
            return {
                pwdFlag: false,
                infoFlag:false,
                addFlag:false,
                loading: true,
                oldPassError: '',
                oneAddress:[],
                oneAddressId:'',
                twoAddressId:'',
                twoAddress:[],
                storeroomList:[],
                storeroomId:'',
                editPasswordForm: {
                    oldPass: '',
                    newPass: '',
                    rePass: ''
                },
                editUserInfoForm:{
                    name:'',
                    sex:'',
                    tel1:'',
                    tel2:'',
                    email:'',
                    areaId:'',
                },
                addUserInfoFrom:{
                    name:'',
                    sex:1,
                    tel1:'',
                    tel2:'',
                    email:'',
                },
                sexGruop:{
                    male:"1",
                    female:"2",
                },
                uId:'',
                userInfo:{},
                ruleValidate: {
                    name: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    sex: [
                        { required: true, message: '请选择性别', trigger: 'change' }
                    ],
                    email: [
                        { required: true, message: '邮箱不能为空', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
                    ],
                    storeroomId: [
                        { required: true, message: '配送区域不能为空', trigger: 'blur' }
                    ],
                    // tel1: [
                    //     { required: true, min:11, message: '手机号不能为空', trigger: 'blur' },
                    //     { type: 'number', max:11, message: '请输入正确的手机号', trigger: 'blur' }
                    // ],
                },
            }
        },
        created(){
            this.getUserInfo();
            // this.getStoreroom();
            this.getOneAddress();
            this.$store.commit('changeOneTitle',this.$route.meta.title);
            this.$store.commit('changeTwoTitle','');
        },
        methods: {

            getOneAddress(){
                // console.log(areaData['86']);
                let arr = areaData['86'];
                for(let key  in arr){
                    this.oneAddress.push({
                        id:key,
                        name:arr[key],
                    })
                }
            },

            getTwoAddess(value){
                // console.log(areaData[value]);
                 this.twoAddressId = '';
                 this.twoAddress = [];
                for(let key in areaData[value]){
                    this.twoAddress.push({
                        id:key,
                        name:areaData[value][key],
                    })
                }

            },

            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    console.log(valid);
                    if (valid) {
                        this.addUser();
                    } else {
                        this.$Message.error('请填写字段!');
                    }
                })
            },

            asyncOK () {
                setTimeout(() => {
                    this.pwdFlag = false;
                }, 2000);
            },

            getFifterStoreroom(value){
                if(!value){
                    return;
                }
                this.$http.get(urls.cate.getStoreroom,{params:{number:value}}).then((res)=>{
                    this.storeroomList = res.data;
                    this.storeroomId = this.storeroomList[0].id;
                })

            },

            /**@author
             * 
             * 获取用户信息
             */
            getUserInfo(){
                let id = Cookies.get('userId');
                if(id==undefined){
                    this.$Message.warning('请重新登录！');
                    return;
                }
                this.uId = id;
                this.$http.post(urls.user.getUserInfo,{id:id}).then((res)=>{
                    this.userInfo = res.data[0];
                    this.editUserInfoForm.areaId = this.userInfo.area;
                })
            },
            /**@author
             * 
             * 修改密码
             */
            eidtUserPassword(){
                if(this.editPasswordForm.newPass!=this.editPasswordForm.rePass){
                     this.$Message.warning('两次输入密码不一致！');
                     return
                }
                let req = {};
                req['id'] = this.uId;
                req['oldPass'] = this.editPasswordForm.oldPass;
                req['newPass'] = this.editPasswordForm.newPass;
                this.$http.post(urls.user.eidtUserPassword,req).then((res)=>{
                     this.pwdFlag = false;
                     if(res.data==1){
                          this.$Notice.success({
                            title: res.msg,
                            // desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                         });
                     }else{
                         this.$Notice.error({
                            title: res.msg,
                            // desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                         });
                     }
                })
            },

            /**@author
             * 
             * 修改个人信息
             */
            updateUserInfo(){
                let req = {};
                req['name'] = this.editUserInfoForm.name;
                req['sex'] = this.editUserInfoForm.sex;
                req['tel1'] = this.editUserInfoForm.tel1;
                req['tel2'] = this.editUserInfoForm.tel2;
                req['email'] = this.editUserInfoForm.email;
                req['area'] = this.editUserInfoForm.areaId;
                req['id'] = this.uId;
                this.$http.post(urls.user.updateUserInfo,req).then((res)=>{
                    if(res.data==1){
                        this.getUserInfo();
                          this.$Notice.success({
                            title: res.msg,
                         });
                    }else{
                        this.$Notice.error({
                            title: res.msg,
                         });
                    }
                    this.infoFlag = false;

                })
            },
            
            /**@author
             * 显示修改模太框
             */
            showInfoFlag(){
                this.infoFlag = true;
                this.editUserInfoForm.name = this.userInfo.name;
                this.editUserInfoForm.sex = this.userInfo.sex;
                // console.log(this.editUserInfoForm.sex);
                this.editUserInfoForm.tel1 = this.userInfo.tel1;
                this.editUserInfoForm.tel2 = this.userInfo.tel2;
                this.editUserInfoForm.email = this.userInfo.email;
            },

            /**@author
             * 添加用户
             */
            addUser(){
                let req = {};
                req['name'] = this.addUserInfoFrom.name;
                req['sex'] = this.addUserInfoFrom.sex;
                req['tel1'] = this.addUserInfoFrom.tel1;
                req['tel2'] = this.addUserInfoFrom.tel2;
                req['email'] = this.addUserInfoFrom.email;
                req['areaId'] = this.storeroomId;
                this.$http.post(urls.user.addUser,req).then((res)=>{
                    
                    if(res.data==1){
                         this.$Notice.success({
                            title: res.msg,
                         });
                    }else{
                        this.$Notice.error({
                            title: res.msg,
                         });
                    }

                    this.addFlag = false;
                    this.addUserInfoFrom.name = '';
                    this.addUserInfoFrom.sex = 1;
                    this.addUserInfoFrom.tel1 = '';
                    this.addUserInfoFrom.tel2 = '';
                    this.addUserInfoFrom.email = '';

                })
            },


            /**
             * 
             * 获取仓库地址列表
             */
            getStoreroom(){
                this.$http.get(urls.cate.getList,{params:{type:3}}).then((res)=>{
                    this.storeroomList = res.data;
                    this.storeroomId = this.storeroomList[0].number;

                })

            },



        }
}
</script>

