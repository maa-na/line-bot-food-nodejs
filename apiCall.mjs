import request from 'request'

const GOURMET_SEARCH_API = 'http://webservice.recruit.co.jp/hotpepper/gourmet/v1/'

async function getGourmetSearch() {
  const hoge = '東京都府中市'
  console.log(hoge)

  const requestOptions = {
    url: encodeURI(`${GOURMET_SEARCH_API}?key=${process.env.HOTPEPPER_API_KEY}&address=${hoge}&count=5&format=json`),
    method: "GET",
    json: true
  }
  return new Promise(function (resolve, reject) {
    request(requestOptions, function (error, res, body) {
      if (!error && res.statusCode == 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

export { getGourmetSearch };
