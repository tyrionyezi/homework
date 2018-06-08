<template>
 <div class="warp home-warp">
     <div class="login-box">
         <div class="box-content">
             <div class="box-header">
                 <p>
                     <Icon type="log-in"></Icon>
                     <span>欢迎登陆</span>
                 </p>
             </div>
             <div class="box-body">
                  <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" placeholder="用户名">
                            <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="密码">
                            <Icon type="ios-locked-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="login" long>登陆</Button>
                    </FormItem>
                </Form>
                <!-- <Row class="row-item">
                    <Col class="input-icon" span="3"><Icon type="person"></Icon></Col>
                    <Col span="21"><Input type="text" class="set-border" v-model="userInfo.userId" placeholder="用户名" style="width:100%"></Input></Col>
                </Row>
                <Row class="row-item">
                    <Col class="input-icon" span="3"><Icon type="locked"></Icon></Col>
                    <Col span="21"><Input type="password" class="set-border" v-model="userInfo.usrpassword" placeholder="密码" style="width:100%"></Input></Col>
                </Row>
                <Row class="row-item">
                    <Col span="24">
                     <Button type="primary" long>登陆</Button>
                    </Col> -->
                </Row> 
             </div>

         </div>
         
     </div>
 </div>
  
</template>

<script>
import urls from  './../url/index';
import Cookies from 'js-cookie';
export default {
    data(){
        return {
            formInline: {
                    user: '',
                    password: ''
                },
            ruleInline: {
                user: [
                    { required: true, message: '请输入用户名！', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请填写密码！.', trigger: 'blur' },
                    { type: 'string', min: 6, message: '密码长度不少于6位', trigger: 'blur' }
                ]
            }
                
        }
    },
    methods: {

        /**@author
         * login
         * 
         */

        login(){
            this.$http.post(urls.user.userLogin,{...this.formInline}).then((res)=>{
                if(res.isHDa==1){
                Cookies.set('userId',res.data[0].id);
                Cookies.set('userName',res.data[0].name);
                Cookies.set('userTel',res.data[0].tel1);
                Cookies.set('userAreaId',res.data[0].area);
                 this.$router.push({name:'home'});
                }else{
                    this.$Notice.warning({
                    title: res.msg,
                    // desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
                    });
                }
            })

        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        }
    }
  
}
</script>

<style scoped>
.home-warp{
    width: 100%;
    height: 100%;
    /* background-color: aqua; */
    background-image: url("./../static/images/home.jpg");
    background-size: 100%;
    background-repeat: no-repeat;
}
.login-box{
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
}
.box-content{
    background-color: rgba(0, 0, 0, 0.41);
    border-radius: 5px;
    font-size: 14px;
    position: relative;
    color: white; 
    /* transition: all .2s; */
}
.box-header{
    border-bottom: 1px solid #e9eaec;
    padding: 14px 16px;
    line-height: 1;
}
.box-body{
    padding: 16px;
}
.input-icon{
    background-color: #a5a5a5;
    font-size: 20px;
    text-align: center;
    border-bottom-left-radius: 4px;
    border-top-left-radius: 4px;
    height: 32px;
    /* line-height: 1; */
}
.row-item{
    /* height: 50px; */
    margin-bottom: 15px;
    box-sizing: border-box;
}
.ivu-input{
    border-top-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
    /* background-color: red; */
    /* height: 30px !important; */
}
</style>
