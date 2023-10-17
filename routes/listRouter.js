const express= require('express')
const router=express.Router();
const {addList,getList, patchList, deleteList,userSignup,userLogin,authorization}=require('../Controller/listController')



router.post('/',authorization,addList)
router.get('/',authorization,getList)
router.patch('/:id',authorization,patchList)
router.delete('/:id',authorization,deleteList)
router.post('/login',userLogin)
router.post('/signup',userSignup)



module.exports=router