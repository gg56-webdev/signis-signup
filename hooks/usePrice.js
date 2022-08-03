import { useState, useEffect } from 'react';

const AVG_USD_TO_KRW_RATE = 1_144;

export function usePrice(priceInUSD) {
  // const [priceInKRW, setPriceInKRW] = useState(
  //   (priceInUSD * AVG_USD_TO_KRW_RATE).toLocaleString('ko', { maximumFractionDigits: 0 })
  // );
  // const [ratesLoading, setRatesLoading] = useState(true);

  // useEffect(() => {
  //   Promise.all([import('../lib/firebase'), import('firebase/firestore')])
  //     .then(([{ db }, { getDoc, doc }]) => getDoc(doc(db, 'XR', '15min')))
  //     .then((doc) => {
  //       const {
  //         rates: {
  //           KRW: { value },
  //         },
  //       } = doc.data();
  //       const price = (priceInUSD * value).toLocaleString('ko', { maximumFractionDigits: 0 });
  //       setPriceInKRW(price);
  //       setRatesLoading(false);
  //     })
  //     .catch((err) => console.error(err));
  // }, [priceInUSD]);

  // return { ratesLoading, priceInKRW };
  return { ratesLoading: false, priceInKRW: (13000).toLocaleString('ko', { maximumFractionDigits: 0 }) };
}
