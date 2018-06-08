const cateModel = require('./../models/category');
const _RES_ = require('./../utils/_RES_');
const _CW_ = require('./../CW/user');

const areaData = require('area-data');

var cateService = {

    /**
     * 添加配置分类
     * @param {*} da 
     */
    async addCategory(da){
        console.log(da);
        _RES_.init();
        let res;
        if(da.type==1){
            res = await cateModel.addForMaterial(da.data);
        }else if(da.type==2){
            res = await cateModel.addForDelivery(da.data);
        }else if(da.type==3){
            res = await cateModel.addForStoreroom(da.data);
        }

        if(res.affectedRows==1){
            _RES_.data=1;
            _RES_.msg = _CW_.BASE_ADD_SUCCESS;
        }else{
            _RES_.data=0;
            _RES_.msg = _CW_.BASE_ADD_FALSE;
        }
        return _RES_;
    },

    /**
     * 获取categorylist
     * @param {*} da 
     */
    async getCategoryList(da){
        console.log(da);
        _RES_.init();
        let res;
        if(da.type==1){
            res = await cateModel.selectForMaterial();
        }else if(da.type==2){
            res = await cateModel.selectForDelivery();
        }else if(da.type==3){
            res = await cateModel.selectStoreroom();
        }
        console.log(res);
        if(res.length>0){
            _RES_.data=res;
        }else{
            _RES_.data=res;
        }
        return _RES_;

    },

    /**
     * 根据number获取数据
     * @param {* number} da 
     */
    async getStoreroomByNumber(da){
        console.log(da);
        _RES_.init();
        let res = await cateModel.selectStoreroomByNumber(da.number);
        if(res.length>0){
            _RES_.data=res;
        }else{
            _RES_.data=res;
        }
        return _RES_;
    },
    /**
     *修改category数据 
     * @param {*} da 
     */
    async updateCategory(da){
        console.log(da);
        _RES_.init();
        let res;
        if(da.type==1){
            res = await cateModel.updateMaterialCategory(da.data);
        }else if(da.type==2){
            res = await cateModel.updateDeliveryCategory(da.data);
        }else if(da.type==3){
            res = await cateModel.updateStoreroom(da.data);
        }

        if(res.affectedRows==1){
            _RES_.data =1;
            _RES_.msg = _CW_.BASE_REVISE_SUCCESS
        }else{
            _RES_.data = 0;
            _RES_.msg= _CW_.BASE_REVISE_FALSE;
        }
        return _RES_;
    },

    /**
     * 逻辑删除category
     * @param {*} da 
     */
    async delCategoty(da){
        console.log(da);
        _RES_.init();
        let res;
        if(da.type==1){
            res = await cateModel.delMaterialCategory(da.data);
        }else if(da.type==2){
            res = await cateModel.delDeliveryCategory(da.data);
        }else if(da.type==3){
            res = await cateModel.delStoreroom(da.data);
        }

        if(res.affectedRows==1){
            _RES_.data =1;
            _RES_.msg = _CW_.BASE_DELETE_SUCCESS
        }else{
            _RES_.data = 0;
            _RES_.msg= _CW_.BASE_DELETE_FALSE;
        }
        return _RES_;
    },

    async setStoreroom(){
        // for(key in areaData.pca){
        //     for(let ky in areaData.pca[key])
        //     console.log(ky);
        //     console.log(areaData.pca[key][ky]);
        // }
        // // console.log(areaData);
        // return;
        let areaPca = areaData.pca;
        // return;
        let _oneArea = areaData['pca'];
        // let _oneArea = oneArea['86'];
        let i = 0;
        for(let key in areaPca){
            // console.log(key);
            // console.log(areaPca[key]);
            for(let k in areaPca[key]){
                // console.log(i++);
                // console.log(k);
                // console.log(areaPca[key][k]);
                let req = {};
                req['number'] = k;
                req['name'] = areaPca[key][k]+'物流集散中心';
                req['desc'] = '普通仓库';
                req['note'] = '';
                req['address'] = areaPca['86'][key]+','+areaPca[key][k];
                console.log(req);
                let res = await cateModel.addAllStoreroom(req);
                
            }
        }
    }

}

module.exports = cateService;