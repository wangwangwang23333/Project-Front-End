<template>
  <el-row style="height: 100%">
    <el-col :span="15" style="height: 100%">
    <!--用户基本信息-->
    <p class="bigFontSize" style="float: left">您好，我是{{hostRealName}}</p>
      <p class="smallgretfontsize"
         style="float: left;position:relative;top:60px;left: -300px" >
        注册时间:{{hostCreateTime}}
      </p>
      <!--下面是实现修改资料弹出框的代码-->
      <br><br><br><br><br>
      <el-button
          class="Mybutton"
          style="position: relative;left:-370px;top:10px"
          @click="dialog=true">
        <u>
          修改个人资料
        </u>
      </el-button>
      <el-drawer
          title="个人资料"
          :visible.sync="dialog"
          :direction="direction"
          ref="drawer"
          :before-close="handleClose">
        <!--在抽屉内部定义表单-->
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" >

          <el-image
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/任务中心-首次修改昵称.png"
              style="width: 40px;height: 40px;position: relative;left:-150px" ></el-image>
          <span
              class="bigFontSize"
              style="font-size: 25px;position: relative;top: -5px;right: 140px">
            昵称
          </span>
          <br>

          <el-form-item label="新的昵称"  prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-divider></el-divider>

          <el-image
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/性别.png"
              style="width: 40px;height: 35px;position: relative;left:-150px" ></el-image>
          <span
              class="bigFontSize"
              style="font-size: 25px;position: relative;top: -5px;right: 140px">
            性别
          </span>
          <br>

          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="性别">
              <el-option label="男" value="男"> </el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>


        </el-form>
        <div >
          <el-button
              @click="cancelForm" class="Mybutton"
              style="width: 120px;height: 50px">
            取消修改
          </el-button>
          <el-button
              type="primary"
              class="Mybutton"
              style="width: 120px;height: 50px;background-color: #025f08;
              color:white"
              @click="$refs.drawer.closeDrawer()"
              :loading="loading">{{ loading ? '更新中...' : '保存' }}
          </el-button>
        </div>
      </el-drawer>


      <br><br>
      <el-card shadow="hover" style="width: 550px;height: 200px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;">
        <!--信息卡片-->
        <el-col :span="15">
          <el-image
              class="icon" src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户名.png">
          </el-image>
          <span class="smallgretfontsize"
                style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            用户名:{{hostNickName}}
          </span>
          <el-image
              class="icon" :src="scoreImgList[rateNum]"
              style="float: right;position: relative;left: -70px">
          </el-image>
          <span class="smallgretfontsize"
                style="color: #333333;float: right;position: relative;left:30px;top:5px" >
            {{rateString[rateNum]}}
          </span>
<!--          真名-->
          <br><br>
          <el-image
              class="icon" src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/组件-姓名.png"
          >
          </el-image>
          <span class="smallgretfontsize"
                style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            姓名:{{hostRealName}}
          </span>
<!--          总评价数-->
          <br><br>
          <el-image
              class="icon" src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/评价 (3).png">

          </el-image>
          <span class="smallgretfontsize"
                style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            共收获{{reviewNum}}条评价
          </span>
        <!--评分-->
          <el-rate v-model="averageRate" disabled
                   show-text
                   show-score
                   text-color="#ff9900"
                   score-template="{value}"
                   style="position:relative;top:8px" >
          </el-rate>
<!--          性别-->
          <br>
          <span
              class="smallgretfontsize"
              style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            性别：{{hostSexString}}
          </span>
          <el-image
              class="icon"
              :src="sexImgList[hostSexString]"
              style="width:25px;height:25px;position: relative;left:5px;top:5px">

          </el-image>
        </el-col>
        <el-col :span="1"
                style="height: 190px ;position: relative;top:-90px">
          <el-divider
              direction="vertical"
              class="el-divider--vertical"></el-divider>
        </el-col>
        <el-col :span="8">
          <el-image
              class="icon"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (1).png">

          </el-image>
          <span
              class="smallgretfontsize"
              style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            已发布{{publishedNum}}套房源
          </span>
          <br><br><br>
          <el-image
              class="icon"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/审核.png"></el-image>
          <span
              class="smallgretfontsize"
              style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            {{pendingReviewNum}}套审核中的房源
          </span>
          <br><br><br>
          <el-image
              class="icon" src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/草稿箱.png"></el-image>
          <span
              class="smallgretfontsize"
              style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            {{unpublishedNum}}套房源未发布
          </span>
        </el-col>
      </el-card>
<!--      有关房源的信息-->
<!--      有关已发布的房源的信息-->
      <el-divider></el-divider>
<!--使用标签页-->
      <el-tabs type="border-card"
      v-model="tabValue"
      style="width: 631.5px"
      class="tabContainer"
      >
        <el-tab-pane label="已发布的房源" >
        </el-tab-pane>
        <el-tab-pane label="待发布的房源">

        </el-tab-pane>
        <el-tab-pane label="审核中的房源"></el-tab-pane>
      </el-tabs>
<!--      已发布的房源卡片-->
      <el-card class="bigCard" v-if="tabValue==0" >
        <p
            style="float: left;font-size: 20px"
            class="bigFontSize">
          已发布的房源
        </p>
        <br><br><br><br>
      <div v-for="i in publishedNum<=3?publishedNum:((this.publishedNum-this.publishedPageSize*(this.publishedCurrentPage-1))>3?3:(this.publishedNum-this.publishedPageSize*(this.publishedCurrentPage-1)))"
           v-if="publishedNum===0?false:true">
      <el-card shadow="hover" class="card-class" style="float: left">
        <!--放置一个图片走马灯-->
        <div class="imgBox"
             style="position: relative;left:-20px;top:-20px">
          <el-carousel
              height="130px"
              style="border-radius: 15px;width: 130px "
              indicator-position="none">
            <el-carousel-item style="width: 130px;height: 130px"
                v-for="item in publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].stayImgList"
                :key="item">
<!--              内嵌房源图片-->
              <el-image :src="item"
              style="width: 130px;height: 130px;"
              fit="cover"></el-image>
            </el-carousel-item>
          </el-carousel>

        </div >
        <p class="smallgretfontsize"
           style="position:relative;left:120px;top:-160px;text-align: left;font-size: 12px">
          {{publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].stayType}}
        </p>
        <span class="smallgretfontsize"
           style="position:relative;left:-80px;top:-190px;text-align: left;font-size: 12px">
          {{publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].stayPlace}}
        </span>
        <p class="bigFontSize"
           style="position:relative;left:120px;top:-200px;text-align: left;font-size: 17px">
          {{publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].stayNickName}}
        </p>
        <el-image
           style="position:relative;left:-152px;top:-210px;text-align: left;font-size: 17px;width: 25px;height: 25px"
        src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/订单.png">
        </el-image>
        <p class="bigFontSize"
           style="position:relative;left:140px;top:-245px;text-align: left;font-size: 12px">
          共{{publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].orderNum}}个订单
        </p>
        <el-image
            style="position:relative;left:-152px;top:-250px;text-align: left;font-size: 17px;width: 22px;height: 22px"
            src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/评价 (4).png">
        </el-image>
        <p class="bigFontSize"
           style="position:relative;left:140px;top:-285px;text-align: left;font-size: 12px">
          共{{publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].reviewNum}}条评价
        </p>
        <el-rate v-model="publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].reviewScore" disabled
                 show-text
                 show-score
                 text-color="#ff9900"
                 score-template="{value}"
                 style="position:relative;left:115px;top:-292px;text-align: left;font-size: 12px" >
        </el-rate>
<!--        房源的价格-->
        <p class="bigFontSize" @click=""
           style="position:relative;left:470px;top:-430px;text-align: left;font-size: 20px">
          ￥{{publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].stayPrice}}
        </p>
        <!--查看房源销量报表-->
        <el-image
            style="position:relative;left:320px;top:-480px;width: 22px;height: 22px;cursor: pointer"

            src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/查看.png"
        @click="viewChart(i)">
        </el-image>
        <el-button class="smallButton"
                   style="position:relative;left:240px;top:-430px;text-align: left"
        @click="updateStay">
          编辑房源
        </el-button>
        <br>
        <el-button class="smallButton"
                   style="position:relative;left:252px;top:-425px;text-align: left" >
          删除房源
        </el-button>
      </el-card>
        <br><br><br><br><br><br><br><br>
      </div>

<!--      已经发布的房源分页-->
        <div class="newPagination" >
      <el-pagination v-if="publishedNum<4?false:true"
                     layout="prev, pager, next"
                     :page-size="publishedPageSize"
                     :page-count="5"
                     :total="publishedNum"
                     @current-change="current_change"
                     background
                     style="position: absolute;left:240px;top:1050px"
      >
      </el-pagination>
        </div>
      </el-card>

<!--      订单报表对话框-->
      <el-dialog title="您的房源报表"
                 :visible.sync="orderDialogVisible"
      width="1100px"
      top="100px"
      custom-class="dialogClass">
        <p class="bigFontSize"
        style="float: left;font-size: 15px;position: relative;top:-50px">
          您的房源id为{{this.orderIdNow}}的房源分析
        </p>
        <el-divider></el-divider>
        <el-card class="velineCard" style="width: 320px;height: 320px ;
position: relative;left: -200px">
          <ve-line :data="orderSalesData"
                   class="lineCharts"
                   height="300px"
                   width="300px"
          ></ve-line>
        </el-card>
<!--        评分-->
        <el-rate v-model="4.3" disabled
                 show-text
                 show-score
                 text-color="#ff9900"
                 score-template="{value}"
                 style="position:relative;left:800px;top:-392px;text-align: left;font-size: 12px" >
        </el-rate>
<!--有关购买人性别的饼状图-->
        <el-card class="velineCard" style="width: 320px;height: 320px ;
position: relative;left: 350px;top:-342px">
          <ve-ring :data="sexRingData"
                   width="300px"
                   height="300px">

          </ve-ring>
        </el-card>

        <!--有关购买年龄阶段的饼状图-->
        <el-card class="velineCard" style="width: 320px;height: 320px ;
position: relative;left: 680px;top:-665px">
          <ve-ring :data="ageRingData"
                   width="300px"
                   height="300px">

          </ve-ring>
        </el-card>




      </el-dialog>


      <!--      审核中的房源卡片-->
      <el-card class="bigCard" style="height:450px" v-if="tabValue==2">
        <p
            style="float: left;font-size: 20px"
            class="bigFontSize">
          审核中的房源
        </p>
        <br><br><br><br>
        <div v-for="i in pendingReviewNum<=2?pendingReviewNum:((this.pendingReviewNum-this.pendingPageSize*(this.pendingCurrentPage-1))>2?2:(this.pendingReviewNum-this.pendingPageSize*(this.pendingCurrentPage-1)))"
             v-if="pendingReviewNum===0?false:true">
          <el-card shadow="hover" class="card-class" style="float: left">
            <!--放置一个图片走马灯-->
            <div class="imgBox"
                 style="position: relative;left:-20px;top:-20px">
              <el-carousel
                  height="130px"
                  style="border-radius: 15px;width: 130px "
                  indicator-position="none">
                <el-carousel-item style="width: 130px;height: 130px"
                                  v-for="item in pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].stayImgList"
                                  :key="item">
                  <!--              内嵌房源图片-->
                  <el-image :src="item"
                            style="width: 130px;height: 130px;"
                            fit="cover"></el-image>
                </el-carousel-item>
              </el-carousel>

            </div >
            <p class="smallgretfontsize"
               style="position:relative;left:120px;top:-160px;text-align: left;font-size: 12px">
              {{pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].stayType}}
            </p>
            <span class="smallgretfontsize"
                  style="position:relative;left:-80px;top:-190px;text-align: left;font-size: 12px">
          {{pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].stayPlace}}
        </span>
            <p class="bigFontSize"
               style="position:relative;left:120px;top:-200px;text-align: left;font-size: 17px">
              {{pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].stayNickName}}
            </p>
            <!--        房源的价格-->
            <p class="bigFontSize"
               style="position:relative;left:470px;top:-250px;text-align: left;font-size: 20px">
              ￥{{pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].stayPrice}}
            </p>
            <el-button class="smallButton"
                       style="position:relative;left:240px;top:-255px;text-align: left"
                       @click="updateStay">
              编辑房源
            </el-button>
            <br>
            <el-button class="smallButton"
                       style="position:relative;left:240px;top:-250px;text-align: left">
              删除房源
            </el-button>
<!--            审核信息创建时间-->
            <p class="smallgretfontsize"
               style="position:relative;left:120px;top:-330px;text-align: left;font-size: 13px">
              审核信息创建时间：{{pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].valCreateTime}}
            </p>
            <p class="smallgretfontsize"
               style="position:relative;left:120px;top:-330px;text-align: left;font-size: 13px">
              审核信息回复时间：{{pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].valReplyTime}}
            </p>
          </el-card>
          <br><br><br><br><br><br><br><br>
        </div>

        <!--      审核中的房源分页-->
        <div class="newPagination">
          <el-pagination v-if="pendingReviewNum<3?false:true"
                         layout="prev, pager, next"
                         :page-size="pendingPageSize"
                         :page-count="5"
                         :total="pendingReviewNum"
                         @current-change="pending_current_change"
                         style="position: absolute;left:240px;top:900px"
                         background
          >
          </el-pagination>
        </div>
      </el-card>
      <!--      草稿的房源卡片-->
      <el-card class="bigCard" style="height:450px;" v-if="tabValue==1" >
        <p
            style="float: left;font-size: 20px"
            class="bigFontSize">
          待发布的房源
        </p>
        <br><br><br><br>
        <div v-for="i in unpublishedNum<=2?unpublishedNum:((this.unpublishedNum-this.unpublishedPageSize*(this.unpublishedCurrentPage-1))>2?2:(this.unpublishedNum-this.unpublishedPageSize*(this.unpublishedCurrentPage-1)))"
             v-if="unpublishedNum===0?false:true">
          <el-card shadow="hover" class="card-class" style="float: left">
            <!--放置一个图片走马灯-->
            <div class="imgBox"
                 style="position: relative;left:-20px;top:-20px">
              <el-carousel
                  height="130px"
                  style="border-radius: 15px;width: 130px "
                  indicator-position="none">
                <el-carousel-item style="width: 130px;height: 130px"
                                  v-for="item in unpublishedStayInfo[(unpublishedCurrentPage-1)*unpublishedPageSize+i-1].stayImgList"
                                  :key="item">
                  <!--              内嵌房源图片-->
                  <el-image :src="item"
                            style="width: 130px;height: 130px;"
                            fit="cover"></el-image>
                </el-carousel-item>
              </el-carousel>

            </div >
            <p class="smallgretfontsize"
               style="position:relative;left:120px;top:-160px;text-align: left;font-size: 12px">
              {{unpublishedStayInfo[(unpublishedCurrentPage-1)*unpublishedPageSize+i-1].stayType}}
            </p>
            <span class="smallgretfontsize"
                  style="position:relative;left:-80px;top:-190px;text-align: left;font-size: 12px">
          {{unpublishedStayInfo[(unpublishedCurrentPage-1)*unpublishedPageSize+i-1].stayPlace}}
        </span>
            <p class="bigFontSize"
               style="position:relative;left:120px;top:-200px;text-align: left;font-size: 17px">
              {{unpublishedStayInfo[(unpublishedCurrentPage-1)*unpublishedPageSize+i-1].stayNickName}}
            </p>
            <!--        房源的价格-->
            <p class="bigFontSize"
               style="position:relative;left:470px;top:-250px;text-align: left;font-size: 20px">
              ￥{{unpublishedStayInfo[(unpublishedCurrentPage-1)*unpublishedPageSize+i-1].stayPrice}}
            </p>
            <el-button class="smallButton"
                       style="position:relative;left:240px;top:-255px;text-align: left"
                       @click="updateStay">
              编辑房源
            </el-button>
            <br>
            <el-button class="smallButton"
                       style="position:relative;left:240px;top:-250px;text-align: left">
              删除房源
            </el-button>
          </el-card>
          <br><br><br><br><br><br><br><br>
        </div>

        <!--      审核中的房源分页-->
        <div class="newPagination">
          <el-pagination v-if="unpublishedNum<3?false:true"
                         layout="prev, pager, next"
                         :page-size="unpublishedPageSize"
                         :page-count="5"
                         :total="unpublishedNum"
                         @current-change="pending_current_change"
                         style="position: absolute;left:240px;top:900px"
                         background
          >
          </el-pagination>
        </div>

<!--        图表测试-->
      </el-card>


    </el-col>
    <el-col :span="1" style="height: 100%">
      <el-divider
          direction="vertical"
          class="el-divider--vertical"></el-divider>
    </el-col>
    <el-col :span="7">
      <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/室内2.png"
      style="width: 300px;height: 400px;position: relative;right:-50px;top:-70px"></el-image>
      <el-image
          :src="sexPictureList[hostSexString ]"
          style="transform: scale(0.7);position: relative;top:-200px" ></el-image>
      <br><br>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: "HostInfoMessage",
  props:{
    hostRealName:String,
    hostCreateTime:String,
    hostNickName:String,
    reviewNum:Number,
    hostSex:String,
    publishedNum:Number,
    pendingReviewNum:Number,
    unpublishedNum:Number,
    averageRate:Number,
    publishedHouseInfo:Array,
    pendingStayInfo:Array,//审核中的房源列表\
    unpublishedStayInfo:Array//草稿的房源列表
  },
  data:function ()
  {
    return{
      sexRingData:{
        columns:['房客性别','订单数量'],
        rows:[{
          '房客性别':'男','订单数量':10
        },
          {
            '房客性别':'女','订单数量':34
          },
          {
            '房客性别':'未知','订单数量':20
          },]
      },
      ageRingData:{
        columns:['房客年龄段','房客数量'],
        rows:[{
          '房客年龄段':'10岁以下','房客数量':1
        },
          {
            '房客年龄段':'10岁到20岁','房客数量':30
          },
          {
            '房客年龄段':'20岁到30岁','房客数量':20
          },
          {
            '房客年龄段':'30岁到40岁','房客数量':8
          },
          {
            '房客年龄段':'40岁到50岁','房客数量':3
          },
          {
            '房客年龄段':'50岁及以上','房客数量':1
          },]
      },
      orderSalesData:{
        columns: ['时间', '订单数量','评价数量','房源评价'],
        rows: [{ '时间': '2021-1月', '订单数量': 33, '评价数量':12,'房源评价':4.3},
    { '时间': '2021-2月', '订单数量': 31,'评价数量':10,'房源评价':4.1},
    { '时间': '2021-3月', '订单数量': 21 ,'评价数量':14,'房源评价':4.5},
    { '时间': '2021-4月', '订单数量': 41 ,'评价数量':12,'房源评价':4.6},
    { '时间': '2021-5月', '订单数量': 12 ,'评价数量':32,'房源评价':4.9},
          { '时间': '2021-6月', '订单数量': 71,'评价数量':56,'房源评价':4.1 },
          { '时间': '2021-7月', '订单数量': 77 ,'评价数量':12,'房源评价':4.3},
          { '时间': '2021-8月', '订单数量': 100 ,'评价数量':17,'房源评价':4.4},
          { '时间': '2021-9月', '订单数量': 140,'评价数量':18,'房源评价':4.3},
          { '时间': '2021-10月', '订单数量': 145 ,'评价数量':52,'房源评价':4.1},
          { '时间': '2021-11月', '订单数量':  233,'评价数量':12,'房源评价':4.3},
          { '时间': '2021-12月', '订单数量': 71 ,'评价数量':12,'房源评价':4.3}]
      },
      scoreImgList:["https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/一般.png",
      "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/微笑.png",
      "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/赞.png"],
      rateNum:Math.round(this.averageRate-3)<0?0:Math.round(this.averageRate-3),
      rateString:['评价一般','评价不错','超赞房东'],
      hostSexString:this.hostSex===''?'未知':this.hostSex,
      sexImgList:{"未知":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/问号.png",
      "男":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/男.png",
        "女":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/女.png"},
      sexPictureList:{"未知":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/sitting-4.png",
        "男":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/sitting-2.png",
        "女":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/sitting-1.png"
      },
      dialog:false,
      direction:'rtl',
      loading:false,
      publishedPageSize:3,//已经发布的房源每页的展示数
      publishedCurrentPage:1,
      pendingPageSize:2,//审核中的房源的每页的展示数
      pendingCurrentPage:1,//审核中的房源的分页当前页
      unpublishedCurrentPage:1,//草稿的房源的当前分页
      unpublishedPageSize:2,//草稿的房源的每页展示数
      tabValue:0,//标签页的标签值
      orderDialogVisible:false,//房源报表对话框是否显示
      orderIdNow:0,//当前点击的订单id
      form:{//表单
        name:'',
        sex:'',//性别
      },
      rules:{//表单验证
        name:[
          {required:true,message:'请输入新的昵称',trigger:'blur'},
          {min:1,max:15,message: "长度在1到15个字符",trigger: 'blur'}
        ],
        sex:[
          {required:true,message:'选择性别',trigger:'change'}
        ],
      }

    }
  },
  created() {


  },

  methods:{
    print(){
      console.log(this.tabValue);
    },
    updateStay:function(){
      //这里是编辑房源按钮点击触发的函数，点击后应根据房源id调相应的API，然后获取数据
      //然后是czy将数据得到的数据存入本地，然后跳转至发布房源页面
    },
    viewChart:function (i)
    {
      let index=(this.publishedCurrentPage-1)*this.publishedPageSize+i-1;//获取当前点击的索引值，从0开始
      let stayId=this.publishedHouseInfo[index].stayId;//获取到了当前房源的id
      console.log("当前房源的id：",stayId);
      this.orderDialogVisible=true;//对话框可见
      this.orderIdNow=stayId;//修改当前的订单id
    },

handleClose(done)
{
  if(this.loading){
    return;
  }
  if(this.form.name.length>15)
  {
    this.$message.error('啊哦！您输入的昵称长度超过了15个字符');
    return;
  }
  if(this.form.name.length<1)
  {
    this.$message.error('啊哦！您输入的昵称是空的');
    return;
  }
  this.$confirm('您是否确定自己的修改？',{dangerouslyUseHTMLString:true,
    confirmButtonClass:'Mybutton',
    confirmButtonText:'确定',

  })
      .then(_=>{
        this.loading=true;
        this.timer=setTimeout(()=>{
          done();
          setTimeout(()=>{
            this.loading=false;
            this.resaveInfo();
          },400);
        },2000);
      })
      .catch(_=>{});
},
    cancelForm(){
      this.loading=false;
      this.dialog=false;
      clearTimeout(this.timer);

    },
    onsubmit(){
      console.log('submit!')
    },
    current_change:function (publishedCurrentPage){
      this.publishedCurrentPage=publishedCurrentPage;
    },
    pending_current_change:function (pendingCurrentPage)
    {
      this.pendingCurrentPage=pendingCurrentPage;
    },

    resaveInfo:function () {

      }

  }

}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css");
.box-card{
  width: 550px;
  height:550px;
  border-radius: 15px;
  border-width: 3px;
  border-color: #7b7b7b;
  background-color: rgba(246, 248, 248, 0.918);
  box-shadow: 7px 7px 10px #888888;
  animation: fadeInDown;
  animation-duration: 1s;
}
.Mybutton
{
  width: 150px;
  height: 50px;
  border-color: #929292;
  border-radius:15px;
  border-width: 3px;
  box-shadow: 5px 5px 8px #888888;
  font-family: "PingFang SC";
  font-size: medium;
  font-weight: bold;
  color: #7b7b7b;
  animation: fadeInDown;
  animation-duration: 1s;

}
.smallButton
{
  width: 80px;
  height: 30px;
  border-color: #929292;
  border-radius:15px;
  border-width: 3px;
  box-shadow: 5px 5px 8px #888888;
  font-family: "PingFang SC";
  font-size: 13px;
  text-align: center;
  padding-left: 10px;
  padding-top: 6px;
  font-weight: bold;
  color: #7b7b7b;
  animation: fadeInDown;
  animation-duration: 1s;

}
.bigFontSize
{
  font-family: "PingFang SC";
  font-size: 30px;
  font-weight: bold;
  animation: fadeInDown;
  animation-duration: 1s;


}
.smallgretfontsize
{
  font-weight: bold;
  font-size:medium;
  font-family: "PingFang SC";
  color: #747474;
  animation: fadeInDown;
  animation-duration: 1s;
}
.el-divider--vertical{
  height:80%;
  margin-top: 100px;
  width: 2px;
  animation: fadeInDown;
  animation-duration: 1s;
}
.icon {
  width: 30px;
  height: 30px;
  float: left;

}
.card-class{
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-radius: 15px;
  width: 600px;
  height: 130px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.imgBox{
  width: 130px;
  height: 130px;
  border-radius: 15px;
}
.bigCard
{
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  height: 100%;
  height: 600px;
}
.newPagination>>>.el-pager li{
  background-color: #d7e8f5 !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px!important;
}
.newPagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active
{
  background-color: #739de5 !important;
}

.lineCharts{
  width: 100px;
  height: 100px;

}
.velineCard
{
  width: 320px;
  height: 290px;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

}

.el-tabs__item {
  padding: 0 20px;
  height: 40px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 40px;
  display: inline-block;
  list-style: none;
  font-size: 15px;
  font-weight: 500;
  color: #303133;
  position: relative;
}

.tabContainer {
  width: 1200px;
  height: auto;
  margin: 0 auto;
  background: #D4E3FB;
  position: relative;
}

.tabContainer .el-tabs--border-card{
  border: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}
.tabContainer > .el-tabs--border-card > .el-tabs__header {
  /**/

  background-color: #333333 !important;
  border: none;
  border-top: 1px solid #1B2945;
  border-radius: 3px;
  margin: 0;
}
.tabContainer .el-tabs--border-card>.el-tabs__header .el-tabs__item{
  color: #FFFFFF;
  text-align: center;
  border: none;
  min-width: 80px;
}
.tabContainer .el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active {
  color: #1B2945;
  background-color: #FFF;
  /*border-right-color: #DCDFE6;*/
  /*border-left-color: #DCDFE6;*/
  border: none;
  box-shadow: none;
}
.el-tabs--border-card > .el-tabs__content {
  margin: 0;
  padding: 0;
  height: 0;
}
.tabContainer .el-tabs--border-card>.el-tabs__header .el-tabs__item:not(.is-disabled):hover {
  color: #409EFF;
  /*color: #FFFFFF;*/
}

</style>
<style>
.dialogClass
{
  border-radius: 20px ;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  height: 500px;
}
</style>