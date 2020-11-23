import request from 'request'

const GOURMET_SEARCH_API = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/'

async function getGourmetSearch() {
  const hoge = '東京都府中市'
  request(`${GOURMET_SEARCH_API}?key=${process.env.HOTPEPPER_API_KEY}&address=${hoge}`, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(body) // Print the google web page.
    }
  })
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
