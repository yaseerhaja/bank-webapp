const express = require('express');
const router = express.Router();
const logger = require('../../logger');
const request = require('request');

const CURRENCY_API = process.env.CURRENCY_API;
const API_KEY = process.env.API_KEY;

router.post('/transactions', (req, res) => {
  logger.log('info', '%s', req.originalUrl);

  //const uri = `https://${CURRENCY_API}/v1/latest?apikey=${API_KEY}`;
  // request.get(uri,
  //   {},
  //   (error, response) => {
  //     if (error) {
  //       res.send(error);
  //     } else {
  //       logger.log('info', '%s', JSON.stringify(response.body));
  //       res
  //         .header("")
  //         .status(response.statusCode)
  //         .json({ ...require('../../transactions.json'), ...JSON.parse(response.body)});
  //     }
  //   });

  const currencyData = {
    data: {
      AUD: 1.494324,
      BGN: 1.782338,
      BRL: 5.049605,
      CAD: 1.367752,
      CHF: 0.892965,
      CNY: 6.893613,
      CZK: 21.390529,
      DKK: 6.784312,
      EUR: 0.901101,
      GBP: 0.804183,
      HKD: 7.849964,
      HRK: 6.789345,
      HUF: 342.04565,
      IDR: 14936.015175,
      ILS: 3.662422,
      INR: 82.04095,
      ISK: 136.600235,
      JPY: 134.165201,
      KRW: 1330.372661,
      MXN: 17.98642,
      MYR: 4.438007,
      NOK: 10.448351,
      NZD: 1.628667,
      PHP: 55.87059,
      PLN: 4.197871,
      RON: 4.492708,
      RUB: 81.450092,
      SEK: 10.290712,
      SGD: 1.335102,
      THB: 34.362066,
      TRY: 19.40163,
      USD: 1,
      ZAR: 18.085764
    }
  };
  res.send({...require('../../transactions.json'), ...currencyData});
  
});

module.exports = router;
