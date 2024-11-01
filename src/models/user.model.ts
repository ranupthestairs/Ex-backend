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
    
        accountType: String,
        address: {
            line1: String,
            line2: String,
            city: String,
            countrySubdivision: String,
            postalCode: String,
            country: String,
        },

        debitUri: String,

        password: String,
    },        
    { timestamps: true },
);

const User = model('User', UserSchema);

export default User;

