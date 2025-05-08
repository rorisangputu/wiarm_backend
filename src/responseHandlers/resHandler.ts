//Standardized response func
const handleResponse = (res:any, status:number, message:String, data = null) => {
    res.status(status).json({
        status,
        message,
        data
    });
};