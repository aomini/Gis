const init = () => {
  const attributionControl = new ol.control.Attribution({
    collapsible: true,
  });
  const map = new ol.Map({
    target: "map",
    view: new ol.View({
      center: [0, 0],
      zoom: 3,
    }),
    controls: ol.control
      .defaults({ attribution: false })
      .extend([attributionControl]),
  });

  // Base Layer
  // Openstreet Map Standar
  const openStreetMapStandardLayer = new ol.layer.Tile({
    source: new ol.source.OSM(),
    visible: false,
    title: "OSMStandard",
  });

  //humanitarian
  const openStreetMapHumanitarian = new ol.layer.Tile({
    source: new ol.source.OSM({
      url: "https://{a-c}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
    }),
    visible: false,
    title: "OSMHumanitarian",
  });

  // Bing maps layer
  const bingmaps = new ol.layer.Tile({
    source: new ol.source.BingMaps({
      key: "ApLmsAhD2fRQfMRDbtpyXH89Au9WMjdZQ34ySMNiwptesntOrDVATuH5hC45KXk6",
      imagerySet: "Road",
    }),
    visible: false,
    title: "BingMaps",
  });

  // cartodb
  // provider carto.com
  //@reference https://github.com/CartoDB/basemap-styles
  const cartoDBBaseLayer = new ol.layer.Tile({
    source: new ol.source.XYZ({
      url: "https://{1-4}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}.png",
    }),
    visible: false,
    title: "CartoDarkAll",
  });

  //stamen
  // @reference maps.stamen.com
  const stamenLayer = new ol.layer.Tile({
    source: new ol.source.Stamen({
      layer: "watercolor",
    }),
    visible: false,
    title: "StamenTerrain",
  });

  // Base vector layers
  // Vector tile layer open street map
  const openStreetMapVectorTile = new ol.layer.VectorTile({
    source: new ol.source.VectorTile({
      url: "https://api.maptiler.com/tiles/v3-openmaptiles/{z}/{x}/{y}.pbf?key=1osjkWprx6Puy9Pnocom",
      format: new ol.format.MVT(),
      attributions:
        '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    }),
    visible: true,
  });

  map.addLayer(openStreetMapVectorTile);

  // Layer group
  const baseLayerGroup = new ol.layer.Group({
    layers: [
      openStreetMapStandardLayer,
      openStreetMapHumanitarian,
      bingmaps,
      cartoDBBaseLayer,
      stamenLayer,
    ],
  });

  map.addLayer(baseLayerGroup);

  // switch layers
  const baseLayerElements = document.querySelectorAll(
    ".sidebar > input[type=radio]"
  );
  for (let baseLayerElement of baseLayerElements) {
    baseLayerElement.addEventListener("change", (e) => {
      const { value } = e.target;
      baseLayerGroup.getLayers().forEach(function (element, index, array) {
        let baseLayerName = element.get("title");
        element.setVisible(baseLayerName === value);
      });
    });
  }

  // TileDebug
  /*
  const tileDebugLayer = new ol.layer.Tile({
    source: new ol.source.TileDebug(),
  });
  map.addLayer(tileDebugLayer);
  */

  // Tile Arc
  // @reference https://openlayers.org/en/latest/apidoc/module-ol_source_TileArcGISRest-TileArcGISRest.html
  // @reference http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer
  // @reference https://www.esri.com/en-us/home
  const tileArcGisRestLayer = new ol.layer.Tile({
    source: new ol.source.TileArcGISRest({
      url: "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/MapServer",
    }),
    visible: false,
    title: "TileArcGISLayer",
  });
  map.addLayer(tileArcGisRestLayer);

  const rasterLayers = document.querySelector(
    ".sidebar > input[type='checkbox']"
  );
  rasterLayers.addEventListener("change", (e) => {
    tileArcGisRestLayer.setVisible(e.target.checked);
  });
};

window.onload = init;
