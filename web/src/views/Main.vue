<style scoped>
    .layout{
        /* border: 1px solid #d7dde4; */
        background: #f5f7f9;
        position: relative;
        width: 100%;
        height: 100%;
        /* border-radius: 4px; */
        /* overflow: hidden; */
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .icon-class{
        position: absolute;
        right: 30px;
        line-height: 64px;
        font-size: 30px;
    }
</style>
<template>
    <div class="layout">
        <Layout style="width: 100%;height: 100%;">
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <!-- <MenuItem name="1-1">
                        <Icon type="ios-navigate"></Icon>
                        <span>物流统计</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <Icon type="plus-round"></Icon>
                        <span>添加物流</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <Icon type="ios-paper-outline"></Icon>
                        <span>所有物流</span>
                    </MenuItem>
                    <MenuItem name="1-4">
                        <Icon type="gear-a"></Icon>
                        <span>系统管理</span>
                    </MenuItem> -->

                    <Submenu name="1">
                        <template slot="title">
                            <Icon type="pie-graph"></Icon>
                            <span>物流统计</span>
                        </template>
                        <MenuItem name="1-1" @click.native="toRouter('home','')">物流统计</MenuItem>
                    </Submenu>
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-paper-outline"></Icon>
                            <span>所有物流</span>
                        </template>
                        <MenuItem name="2-1"@click.native="toRouter('logistics_add','')">
                            <Icon type="plus-round"></Icon>
                            <span>添加物流</span>
                        </MenuItem>
                        <MenuItem name="2-2" @click.native="toRouter('logistics_list','')">
                            <Icon type="ios-barcode-outline"></Icon>
                            <span>所有物流</span>
                        </MenuItem>
                        <MenuItem name="2-3" @click.native="toRouter('transtation','')">
                            <Icon type="ios-barcode-outline"></Icon>
                            <span>运输情况</span>
                        </MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="gear-a"></Icon>
                            <span>系统管理</span>
                        </template>
                        <MenuItem name="3-1" @click.native="toRouter('config_add','')">
                            <Icon type="plus-round"></Icon>
                            <span>添加</span>
                        </MenuItem>
                        <MenuItem name="3-2" @click.native="toRouter('deliveryList',2)">
                            <Icon type="connection-bars"></Icon>
                            <span>配送方式分类</span>
                        </MenuItem>
                        <MenuItem name="3-3" @click.native="toRouter('materialList',1)">
                            <Icon type="connection-bars"></Icon>
                            <span>物质分类</span>
                        </MenuItem>
                        <MenuItem name="3-4" @click.native="toRouter('storeroomList',3)">
                            <Icon type="connection-bars"></Icon>
                            <span>物流仓库</span>
                        </MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0'}" type="navicon-round" size="24"></Icon>
                    <span style="font-size: 20px;"><strong>{{currentPath}}</strong></span>
                    <Dropdown class="icon-class">
                        <a href="javascript:void(0)">
                            <Icon type="social-github-outline"></Icon>
                        </a>
                        <Dropdown-menu slot="list">
                            <Dropdown-item @click.native="goUserIndex">个人中心</Dropdown-item>
                            <Dropdown-item @click.native="loginOut">退出登录</Dropdown-item>
                        </Dropdown-menu>
                    </Dropdown>
                </Header>
                <Content :style="{margin: '15px', background: '#fff',overflow:hidden}">
                    <router-view></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
    export default {
        data () {
            return {
                isCollapsed: false
            }
        },
        computed: {
            rotateIcon () {
                return [
                    'menu-icon',
                    this.isCollapsed ? 'rotate-icon' : ''
                ];
            },
            menuitemClasses () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            currentPath(){
                let path
                // console.log(this.$store.state.modulesName.twoTitle);
                // console.log(this.$store.state.modulesName.twoTitle != '');
                if(this.$store.state.modulesName.twoTitle != ''){
                    path = this.$store.state.modulesName.oneTitle+'/'+this.$store.state.modulesName.twoTitle;
                }else{
                    path = this.$store.state.modulesName.oneTitle;
                }
                // console.log(path);
                return path;
            }
        },
        methods: {
            /**@author
             * 进入个人中心
             */
            goUserIndex(){
                this.$router.push({path:"/user/index"});
            },
            loginOut(){
                this.$router.push({path:"/login"});
                Cookies.remove('userId');
                Cookies.remove('userName');
                Cookies.remove('userTel');
                Cookies.remove('userAreaId');

            },
            collapsedSider () {
                this.$refs.side1.toggleCollapse();
            },

            toRouter(name,params){
                console.log(name);
                 this.$router.push({name:name,query: { type: params }});
            }
        }
    }
</script>