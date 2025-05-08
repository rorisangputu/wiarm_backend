import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';
import { AdminType } from '../../shared/types';

const adminSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required:true
    }
}, {
    toJSON: {
        transform(doc, ret){
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt
        }
    },
    timestamps: true
})

const Admin = mongoose.model<AdminType>("Admin", adminSchema);
export default Admin;