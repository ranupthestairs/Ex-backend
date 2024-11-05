import { Schema, model } from 'mongoose';

const VerificationSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        code: {
            type: Number,
            required: true,
        },
        expires: {
            type: Date,
            required: true,
        },
        resendAttempts: {
            type: Number,
            default: 0,
        }
    },
    { timestamps: true }
);

const VerificationCode = model('VerificationCode', VerificationSchema);
export default VerificationCode;
