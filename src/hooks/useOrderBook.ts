import {useEffect, useRef, useState} from 'react';

export type Order = {
  price: number;
  total: number;
};

type OrderBookData = {
  bids: Order[];
  asks: Order[];
};

const useOrderBook = (): OrderBookData => {
  const [bids, setBids] = useState<Order[]>([]);
  const [asks, setAsks] = useState<Order[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

    ws.current.onopen = () => {
      ws.current?.send(
        JSON.stringify({
          event: 'subscribe',
          channel: 'book',
          symbol: 'tBTCUSD',
        }),
      );
    };

    ws.current.onmessage = e => {
      const data = JSON.parse(e.data);

      // Ignore heartbeats
      if (data[1] === 'hb') return;

      // Initial snapshot (array of arrays)
      if (Array.isArray(data) && Array.isArray(data[1][0])) {
        const snapshot = data[1];
        const newBids: Order[] = [];
        const newAsks: Order[] = [];

        snapshot.forEach(([price, count, amount]: [number, number, number]) => {
          const total = Math.abs(amount * count);
          if (amount > 0) {
            newBids.push({price, total});
          } else {
            newAsks.push({price, total});
          }
        });

        // Sort bids descending by price and asks ascending by price
        setBids(newBids.sort((a, b) => b.price - a.price).slice(0, 15));
        setAsks(newAsks.sort((a, b) => a.price - b.price).slice(0, 15));
      }

      // Single update (array of 3 numbers)
      else if (Array.isArray(data) && Array.isArray(data[1])) {
        const [price, count, amount] = data[1];
        const total = Math.abs(amount * count);

        setBids(prev => {
          let newBids = [...prev];
          if (amount > 0) {
            const index = newBids.findIndex(b => b.price === price);
            if (count === 0) {
              if (index !== -1) newBids.splice(index, 1);
            } else {
              if (index !== -1) newBids[index] = {price, total};
              else newBids.push({price, total}); // Add to array for sorting
            }
          }
          return newBids.sort((a, b) => b.price - a.price).slice(0, 15);
        });

        setAsks(prev => {
          let newAsks = [...prev];
          if (amount < 0) {
            const index = newAsks.findIndex(a => a.price === price);
            if (count === 0) {
              if (index !== -1) newAsks.splice(index, 1);
            } else {
              if (index !== -1) newAsks[index] = {price, total};
              else newAsks.push({price, total}); // Add to array for sorting
            }
          }
          return newAsks.sort((a, b) => a.price - b.price).slice(0, 15);
        });
      }
    };

    return () => {
      ws.current?.close();
    };
  }, []);
  return {bids, asks};
};
export {useOrderBook};
