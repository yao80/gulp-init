/**
 * GoogleMap
 * @param {object} $target ターゲット
 */

function GoogleMap() {
}

GoogleMap.prototype = {
  lat: [],
  lng: [],
  latlng: [],

  mapOptions: [],
  map: [],
  marker: [],
  infoWindow: [],

  init : function(id,data){
    this.len = id.length;
    for (var i = 0; i < this.len; i++) {
      this.lat[i] = data[i].lat;
      this.lng[i] = data[i].lng;
      this.latlng[i] = new google.maps.LatLng(this.lat[i], this.lng[i]);
      this.mapOptions[i] = {
        zoom: 16,
        center: this.latlng[i],
        disableDefaultUI: true,
        zoomControl: true,
        zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
        },
        scrollwheel: false
      };

      this.map[i] = new google.maps.Map(document.getElementById(id[i]), this.mapOptions[i]);
      this.marker[i] = new google.maps.Marker({
        position: this.latlng[i],
        map: this.map[i],
        icon: {
          url: data[i].baloonImg,
          scaledSize: new google.maps.Size(40, 38)
        },
        title: data[i].ttl
      });
      this.infoWindow[i] = new google.maps.InfoWindow();

      this.dispInfo(
        this.infoWindow[i],
        this.map[i],
        this.marker[i],
        data[i].txt
      );
    }
  },
  dataSet: function() {
    this.mapData = {
      lat: "35.664806",
      lng: "139.7012887",
      ttl: "株式会社",
      baloonImg: "/images/map_bln.png",
      txt: '<h1 class="info-title">テキスト</h1>'
    };
  },
  dispInfo: function(infoWindow, map, marker, content, latlng) {
    google.maps.event.addListener(marker, "click", function() {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
      map.panTo(latlng);
    });
  }
};

module.exports = GoogleMap;
