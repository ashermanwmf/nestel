class Nestel {
  constructor(config) {
    const { blackList, deliminator, whiteList } = config;

    this._whiteList = whiteList;
    this._blackList = blackList;
    this._deliminator = deliminator;
    return this.nestelReqQuery.bind(this);
  }

  nestelReqQuery(req, res, next) {
    const { _deliminator: deliminator } = this,
      { query } = req;

    if (!deliminator) next();
    req.query = this._parseQuery(query, deliminator);
    next();
  }

  _parseQuery(query, deliminator) {
    return Object.keys(query).reduce((acc, originalKey) => {
      const parsedKeys = originalKey.split(deliminator),
        value = query[originalKey];
      let nxt;

      if (parsedKeys.length > 1) {
        nxt = parsedKeys.reduceRight((nxtAcc, key) => {
          const obj = {};
          obj[key] = nxtAcc;
          return obj;
        }, value);
      } else {
        nxt[originalKey] = value;
      }

      return this._mergeDeep(acc, nxt);
    }, {});
  }

  _mergeDeep(target, source) {
    const output = Object.assign({}, target);

    if (this._isObject(target) && this._isObject(source)) {
      Object.keys(source).forEach((key) => {
        if (this._isObject(source[key])) {
          if (!(key in target)) {
            Object.assign(output, { [key]: source[key] });
          } else {
            output[key] = this._mergeDeep(target[key], source[key]);
          }
        } else {
          Object.assign(output, { [key]: source[key] });
        }
      });
    }

    return output;
  }

  _isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }
}

module.exports = Nestel;
