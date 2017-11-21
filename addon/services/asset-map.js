import Service from 'ember-service';
import computed from 'ember-computed';

export default Service.extend({
  map: __assetMapHash__,

  resolve(name) {
    let map = this.get('map.assets') || {};
    let prepend = this.get('map.prepend') || '/';
    let assetName = map[name] ? map[name] : name;

    return `${prepend}${assetName}`;
  }
});
