export const marketConfig = () => ({
  market: {
    websocketUrl: process.env.MARKET_WEBSOCKET_URL,
    pollingInterval: parseInt(process.env.MARKET_POLLING_INTERVAL, 10) || 10000,
  },
});
