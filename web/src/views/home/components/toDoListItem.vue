<style lang="less">
    @import './styles/to-do-list-item.less';
</style>

<template>
    <Row class="to-do-list-item">
        <Col span="2" class="height-100">
            <Row type="flex" justify="center" align="middle" class="height-100">
                <Checkbox v-model="todoitem"></Checkbox>
            </Row>
        </Col>
        <Col span="22" class="height-100">
            <Row type="flex" justify="start" align="middle" class="height-100">
                <p class="to-do-list-item-text" @click="handleHasDid" :class="{hasDid: todoitem}">{{ content }}</p>
            </Row>
        </Col>
    </Row>
</template>

<script>
import urls from  './../../../url/index';
import Cookies from 'js-cookie';
export default {
    name: 'toDoListItem',
    data () {
        return {
            todoitem: false
        };
    },
    created(){
        // this.getCurrentLogistic();

    },
    props: {
        content: String
    },
    methods: {
        handleHasDid () {
            this.todoitem = !this.todoitem;
        },
        getCurrentLogistic(){
            let areaId = Cookies.get('userAreaId');
            this.$http.get(urls.logistic.getAreaLogistic,{params:{areaId}}).then((res)=>{
                    let result = res.data;
                    
            })
        }
    }
};
</script>