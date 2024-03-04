// home页面的图表部分数据，另外一部分使用的是json-server模拟的数据
import Mock from 'mockjs'

//图表数据
let List = []
export default {
    getStatisticalData: () => {
        for (let i = 0; i < 7; i++) {
            //Mock.Random.float随机生成100到8000之间的浮点数
            List.push(
                Mock.mock({
                    苹果:Mock.Random.float(100,8000,0,0),
                    vivo:Mock.Random.float(100,8000,0,0),
                    oppo:Mock.Random.float(100,8000,0,0),
                    魅族:Mock.Random.float(100,8000,0,0),
                    三星:Mock.Random.float(100,8000,0,0),
                    小米:Mock.Random.float(100,8000,0,0),
                })
            )
        }
        return {
            code: 20000,
            data: {
                //饼图
                videoData: [
                    {
                        name: '小米',
                        value: 2999
                    },{
                        name: '苹果',
                        value: 5999
                    },{
                        name: 'vivo',
                        value: 1599
                    },{
                        name: 'oppo',
                        value: 1999
                    },{
                        name: '魅族',
                        value: 2999
                    },{
                        name: '三星',
                        value: 4599
                    }
                ],
                //柱状图
                userData: [
                    {
                        data: '周一',
                        new: 5,
                        active:200
                    },{
                        data: '周二',
                        new: 10,
                        active:500
                    },{
                        data: '周三',
                        new: 12,
                        active:550
                    },{
                        data: '周四',
                        new: 60,
                        active:800
                    },{
                        data: '周五',
                        new: 65,
                        active:550
                    },{
                        data: '周六',
                        new: 53,
                        active:770
                    },{
                        data: '周日',
                        new: 33,
                        active:770
                    }
                ],
                // 折线图
                orderData: {
                    date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007',],
                    data: List
                },
                tableData: [
                    {
                        name: 'oppo',
                        todatBuy: 500,
                        monthBuy: 3500,
                        totalBuy:22000
                    },{
                        name: 'vivo',
                        todatBuy: 300,
                        monthBuy: 2200,
                        totalBuy:24000
                    },{
                        name: '苹果',
                        todatBuy: 800,
                        monthBuy: 4500,
                        totalBuy:65000
                    },{
                        name: '小米',
                        todatBuy: 1200,
                        monthBuy: 6500,
                        totalBuy:45000
                    },{
                        name: '三星',
                        todatBuy: 300,
                        monthBuy: 2000,
                        totalBuy:34000
                    },{
                        name: '魅族',
                        todatBuy: 350,
                        monthBuy: 3000,
                        totalBuy:22000
                    }
                ]
            }
        }
    }
}