import { Schema, model } from 'mongoose';

const TransactionSchema = new Schema({
    from: String,
    payment_transfer: {
        transfer_reference: String,
        payment_type: String,
        amount: String,
        currency: String,
        sender_account_uri: String,
        sender: {
            first_name: String,
            last_name: String,
            account_type: String,
            address: {
                line1: String,
                line2: String,
                city: String,
                country_subdivision: String,
                postal_code: String,
                country: String
            }
        },
        funding_source: String,
        transaction_purpose: String,
        recipient_account_uri: String,
        recipient: {
            first_name: String,
            last_name: String,
            account_type: String,
            address: {
                line1: String,
                line2: String,
                city: String,
                country_subdivision: String,
                postal_code: String,
                country: String
            }
        },
        channel: String,
        statement_descriptor: String
        }
    },
    { timestamps: true},
);

const Transaction = model('Transaction', TransactionSchema);
export default Transaction;