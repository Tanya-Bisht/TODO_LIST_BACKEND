const express= require('express')
const router=express.Router();
const {addList,getList, patchList, deleteList}=require('../Controller/listController')



router.post('/',addList)
router.get('/',getList)
router.patch('/:id',patchList)
router.delete('/:id',deleteList)


module.exports=router