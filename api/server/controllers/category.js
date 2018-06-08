const cateService = require('./../services/cateService');

var category = {
    async addCategory(da){
        let res = cateService.addCategory(da);
        return res;

    },

    async getCategoryList(da){
        let res = cateService.getCategoryList(da);
        return res;
    },

    async getStoreroomByNumber(da){
        let res = cateService.getStoreroomByNumber(da);
        return res;
    },

    async updateCategory(da){
        let res = cateService.updateCategory(da);
        return res;
    },
    async delCategory(da){
        let res = cateService.delCategoty(da);
        return res;
    },
    
    async setStoreroom(){
        let res = cateService.setStoreroom();
        return res;
    }
}

module.exports = category;