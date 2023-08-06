const User = require("../models/user.model");

exports.findAllUser = async(req,res) =>{
try{
    const users = await User.findAll({
        where: {
            status:'Avaliable'
        }
    })

    return res.status(200).json({
        status:'success',
        users 

    })

}catch(error){
    console.log(error);
    return res.status(500).json({
        status:'fail',
        message: 'Internal server error',
        error
    })    

}
}
exports.findOneUser = async(req,res) =>{
try{
    const {id} = req.params
    const user = await User.findOne({
        where:{
            id,
            status:'Avaliable'
        }
    })

    if(!user){
        return res.status(404).json({
            status : 'error',
            message: `user with id ${id}, not found`
        })
    }

    return res.status(200).json({
        status: 'success',
        user
    })

}catch(error){
    console.log(error);
    return res.status(500).json({
        status:'fail',
        message: 'Internal server error',
        error
    })    
}

}
exports.createUser = async(req,res) =>{
try{
    const {name,email,password,role} = req.body;

    const user= await User.create({name,email,password,role})

    return res.status(201).json({
        status:'sucess',
        user,
    })

}catch(error){
    console.log(error);
    res.status(500).json({
        status:'fail',
        message: 'Internal server error',
        error
    })

}
}
exports.updateUser = async(req,res) =>{
try{
    const {id}=req.params;
    const {name,email} = req.body;

    const user = await User.findOne({
        where : {
            id,
            status:'Avaliable'
        }
    })

    if (!user){
        return res.status(404).json({
            status : 'error',
            message : `User wiht ${id} not found`
        })
    }

    await user.update({name,email})

    return res.status(200).json({
        status: 'success',
        message: 'User updated successfully'
    }) 

} catch (error){
    console.log(error);
    res.status(500).json({
        status:'fail',
        message: 'Internal server error',
        error
    })   
}

}
exports.deleteUser = async(req,res) =>{
try{
    const {id}=req.params;
    const user = await User.findOne({
        where:{
            id,
            status:'Avaliable'
        }
    })

    if (!user){
        return res.status(404).json({
            status : 'error',
            message : `User wiht ${id} not found`
        })
    }

    await user.update({status:'No avaliable'})
    return res.status(200).json({
        status:'suscces',
        message:'user deleted succesfully'
    })

}catch(error){
    console.log(error);
    res.status(500).json({
        status:'fail',
        message: 'Internal server error',
        error
    }) 
}
}