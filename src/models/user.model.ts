import {Schema, model} from "mongoose";

const UserSchema = new Schema(
    {
        firstName: {
          type: String,
          required: true,
        },

        lastName: {
            type: String,
            required: true,
        },
    
        email: {
          type: String,
          required: true,
          unique: true,
        },
    
        verified: {
          type: Boolean,
          default: false,
        },
    
        billingInfo: Schema.Types.Mixed,

        password: String,
    },        
    { timestamps: true },
);

const User = model('User', UserSchema);

export default User;

