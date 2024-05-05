import { CovalentClient } from "@covalenthq/client-sdk";

export const getBalance = async (address: string) => {
  const client = new CovalentClient("cqt_rQx9VpJrk9V9ymvBdmc99J4KXMrX");
  const resp = await client.BalanceService.getTokenBalancesForWalletAddress("canto-mainnet",address);
  console.log(resp.data);


  if (resp && resp.data && resp.data.items && resp.data.items.length > 0) {

    const balance = resp.data.items[0].balance;
    const currency = resp.data.quote_currency;
    let output = `The balance for the given address (${address}) is: ${balance} ${currency}`
    return output;
} else {
    return "No results found for the specified wallet address.";
}
}

// getBalance("0x977862842e14303A5DdD7b14a01200CE1f9dbDd4");


