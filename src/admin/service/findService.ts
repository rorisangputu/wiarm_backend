import Admin from "../models/admin.model"

export const findAdmin = async (id: String | undefined, email?: String)=> {
    if(email){
        const admin = await Admin.findOne({email: email})
        return admin;
    }else{
        let admin = await Admin.findById(id);
        return admin;
    }
}