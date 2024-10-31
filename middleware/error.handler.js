

export const Handlerror=(error, req, res, next)=>{
    const statuscode=error.statuscode || 500
    const message=error.message || 'internal server error'
    
    return res.status(statuscode).json({success:false,statuscode, message})
    
}


export const errorHandel=(statuscode,message, success)=>{
    const error=new Error()
    error.statuscode=statuscode
    error.message=message
    error.success=false
    console.log(error.message)
    return error

}