import { Schema, model } from 'mongoose';

const UserSchema = new Schema(
    {
        given_name: {
            type: String,
        },

        family_name: {
            type: String,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        sub: {
            type: String,
            required: true,
        },

        verified: {
            type: Boolean,
            default: false,
        },

        billingInfo: Schema.Types.Mixed,
        recipientInfo: Schema.Types.Mixed,

        password: String,
    },
    { timestamps: true },
);

const User = model('User', UserSchema);

export default User;
