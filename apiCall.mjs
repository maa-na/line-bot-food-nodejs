import request from 'request'

const GOURMET_SEARCH_API = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/'

async function getGourmetSearch() {
  const hoge = '東京都府中市'
  console.log(hoge)

  const requestOptions = {
    url: encodeURI(`${GOURMET_SEARCH_API}?key=${process.env.HOTPEPPER_API_KEY}&address=${hoge}`),
    method: "GET",
  }
  console.log(requestOptions)
  return new Promise(function (resolve, reject) {
    request(requestOptions, function (error, res, body) {
      console.log('res1', res)
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
  // request(`${GOURMET_SEARCH_API}?key=${process.env.HOTPEPPER_API_KEY}&address=${hoge}`, function (error, response, body) {
  //   console.log('error', error)
  //   console.log('response', response)
  //   if (!error && response.statusCode == 200) {
  //     console.log(body) // Print the google web page.
  //   }
  // })
};

export { getGourmetSearch };

// async function getGourmetSearch() {
//   const hoge = '東京都府中市'
//   request(`${GOURMET_SEARCH_API}?key=${process.env.HOTPEPPER_API_KEY}&address=${hoge}`, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//       console.log(body) // Print the google web page.
//     }
//   })
// }

// module.exports = getGourmetSearch
