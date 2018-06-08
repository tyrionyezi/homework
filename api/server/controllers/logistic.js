const logisticService = require('./../services/logisticService');

var logistic = {
    async addLogistic(da) {
        let res = logisticService.addLogistic(da);
        return res;

    },

    async selectLogistic() {
        let res = logisticService.selectAllLogistic();
        return res;
    },
    
    async selectLogisticByParams(da) {
        let res = logisticService.selectLogisticByAddress(da);
        return res;
    },

    async getAreaLogisitc(da){
        let res = logisticService.getTransmission(da);
        return res;
    },

    async delLogistic(da) {
        let res = logisticService.delItemLogistic(da);
        return res;
    },

    async updateLogistic(da) {
        let res = logisticService.updateLogistic(da);
        return res;
    },
    
    async getCategoryList(da) {
        let res = cateService.getCategoryList(da);
        return res;
    },

    async updateTransmission(){
        let res = logisticService.maintenanceTransmission();
        return res;
    },
    async userUpdatetransportStatus(da){
        let res = logisticService.userUpdateTransportStatus(da);
        return res;
    },
    async selectTransmissionByUserAreaId(da){
        let res = logisticService.selectTransmissionList(da);
        return res;
    },

    async getWeekData(da){
        let res = logisticService.getWeekData(da);
        return res;
    }

}

module.exports = logistic;