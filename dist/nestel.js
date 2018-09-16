class Nestel {
  constructor(config) {
    const { routes, deliminator } = config;
    this._routes = routes;
    this._deliminator = deliminator;
    return this.nestelReqParams.bind(this)
  }

  nestelReqParams(req, res, next) {
    const { 
        _routes: routes,
        _deliminator: deliminator,
        _parseQuery: parsedQuery
      } = this,
      { query, _parsedUrl: { pathname } } = req,
      foundRoute = routes.find((path) => path === pathname);
    
    if (!deliminator) next();
    if (!foundRoute) next();

    req.query = parsedQuery(query, deliminator);
    next();
  }

  _parseQuery(query, deliminator) {
    return Object.keys(query).reduce((acc, originalKey) => {
      const parsedKeys = originalKey.split(deliminator),
        value = query[originalKey];

      if (parsedKeys.length > 1) {
        acc = parsedKeys.reduceRight((acc, key) => {
          const obj = {};
          obj[key] = acc;
          return obj;
        }, value);
      } else {
        acc[originalKey] = value;
      }
      
      return acc;
    }, {})
  }
}

module.exports = Nestel;