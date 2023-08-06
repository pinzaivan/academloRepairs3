const Repair = require("../models/repairs.model");

exports.findAllRepair = async(req,res) =>{
try{
    const repairs = await Repair.findAll()

    return res.status(200).json({
        status:'success',
        repairs 

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
exports.findOneRepair = async(req,res) =>{
try{
    const {id} = req.params
    const repair = await Repair.findOne({
        where:{
            id,
            status:'Pending'
        }
    })

    if(!repair){
        return res.status(404).json({
            status : 'error',
            message: `repair with id ${id}, not found`
        })
    }

    return res.status(200).json({
        status: 'success',
        repair
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
exports.createRepair = async(req,res) =>{
try{
    const {date,status,userId} = req.body;

    const repair= await Repair.create({date,status,userId})

    return res.status(201).json({
        status:'sucess',
        repair,
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
exports.updateRepair = async(req,res) =>{
try{
    const {id}=req.params;
    const {status} = req.body;

    const repair = await Repair.findOne({
        where : {
            id,
            status:'Pending'
        }
    })

    if (!repair){
        return res.status(404).json({
            status : 'error',
            message : `Repair wiht ${id} not found`
        })
    }

    await repair.update({status})

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
exports.deleteRepair = async(req,res) =>{
try{
    const {id}=req.params;
    const repair = await Repair.findOne({
        where:{
            id,
            status:'Pending'
        }
    })

    if (!repair){
        return res.status(404).json({
            status : 'error',
            message : `Repair wiht ${id} not found`
        })
    }

    await repair.update({status:'Cancelled'})
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