import { db, rtd } from '../../lib/firebase-admin';
import { ServerValue } from 'firebase-admin/database';

const ROSARY_PRICE_IN_USD = 9.99;

export default async function handler(req, res) {
  const { userId } = req.body;

  // const XR = await db.doc('/XR/15min').get();
  // const {
  //   rates: {
  //     KRW: { value },
  //   },
  // } = XR.data();

  await rtd
    .ref('/Orders')
    .push({
      Platform: 'Signis',
      UserID: userId,
      SoTID: 'SIGNIS_R_1',
      Paid: 'No',
      // Price: (ROSARY_PRICE_IN_USD * value).toFixed(0),
      Price: 13000,
      CreatedAt: ServerValue.TIMESTAMP,
    })
    .then(({ key }) => {
      res.status(201).json({ orderNumber: key });
    })
    .catch((err) => res.status(500).json({ error: err }));
}
