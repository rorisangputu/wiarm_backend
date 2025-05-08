//Standardized response func
const handleResponse = (res:any, status:number, message:String, data: unknown) => {
    res.status(status).json({
        status,
        message,
        data
    });
};