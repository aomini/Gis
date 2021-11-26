const init = () => {
  // Controls
  const fullScreenControl = new ol.control.FullScreen();
  const ScaleLine = new ol.control.ScaleLine();

  const map = new ol.Map({
    target: "map",
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 3,
    }),
    keyboardEventTarget: document,
    controls: ol.control.defaults().extend([fullScreenControl, ScaleLine]),
  });

  const popupCoord = document.getElementById("popupCoord");
  const overlay = new ol.Overlay({
    element: popupCoord,
    positioning: "center-right",
  });
  map.addOverlay(overlay);

  map.on("click", function (e) {
    const { coordinate } = e;
    overlay.setPosition(undefined);
    popupCoord.innerText = coordinate.join(", ");
    overlay.setPosition(coordinate);
  });

  // dragrotate interaction
  const dragRotateInteraction = new ol.interaction.DragRotate({
    condition: ol.events.condition.altKeyOnly,
  });

  map.addInteraction(dragRotateInteraction);

  const drawInteraction = new ol.interaction.Draw({
    type: "Polygon",
  });

  map.addInteraction(drawInteraction);

  drawInteraction.on("drawend", function (e) {
    let parser = new ol.format.GeoJSON();
    console.log(parser.writeFeaturesObject([e.feature]));
  });
};

window.onload = init;
