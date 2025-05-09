import Admin from "../admin/models/admin.model"

export const findAdmin = async (id: string | undefined, email?: string)=> {
    if(email){
        const admin = await Admin.findOne({email: email})
        return admin;
    }else{
        let admin = await Admin.findById(id);
        return admin;
    }
}