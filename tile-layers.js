const init = () => {
  const map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
        zIndex: 1,
        visible: true,
        extent: [
          8934769.09114758, 3181391.35035231, 9793828.656019388,
          3548180.827488588,
        ],
      }),
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 3,
      extent: [
        8934769.09114758, 3181391.35035231, 9793828.656019388,
        3548180.827488588,
      ],
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
        visible: true,
      }),
    ],
  });

  map.addLayer(layerGroup);

  map.on("click", function (e) {
    console.log(e.coordinate);
  });
};

window.onload = init;
