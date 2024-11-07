import { Schema, model } from 'mongoose';

const TransactionSchema = new Schema(
    {
        from: String,
        transfer: {
            id: String,
            resource_type: String,
            transfer_reference: String,
            payment_type: String,
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
                    country: String,
                },
                sanction_score: String,
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
                    country: String,
                },
                name_on_account: String,
                sanction_score: String,
            },
            channel: String,
            statement_descriptor: String,
            transfer_amount: {
                value: String,
                currency: String,
            },
            created: String,
            transaction_history: Schema.Types.Mixed,
            original_status: String,
            status: String,
            status_timestamp: String,
        },
    },
    { timestamps: true },
);

const Transaction = model('Transaction', TransactionSchema);
export default Transaction;
