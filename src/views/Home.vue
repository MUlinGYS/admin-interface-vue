<template>
  <el-row style="display: flex; padding-top: 0">
    <el-col :span="8" style="padding-right: 10px">
      <el-card class="box-card">
        <div class="user">
          <img src="../assets/img/about29.jpg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access"></p>
          </div>
        </div>
        <div class="login">
          <p>
            上次登录时间:<span>{{ tableData[0].time }}</span>
          </p>
          <p>
            上次登录人员:<span>{{ tableData[0].name }}</span>
          </p>
        </div>
      </el-card>
      <el-card style="margin-top: 20px; height: auto">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableDatatwo"
            :prop="key"
            :label="val"
            :key="key">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="padding-left: 10px">
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.value"
          :body-style="{ display: 'flex', padding: 0 }">
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 280px"></div>
      </el-card>
      <div class="grap">
        <el-card style="height: 260px; width: 48%">
          <div ref="echarts2" style="height: 260px"></div>
        </el-card>
        <el-card style="height: 260px; width: 48%">
          <div ref="echarts3" style="height: 210px"></div>
        </el-card>
      </div>
      <!-- 管理员记录 -->

      <el-card class="guan">
        <div
          style="background-color: #dff0d8; padding: 20px; border-radius: 5px">
          <div style="font-size: 25px; font-weight: 600; color: #3f7840">
            管理员记录
          </div>
          <div
            style="color: #3f7840; font-size: 14px; padding: 5px 0px 5px 0px">
            记录管理实操
          </div>

          <el-input
            placeholder="请输入管理记录"
            v-model="input1"
            size="mini"
            @keyup.enter.native="inputEnter">
            <template slot="prepend">内容</template>
            <el-button slot="append" type="primary" @click="inputData"
              >确认</el-button
            >
          </el-input>
        </div>

        <div>
          <ul style="padding-inline-start: 0px">
            <li
              v-for="(item, index) in items"
              :key="index"
              class="list-item"
              style="padding: 10px 25px; font-size: 12px">
              <span style="padding-right: 25px">{{ index + 1 }}.</span>
              <span>{{ item }}</span>

              <button @click="deleteItem(index)" class="delete-button">
                删除
              </button>
            </li>
          </ul>
        </div>

        <div class="container">
          <span class="total" id="length">总数 : {{ items.length }}</span>
          <el-row style="margin-right: 10px; margin-bottom: 10px">
            <el-button @click="clearItems" class="clear-button">清除</el-button>
          </el-row>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
//json-server
import { instance } from '../utils/request'
//mock
import { getData } from '../api/Home'
import * as echarts from 'echarts'

export default {
  data() {
    return {
      isCollapse: true,
      tableData: [
        {
          name: '',
          time: '',
        },
      ],
      tableDatatwo: {},
      countData: [],

      // 记事本
      items: ['12.26-訂單數據已完成'],
      input1: '',
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      instance('/users').then((response) => {
        this.tableData = response.data.LoginTime
        this.tableDatatwo = response.data.tableDataprop
        this.countData = response.data.countData
      })
    },

    // 记事本
    inputData() {
      if (this.input1.trim() === '') {
        return
      }
      this.items.push(this.input1)
      this.input1 = ''
    },

    inputEnter() {
      this.inputData()
    },

    clearItems() {
      this.items = []
    },

    deleteItem(index) {
      this.items.splice(index, 1)
    },
  },
  mounted() {
    getData().then(({ data }) => {
      //基于准备好的dom。初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1)
      //指定图表的配置项和数据
      var echarts1Option = {}
      //处理数据 xAxis
      const { orderData, userData, videoData } = data.data
      const xAxis = Object.keys(orderData.data[0])
      const xAxisData = { data: xAxis }
      echarts1Option.xAxis = xAxisData
      echarts1Option.yAxis = {}
      echarts1Option.legend = xAxisData
      echarts1Option.series = []
      xAxis.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: 'line',
        })
      })
      // 显示图标
      echarts1.setOption(echarts1Option)

      //柱状图
      const echarts2 = echarts.init(this.$refs.echarts2)
      const echarts2Option = {
        legend: {
          textStyle: {
            color: '#333',
          },
        },
        grid: {
          left: '20%',
        },
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category',
          data: userData.map((item) => item.data),
          axisLine: {
            lineStyle: {
              color: '#17b3a3',
            },
          },
          axisLabel: {
            interval: 0,
            color: '#333',
          },
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3',
              },
            },
          },
        ],
        color: ['#2ec7c9', '#b6a2de'],
        series: [
          {
            name: '新增用戶',
            data: userData.map((item) => item.new),
            type: 'bar',
          },
          {
            name: '活躍用戶',
            data: userData.map((item) => item.active),
            type: 'bar',
          },
        ],
      }
      echarts2.setOption(echarts2Option)

      //饼状图
      const echarts3 = echarts.init(this.$refs.echarts3)
      const echarts3Option = {
        tooltip: {
          trigger: 'item',
        },
        color: [
          '#0f78f4',
          '#2ec7c9',
          '#b6a2de',
          '#dd536b',
          '#9462e5',
          '#39c362',
          '#3ed1cf',
        ],
        series: [{ data: videoData, type: 'pie' }],
      }
      echarts3.setOption(echarts3Option)
    })
  },
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  img {
    margin-right: 40px;
    height: 150px;
    width: 150px;
    border-radius: 50%;
  }
}

.userinfo {
  .name {
    font-size: 32px;
    margin-bottom: 10px;
  }
  .access {
    color: #999999;
  }
}

.login {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;
    margin-left: 10px;
    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

/deep/ .el-table .el-table__cell {
  text-align: center;
}

/deep/ .cell {
  color: #1bb4e7;
  text-align: center;
  padding: 0;
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
      line-height: 30px;
      height: 30px;
    }
    .desc {
      font-size: 14px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.grap {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

/* 记事本 */
.guan {
  margin-top: 20px;
  height: auto;
}
.list-item {
  border-bottom: 1px dashed #ccc;
  list-style-type: none;
}

.delete-button {
  margin-left: 10px;
  background-color: transparent;
  border: none;
}

.container {
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  margin-top: 20px;
}

.total {
  float: left;
  margin-top: 10px;
}

.clear-button {
  float: right;
}
</style>
