const init = () => {
  const map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        zIndex: 1,
        visible: false,
      }),
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 3,
    }),
  });

  // Layer group
  const layerGroup = new ol.layer.Group({
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM({
          url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        }),
        zIndex: 0,
        visible: false,
      }),
      // Bing maps layer
      new ol.layer.Tile({
        source: new ol.source.BingMaps({
          key: "ApLmsAhD2fRQfMRDbtpyXH89Au9WMjdZQ34ySMNiwptesntOrDVATuH5hC45KXk6",
          imagerySet: "Road",
        }),
        zIndex: 2,
      }),
    ],
  });

  // map.addLayer(layerGroup);

  // cartodb
  // provider carto.com
  //@reference https://github.com/CartoDB/basemap-styles
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
    }),
    visible: true,
  });
  map.addLayer(cartoDBBaseLayer);

  // TileDebug
  const tileDebugLayer = new ol.layer.Tile({
    source: new ol.source.TileDebug(),
    visible: false,
  });
  map.addLayer(tileDebugLayer);
};

window.onload = init;
