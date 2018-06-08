
const category = {
      
      /**
       * 物质分类添加
       */
      insertForMateral:'INSERT  INTO `material_type` (name,`desc`,note,creator,mender,edit_time) VALUES(?,?,?,?,?,now())', //物质类型添加
      insertForDelivery:'INSERT  INTO `delivery_type` (name,`desc`,note,creator,mender,edit_time) VALUES(?,?,?,?,?,now())',
      insertStoreroom:'INSERT INTO `storeroom` (name,`desc`,note,create_time,edit_time,`status`,editer) VALUES (?,?,?,NOW(),NOW(),?,?)',

      insertAllStoreroom:'INSERT INTO `storeroom` (name,`desc`,note,`number`,address,create_time,edit_time,`status`,editer) VALUES (?,?,?,?,?,NOW(),NOW(),?,?)',


      /**
       * 查询
       */
      selectForMaterial:'SELECT * FROM material_type WHERE `status`=1 ORDER BY `id` asc',
      selectForDelivery:'SELECT * FROM delivery_type WHERE `status`=1 ORDER BY `id` asc',
      selectForStoreroom:'SELECT * FROM storeroom WHERE `status`=1 ORDER BY `id` asc',

      selectStoreroomByNumber:'SELECT * FROM storeroom WHERE number = ?',

      /**
       * 修改 删除 ==逻辑删除
       */
      updateMaterialCategory:'UPDATE material_type SET `name` = ?, `desc`=?, note=?, edit_time = NOW() WHERE id=?',
      updateDeliveryCategory:'UPDATE delivery_type SET `name` = ?, `desc`=?, note=?, edit_time = NOW() WHERE id=?',
      updateStoreroom:'UPDATE storeroom SET `name` = ?, `desc`=?, note=?, edit_time = NOW() WHERE id=?',

      delMaterialCategory:'UPDATE material_type SET `status` = 0, edit_time = NOW() WHERE id=?',
      delDeliveryCategory:'UPDATE delivery_type SET `status` = 0, edit_time = NOW() WHERE id=?',
      delStoreroom:'UPDATE storeroom SET `status` = 0, edit_time = NOW() WHERE id=?',


}

module.exports = category;