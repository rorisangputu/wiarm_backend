import mongoose, {Schema} from 'mongoose';
import bcrypt from 'bcryptjs';
import { AdminType } from '../../shared/types';

const adminSchema = new Schema<AdminType>({
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
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt
        }
    },
    timestamps: true
})

// adminSchema.pre("save", async function(next) {
//     if (this.isModified('password')) {
//         this.password = await bcrypt.hash(this.password, 8)
//     }
//     next();
// })

const Admin = mongoose.model<AdminType>("Admin", adminSchema);
export default Admin;