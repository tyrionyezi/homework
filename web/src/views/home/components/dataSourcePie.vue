<template>
    <div style="width:100%;height:100%;" id="data_source_con"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'dataSourcePie',
    data () {
        return {
            //
        };
    },
    mounted () {
        this.$nextTick(() => {
            var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['已完成', '未完成']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '80%',
                        center: ['50%', '55%'],
                        data: [
                            {value: 2, name: '已完成', itemStyle: {normal: {color: '#9bd598'}}},
                            {value: 1, name: '未完成', itemStyle: {normal: {color: '#ffd58f'}}},
                            // {value: 543250, name: 'pc', itemStyle: {normal: {color: '#abd5f2'}}},
                            // {value: 798403, name: 'web', itemStyle: {normal: {color: '#ab8df2'}}},
                            // {value: 302340, name: 'others', itemStyle: {normal: {color: '#e14f60'}}}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            dataSourcePie.setOption(option);
            window.addEventListener('resize', function () {
                dataSourcePie.resize();
            });
        });
    }
};
</script>
