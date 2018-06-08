const dbUtils = require('./../utils/db'); // 引入链接池
const cateSql = require('./../sql/category')

var categoryModels = {

    /**
     * 物质类型分类添加
     * @param {*} da 
     */
    async addForMaterial(da){
        let result = await dbUtils.query(cateSql.insertForMateral,[da.name,da.desc,da.note,1,1]);
        return result;
        
    },
    
    /**
     * 配送类型添加
     */
    async addForDelivery(da){
        let result = await dbUtils.query(cateSql.insertForDelivery,[da.name,da.desc,da.note,1,1]);
        return result;
        
    },

     /**
     * 配送类型添加
     */
    async addForStoreroom(da){
        let result = await dbUtils.query(cateSql.insertStoreroom,[da.name,da.desc,da.note,1,1]);
        return result;
        
    },

    /**
     * 配送类型添加
     */
    async addAllStoreroom(da){
        let result = await dbUtils.query(cateSql.insertAllStoreroom,[da.name,da.desc,da.note,da.number,da.address,1,1]);
        return result;
        
    },

    /**
     * 查询配送方式分类表
     */
    async selectForDelivery(){
        let result = await dbUtils.query(cateSql.selectForDelivery);
        return result;
    },

      /**
     * 查询配送方式分类表
     */
    async selectStoreroom(){
        let result = await dbUtils.query(cateSql.selectForStoreroom);
        return result;
    },



    /**
     * 查询物质分类表
     */
    async selectForMaterial(){
        let result = await dbUtils.query(cateSql.selectForMaterial);
        return result;
    },

    async selectStoreroomByNumber(da){
        let result = await dbUtils.query(cateSql.selectStoreroomByNumber,da);
        return result;
    },


    /**
     * 修改物质分类表数据
     * @param {} da 
     */
    async updateMaterialCategory(da){
        let result = await dbUtils.query(cateSql.updateMaterialCategory,[da.name,da.desc,da.note,da.id]);
        return result;

    },

    /**
     * 修改配送方式分类表数据
     * @param {*} da 
     */
    async updateDeliveryCategory(da){
        let result = await dbUtils.query(cateSql.updateDeliveryCategory,[da.name,da.desc,da.note,da.id]);
        return result;

    },

    /**
     * 修改仓库信息
     */
    async updateStoreroom(da){
        let result = await dbUtils.query(cateSql.updateStoreroom,[da.name,da.desc,da.note,da.id]);
        return result;
    },
    
    /**
     * 逻辑删除配送的数据
     * @param {*} da 
     */
    async delDeliveryCategory(da){
        let result = await dbUtils.query(cateSql.delDeliveryCategory,[da]);
        return result;

    },

    /**
     * 逻辑删除物质表的数据
     * @param {*} da 
     */
    async delMaterialCategory(da){
        let result = await dbUtils.query(cateSql.delMaterialCategory,[da]);
        return result;

    },

    /**
     * 逻辑仓库信息
     * @param {*} da 
     */
    async delStoreroom(da){
        let result = await dbUtils.query(cateSql.delStoreroom,[da]);
        return result;

    },
    
}

module.exports = categoryModels;