const logisticModel = require('./../models/logistic');
const cateModel = require('./../models/category');
const _RES_ = require('./../utils/_RES_');
const _CW_ = require('./../CW/user');

var logisticService = {

    /**
     * 添加配置分类
     * @param {*} da 
     */
    async addLogistic(da) {
        console.log(da);
        _RES_.init();
        let res = await logisticModel.addLogistic(da);

        if (res.affectedRows == 1) {
            _RES_.data = 1;
            _RES_.msg = _CW_.BASE_ADD_SUCCESS;
        } else {
            _RES_.data = 0;
            _RES_.msg = _CW_.BASE_ADD_FALSE;
        }
        return _RES_;
    },



    async selectAllLogistic() {
        _RES_.init();
        let res = await await logisticModel.getAllLogistic();
        console.log(res);
        _RES_.data = res;
        return _RES_;

    },
    async selectLogisticByAddress(da) {
        console.log(2);
        _RES_.init();
        let pa = '%'+da.areaId+'%';
        let res = await logisticModel.getLogisticByAddress(pa);
        console.log(res);
        _RES_.data = res;
        return _RES_;

    },

    async delItemLogistic(da) {
        _RES_.init();
        let res = await logisticModel.delItemLogistic(da.id);
        if (res.affectedRows == 1) {
            _RES_.data = 1;
            _RES_.msg = _CW_.BASE_DELETE_SUCCESS;
        } else {
            _RES_.data = 0;
            _RES_.msg = _CW_.BASE_REVISE_FALSE;
        }
        return _RES_;
    },


    async updateLogistic(da) {
        console.log("updateLogistic");
        console.log(da);
        _RES_.init();
        let res = await logisticModel.updateItemLogistic(da);
        if (res.affectedRows == 1) {
            _RES_.data = 1;
            _RES_.msg = _CW_.BASE_REVISE_SUCCESS;
        } else {
            _RES_.data = 0;
            _RES_.msg = _CW_.BASE_REVISE_FALSE;
        }
        return _RES_;
    },

    async getTransmission(da){
        _RES_.init();
        
        let res = await logisticModel.selectTransmissionByStoreroomNumber(da.areaId);
        console.log(res);
        _RES_.data = res;
        return _RES_;
    },

    async userUpdateTransportStatus(da){
        _RES_.init();
        let _res = '';
        console.log(da);
        for(let i = 0,len=da.data.length;i<len;i++){
            let res = await logisticModel.selectTransmissionByNumber(da.data[i]);
            let req = res[0];
            req.pre_stop  = '收件人接收';
            logisticModel.updateTransmissionTransportStatus(req.id);
            _res = await logisticModel.insertTransmissionEnd(req);

        }
        if (_res.affectedRows == 1) {
            _RES_.data = 1;
            _RES_.msg = _CW_.BASE_ADD_SUCCESS;
        } else {
            _RES_.data = 0;
            _RES_.msg = _CW_.BASE_ADD_FALSE;
        }
        
        return _RES_;

    },

    async selectTransmissionList(da){
        _RES_.init();
        let res = await logisticModel.selectTransmissionList(da.areaId);
        _RES_.data = res;
        return _RES_;

    },
    async getWeekData(da){
        _RES_.init();
        let wk = [];
        console.log(da);
        // let currentDate = da.date;
        // let currentDateTamp = new Date(currentDate).getTime();
        // let day = new Date(currentDate).getDay();
        // let oneDateTamp = 60*60*24*1000;
        // // console.log(day);
        // console.log(currentDateTamp);
        // console.log(oneDateTamp);
        // console.log(new Date(currentDateTamp));
        // console.log(":"+currentDateTamp+oneDateTamp*2);
        // console.log((new Date(currentDateTamp-oneDateTamp*1)).getDay());
        // console.log((new Date(currentDateTamp-oneDateTamp*2)).getDay());
        let  weekDayArr = ['2018-05-28','2018-05-29','2018-05-30','2018-05-31','2018-06-01','2018-06-02','2018-06-03']
        
        for(let i =0;i<7;i++){
            let  date = '%'+weekDayArr[i]+'%';
            let  res = await logisticModel.selectLogisticByOneDay(date);
            console.log(res);
            let  item = {
                'date':weekDayArr[i],
                'count':res[0].count,
            };
            wk.push(item);

        }
        
        return _RES_.data = wk;

    },

    async maintenanceTransmission(){
        
        let storeroomList = await cateModel.selectStoreroom();
        let logisticList = await logisticModel.getLogisticByTransportStatus();
        console.log(logisticList.length);
        for(let i = 0,len=logisticList.length;i<len;i++){
            let req = {};
            let fr_address = [];
            let to_address = [];
            // console.log(JSON.parse(logisticList[i].fr_address))
            fr_address.push((JSON.parse(logisticList[i].fr_address))[1].code);
            fr_address.push((JSON.parse(logisticList[i].fr_address))[2].code);
            to_address.push((JSON.parse(logisticList[i].to_address))[1].code);
            to_address.push((JSON.parse(logisticList[i].to_address))[2].code);

            req['number'] = logisticList[i].id;
            console.log(fr_address);
            // console.log(to_address);
            let q = 1;
            let pre_stop = '';
            let pre_id = '';
            let next_stop = '';
            let next_id = '';
            for(let n = 0,leng=storeroomList.length;n<leng;n++){
                // console.log(storeroomList[n].number);
                // console.log(fr_address);
                // console.log(storeroomList[n].name);
                // console.log(fr_address.includes(parseInt(storeroomList[n].number)));
                if(fr_address.includes(storeroomList[n].number)){
                    console.log(q++);
                    pre_stop = storeroomList[n].name;
                    pre_id = storeroomList[n].number;
                }

                if(to_address.includes(storeroomList[n].number)){
                    next_stop = storeroomList[n].name;
                    next_id = storeroomList[n].number;
                }
                
                // console.log(q);
                // console.log(pre_stop);
                // console.log(pre_id);
                // console.log(next_stop);
                // console.log(next_id);
                
            }
            req['pre_stop']= pre_stop;
            req['pre_id'] = pre_id;
            req['next_stop'] = next_stop;
            req['next_id'] = next_id;
            req['note'] = '';
            req['transmitter'] = 1;
            req['editer'] = 1;

            let res = await logisticModel.addTransmission(req);
            if (res.affectedRows == 1) {
            let result = await logisticModel.updateLogisticTransportStatus(req.number);   
            }
            
            
        };
       

    }

}

module.exports = logisticService;