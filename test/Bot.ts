import { Telegraf } from 'telegraf';
import { message } from 'telegraf/filters';
import "dotenv/config"
import { getBalance } from './getWalletBalance'
import { getTransactionSummary } from './getTransSummary';

const bot = new Telegraf('7170893160:AAGEnwBDep2n2JMNXWHjk8_zytlrxYAUyww');
bot.start((ctx) => {
  const welcomeMessage =
  `👋 Welcome to Canto Compass! A one-stop bot to help you navigate the Canto blockchain.

  You can use me by sending these commands:

  /queries
  ❓ Queries - Get instant answers to frequently asked questions

  /analytics
  📈 Analytics - Dive into wallet details\n`;

  ctx.reply(welcomeMessage);

})

bot.command('analytics', async (ctx) => {
  await ctx.reply("Please enter your wallet address");
  let walletAddress: string = '';

  bot.on(message('text'), async (ctx) => {
    walletAddress = ctx.message.text.trim();

    ctx.telegram.sendMessage(ctx.chat.id, 'How can I help you?',
      {
        reply_markup: {
          inline_keyboard: [
            [{text: "Get Wallet Balance", callback_data: "get_balance"}],
            [{text: "Get Transaction Summary", callback_data: "get_txn_summary"}]
          ]
        }
      }
    )
  });

  bot.action('get_balance', async (ctx) => {
    const addressBal = await getBalance(walletAddress);
    ctx.telegram.sendMessage(ctx.chat?.id as number, `${addressBal}`,
      {
        reply_markup: {
          inline_keyboard: [
            [{text: "Go back to Menu", callback_data: "go"}]
          ]
        }
      }
    )
  })

  bot.action('get_txn_summary', async (ctx) => {
    const transSumm = await getTransactionSummary(walletAddress);
    ctx.telegram.sendMessage(ctx.chat?.id as number, `${transSumm}`,
      {
        reply_markup: {
          inline_keyboard: [
            [{text: "Go back to Menu", callback_data: "go"}]
          ]
        }
      }
    )
})

  bot.action('go', async (ctx) => {
    ctx.telegram.sendMessage(ctx.chat?.id as number, 'How can I help you?',
      {
        reply_markup: {
          inline_keyboard: [
            [{text: "Get Wallet Balance", callback_data: "get_balance"}],
            [{text: "Get Transaction Summary", callback_data: "get_txn_summary"}],
            [{text: "Go back to Main Menu", callback_data: "main"}]
          ]
        }
      }
    )
  })

  bot.action('main', async (ctx) => {
    const welcomeMessage =
    `👋 Welcome to Canto Compass! A one-stop bot to help you navigate the Canto blockchain.

    You can use me by sending these commands:

        /queries
        ❓ Queries - Get instant answers to frequently asked questions

        /analytics
        📈 Analytics - Dive into wallet details\n


          `;

    ctx.reply(welcomeMessage);
  })

});

bot.command('queries', (ctx) => {
  ctx.telegram.sendMessage(ctx.chat.id, 'What do you want to know?',
      {
        reply_markup: {
          inline_keyboard: [
            [{text: "What is Canto?", callback_data: "canto_blockchain"}],
            [{text: "How can I stay updated with the latest news and engage with the Canto community?", callback_data: "canto_comm"}],
            [{text: "How to connect to Canto?", callback_data: "connect_to_canto"}],
            [{text: "How to bridge assets", callback_data: "bridge"}],
            [{text: "How to provide liquidity", callback_data: "liquidity"}],
            [{text: "Lending and borrowing assets", callback_data: "assets"}],
            [{text: "How to Stake?", callback_data: "staking"}]
          ]
        }
      }
    )

    bot.action('canto_blockchain', async (ctx) => {
      ctx.telegram.sendMessage(ctx.chat?.id as number, 'Canto is a permissionless general-purpose blockchain running the Ethereum Virtual Machine (EVM). It was built to deliver on the promise of DeFi – that through a post-traditional financial movement, new systems will be made accessible, transparent, decentralized, and free.\nLink to the official website - [Canto](https://explore.canto.io/)',
      {
        reply_markup: {
          inline_keyboard: [
            [{text: "Go back to Menu", callback_data: "go_back"}]
          ]
        }
      }
    )
    });

    bot.action('canto_comm', async (ctx) => {
      ctx.telegram.sendMessage(ctx.chat?.id as number, '🌐 Stay connected and informed with Canto\'s vibrant community through the following channels:\n\n🔹 Discord: Join the Discord server to interact with fellow Canto enthusiasts, ask questions, and participate in discussions. (https://discord.com/invite/63GmEXZsVf)\n\n🔹 Blog: Explore the official blog for insightful articles, project updates, and announcements straight from the Canto team. (https://canto.mirror.xyz/)\n\n🔹 Twitter: Follow Canto on Twitter for real-time updates, news highlights, and exciting announcements. (https://twitter.com/cantopublic)', {
          reply_markup: {
              inline_keyboard: [
                  [{ text: "Go back to Menu", callback_data: "go_back" }]
              ]
          }
      });
  });

  bot.action('connect_to_canto', async (ctx) => {
    // ctx.reply(, );
    ctx.telegram.sendMessage(ctx.chat?.id as number, `As an EVM-compatible chain, you can connect to the Canto network using any Ethereum wallet.\n For more details visit - https://docs.canto.io/user-guides/connecting-to-canto \n\nWith MetaMask -\nAssuming you have already installed and configured MetaMask in your browser of choice, follow these steps to add the Canto network:\n1. Open the MetaMask extension.\n2. At the top of the interface, click on the network you are connected to e.g. "Ethereum Mainnet".\n3. Click on "Add Network".\n4. Enter the following RPC settings:\n   - Network Name: CANTO\n   - New RPC URL: https://canto.slingshot.finance\n   - Chain ID: 7700\n   - Currency Symbol: CANTO\n   - Block Explorer URL: https://www.oklink.com/canto\nAfter saving the network, you will be able to connect to it at any time using the dropdown menu.`,
    {
      reply_markup: {
        inline_keyboard: [
          [{text: "Go back to Menu", callback_data: "go_back"}]
        ]
      }
    }
  )
  });

  bot.action('bridge', async (ctx) => {
    ctx.telegram.sendMessage(ctx.chat?.id as number, `The canto.io/bridge frontend allows you to bridge assets in and out of Canto from Ethereum, Cosmos Hub, and other IBC-enabled chains. Under the hood, it is powered by Gravity Bridge, LayerZero, and IBC, depending on the asset being bridged.\n\nFor more information about using the frontend, see the following pages:\n\nBridging to Canto - https://docs.canto.io/user-guides/bridging-assets/to-canto \n\nBridging from Canto - https://docs.canto.io/user-guides/bridging-assets/from-canto \n\nFor more information, check out https://docs.canto.io/user-guides/providing-liquidity`, {
        reply_markup: {
            inline_keyboard: [
                [{ text: "Go back to Menu", callback_data: "go_back" }]
            ]
        }
    });
});


bot.action('liquidity', async (ctx) => {
  ctx.telegram.sendMessage(ctx.chat?.id as number, `The canto.io frontend offers two interfaces for providing liquidity on the Canto DEX and Ambient:\n\n- canto.io/lp – for incentivized pairs\n- pools.canto.io – for all other pairs\n\nFor more information, check out https://docs.canto.io/user-guides/providing-liquidity`, {
      reply_markup: {
          inline_keyboard: [
              [{ text: "Go back to Menu", callback_data: "go_back" }]
          ]
      }
  });
});


bot.action('assets', async (ctx) => {
  ctx.telegram.sendMessage(ctx.chat?.id as number, `The Canto Lending Market at canto.io/lending allows users to lend and borrow assets. Currently, USDC, USDT, and NOTE can be supplied to and borrowed from the Canto Lending Market. Additionally, USYC can be supplied.\n\nFor more information, check out the documentation https://docs.canto.io/user-guides/lending-and-borrowing`, {
      reply_markup: {
          inline_keyboard: [
              [{ text: "Go back to Menu", callback_data: "go_back" }]
          ]
      }
  });
});


  bot.action('staking', async (ctx) => {
    ctx.telegram.sendMessage(ctx.chat?.id as number, `Staking, also known as delegating, is the process of locking up your CANTO tokens for a period of time to contribute to the security of the Canto network.\nIn exchange for locking up your tokens, you'll earn rewards in the form of additional CANTO, as well as voting power for governance proposals. For more details visit - [Staking] (https://docs.canto.io/user-guides/staking)`,
    {
      reply_markup: {
        inline_keyboard: [
          [{text: "Go back to Menu", callback_data: "go_back"}]
        ]
      }
    }
  )
  });

    bot.action('go_back', async (ctx) => {
      ctx.telegram.sendMessage(ctx.chat?.id as number, 'How can I help you?',
        {
          reply_markup: {
            inline_keyboard: [
              [{text: "What is Canto?", callback_data: "canto_blockchain"}],
              [{text: "How can I stay updated with the latest news and engage with the Canto community?", callback_data: "canto_comm"}],
              [{text: "How to connect to Canto?", callback_data: "connect_to_canto"}],
              [{text: "How to bridge assets", callback_data: "bridge"}],
              [{text: "How to provide liquidity", callback_data: "liquidity"}],
              [{text: "Lending and borrowing assets", callback_data: "assets"}],
              [{text: "How to Stake?", callback_data: "staking"}],
              [{text: "Back to Main Menu", callback_data: "main"}]
            ]
          }
        }
      )
    })

    bot.action('main', async (ctx) => {
      const welcomeMessage =
      `👋 Welcome to Canto Compass! A one-stop bot to help you navigate the Canto blockchain.\n You can use me by sending these commands:

    /queries
    ❓ Queries - Get instant answers to frequently asked questions

    /analytics
    📈 Analytics - Dive into wallet details\n\n`;

      ctx.reply(welcomeMessage);
    })

});


bot.launch()

