import { CovalentClient } from "@covalenthq/client-sdk";

export const getTransactionSummary = async (address: string) => {
    const client = new CovalentClient("cqt_rQx9VpJrk9V9ymvBdmc99J4KXMrX");
    const resp = await client.TransactionService.getTransactionSummary("canto-mainnet", address);

    if (resp && resp.data && resp.data.items && resp.data.items.length > 0) {
        let output = `Total transactions: ${resp.data.items[0].total_count}\n\n`;
        output += "------------------------------------------------\n\n";

        resp.data.items.forEach(item => {
            output += "Latest transaction:\n";
            output += `    Block signed at: ${item.latest_transaction.block_signed_at}\n\n`;
            output += `    Transaction hash:\n      ${item.latest_transaction.tx_hash}\n\n`;
            output += `    Transaction detail link: ${item.latest_transaction.tx_detail_link}\n\n`;
            output += "Earliest transaction:\n";
            output += `    Block signed at: ${item.earliest_transaction.block_signed_at}\n\n`;
            output += `    Transaction hash:\n      ${item.earliest_transaction.tx_hash}\n\n`;
            output += `    Transaction detail link: ${item.earliest_transaction.tx_detail_link}\n\n`;
            output += "------------------------------------------------\n\n";
        });

        return output;
    } else {
        return "No transactions found for the specified wallet address.";
    }
}

// getTransactionSummary("0x956c497bf2a6b08e505c7320bad4a2f492f93b4e")


