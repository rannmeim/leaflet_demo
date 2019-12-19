var drawControl = new L.Control.Draw(options);
map.addControl(drawControl);
drawControl.setDrawingOptions({
    rectangle: {
        shapeOptions: {
            color: '#0000FF'
        }
    }
});


//编辑-中点
const midPoints = points
    .map((pos, i) => [pos, points[(i + 1) % points.length], i])
    .filter(([a, b]) => calcDistance(a, b) > 40)
    .map(([a, b, i]) => (
    <CircleMarker
      key={id + '-' + i + '-mid'}
      className="midpoint"
      center={midPoint(a, b)}
      radius={8}
      opacity={0.0}
      fillOpacity={0.0}
      onMousedown={e => {
        onChange('add', { point: midPoint(a, b), pos: i + 1, figure });
        skipNextClick();
      }}
    >
      <CircleMarker
        radius={3}
        color="white"
        fill={true}
        fillOpacity={0.5}
        opacity={0.5}
        center={midPoint(a, b)}
      />
    </CircleMarker>
    ));


//simple crs
const crs = CRS.Simple;
const { height, width } = this.props;

if (!height || !width) return null;

const southWest = crs.unproject({ x: 0, y: height }, maxZoom - 1);
const northEast = crs.unproject({ x: width, y: 0 }, maxZoom - 1);
const bounds = new LatLngBounds(southWest, northEast);

return bounds;

// 复位
  onClick={() => {
    const map = this.mapRef.current.leafletElement;
    map.setView(map.options.center, map.options.zoom);
  }}

  map.setView( [70, 120], 1);

//选中后的划线
export function vectorizeSegmentation(imageData, { scaling, smoothing }) {
  scaling = scaling || 1.0;
  smoothing = smoothing || 2.0;
  // reduce from nxmx1 to nxm
  imageData = imageData.map(row => row.map(channels => channels[0]));
  const paths = computeVectorized(imageData);
  return paths.map(path => {
    const simplePath = LineUtil.simplify(
      path.map(([y, x]) => ({ x, y: imageData.length - y })),
      smoothing
    );
    return simplePath.map(({ x, y }) => ({
      lng: x / scaling,
      lat: y / scaling,
    }));
  });
}
