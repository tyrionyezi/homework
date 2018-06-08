
const logistic = {

      /**
       * 物流分类添加
       */
      insertLogistic: 'INSERT INTO logistics (`id`,weigth,price,note,fr_person,fr_tel,fr_address,fr_add_detail,to_person,to_tel,to_address,to_add_detail,material_kind,deliver_kind,create_time,edit_time) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW())',


      insertTransmission:'INSERT INTO transmission (`number`, pre_stop, next_stop, note,transmitter, create_time, edit_time, editer, pre_id, next_id) VALUES (?,?,?,?,?,NOW(),NOW(),?,?,?)',

      insertForUpdateTransportStatus:'INSERT INTO transmission (`number`, pre_stop, next_stop, note, edit_time, pre_id, next_id,is_end) VALUES (?,?,?,?,NOW(),?,?,1)',

      /**
       * 查询
       */
      selectAllLogistic: 'SELECT * FROM logistics WHERE `status` = 1 ORDER BY edit_time',

      selectlogisticByAddress:'SELECT * FROM logistics WHERE to_address LIKE ? AND `status` =1',

      selectTransmissionByStoreroomNumber:'select * FROM transmission WHERE next_id = ? AND is_end= 0',

      // selectTransmissionByStoreroomNumber:'select * from transmission where `next_id`=? and  not exists (SELECT * FROM  transmission  WHERE `next_id`= ? AND is_end=1)',

      selectTransportStatus: 'SELECT * FROM logistics WHERE `status` = 1 and is_transport = 0 ORDER BY edit_time',

      selectTransmissionByNumber:'SELECT * FROM transmission WHERE `id` = ? AND is_end = 0',

      selectTransmissionList:'SELECT  tr.*,lo.* from transmission as tr  JOIN logistics as lo  ON tr.number = lo.id WHERE tr.next_id = ? GROUP BY tr.id ',

      selectLogisticByOneDay:'SELECT count(*) as count FROM logistics WHERE create_time LIKE ?',

      /**
       * 修改 删除 ==逻辑删除
       */
      updateItemLogistic: 'UPDATE logistics SET price = ?, weigth = ?, fr_person = ?, fr_tel = ?, fr_address = ?, fr_add_detail = ?,to_person = ?, to_tel = ?,to_address = ?,to_add_detail= ?,note = ?,edit_time = NOW()WHERE `id` = ?',
      updateDeliveryCategory: 'UPDATE delivery_type SET `name` = ?, `desc`=?, note=?, edit_time = NOW() WHERE id=?',
      updateLogisticTransportStatus:'UPDATE logistics SET `is_transport` = 1 WHERE id=?',
      updateTransmissionTransportStatus:'UPDATE transmission SET `is_end` = 2 WHERE id=?',

      delItemLogistic: 'UPDATE logistics SET `status` = 0, edit_time = NOW() WHERE id=?',


}

module.exports = logistic;