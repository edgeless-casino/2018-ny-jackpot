const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  assetPrefix: isProd ? '/2018-ny-jackpot/' : '',
  exportPathMap: function () {
    return {
      '/': { page: '/' }
    }
  }
};
