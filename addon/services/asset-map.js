import Service from 'ember-service';
import computed from 'ember-computed';

export default Service.extend({
  map: computed(function() {
    let assets;
    try {
      assets = __assetMapHash__;
    } catch (e) {
      assets = {};
    }
    return assets;
  }),

  prepend: computed('map', function(){
    return this.get('map.prepend') || '/';
  }),

  resolve(name) {
    let map = this.get('map.assets') || {};
    let prepend = this.get('map.prepend') || '/';
    let assetName = map[name] ? map[name] : name;

    return `${prepend}${assetName}`;
  }
});
