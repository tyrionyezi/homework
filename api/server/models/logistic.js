const dbUtils = require('./../utils/db'); // 引入链接池
const logisticSql = require('./../sql/logistic')

var logisticModels = {

    /**
     * 物质类型分类添加S
     * @param {*} da 
     */
    async addLogistic(da) {
        console.log('Model');
        console.log(da);
        console.log(da.fr_address);
        let timestamp = new Date().getTime();
        console.log(timestamp);
        let result = await dbUtils.query(logisticSql.insertLogistic, [timestamp,da.weight, da.price, da.note, da.fr_name, da.fr_tel, da.fr_address, da.fr_address_detail, da.to_name, da.to_tel, da.to_address, da.to_address_detail, da.material_cate, da.delivery_cate]);
        return result;

    },

    async getAllLogistic() {
        let result = await dbUtils.query(logisticSql.selectAllLogistic);
        return result;
    },

    async getLogisticByTransportStatus() {
        let result = await dbUtils.query(logisticSql.selectTransportStatus);
        return result;
    },

    async getLogisticByAddress(da){
        console.log("getLogisticByAddress："+da);
        let result = await dbUtils.query(logisticSql.selectlogisticByAddress,da);
        return result;
    },

    async delItemLogistic(da) {
        let result = await dbUtils.query(logisticSql.delItemLogistic, da);
        return result;
    },

    async updateItemLogistic(da) {
        let result = await dbUtils.query(logisticSql.updateItemLogistic,[da.price,da.weigth,da.fr_person,da.fr_tel,da.fr_address,da.fr_add_detail,da.to_person,da.to_tel,da.to_address,da.to_add_detail,da.note,da.id]);
        return result;
    },

    async addTransmission(da) {
        let result = await dbUtils.query(logisticSql.insertTransmission,[da.number,da.pre_stop,da.next_stop,da.note,da.transmitter,da.editer,da.pre_id,da.next_id]);
        return result;
    },

    async selectTransmissionByStoreroomNumber(da){
        console.log('selectTransmissionByStoreroomNumber：'+da);
        let result = await dbUtils.query(logisticSql.selectTransmissionByStoreroomNumber,[da,da]);
        return result;
    },

    async updateLogisticTransportStatus(da){
        let result = await dbUtils.query(logisticSql.updateLogisticTransportStatus,da);
        return result;
    },

    async selectTransmissionByNumber(da){
        console.log('selectTransmissionByNumber：'+da);
        let result = await dbUtils.query(logisticSql.selectTransmissionByNumber,da);
        return result;
    },

    async insertTransmissionEnd(da){
        console.log('insertTransmissionEnd：'+da);
        let result = await dbUtils.query(logisticSql.insertForUpdateTransportStatus,[da.number,da.next_stop,da.pre_stop,da.note,da.next_id,da.pre_id]);
        return result;
    },
    async updateTransmissionTransportStatus(da){
        let result = await dbUtils.query(logisticSql.updateTransmissionTransportStatus,da);
        return result;
    },


    async selectTransmissionList(da){
        let result = await dbUtils.query(logisticSql.selectTransmissionList,da);
        return result;
    },

    async selectLogisticByOneDay(da){
        let result = await dbUtils.query(logisticSql.selectLogisticByOneDay,da);
        return result;
    },



}

module.exports = logisticModels;