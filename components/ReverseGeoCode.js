const noflo = require('noflo');
const where = require('where');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.icon = 'map-signs';
  c.description = 'Convert a point to a human-readable address';
  c.inPorts.add('in', {
    datatype: 'object',
  });
  c.outPorts.add('out', {
    datatype: 'object',
  });
  c.outPorts.add('error', {
    datatype: 'object',
  });
  c.process((input, output) => {
    if (!input.hasData('in')) {
      return;
    }
    let point = input.getData('in');
    if (!(point instanceof where.Point)) {
      point = new where.Point(point.latitude, point.longitude);
    }
    const geoCoder = new where.Geocoder();
    geoCoder.fromPoint(point)
      .then((address) => {
        output.sendDone({
          out: address,
        });
      }, (err) => {
        output.done(err);
      });
  });
  return c;
};
