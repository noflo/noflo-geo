const noflo = require('noflo');
const where = require('where');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.icon = 'map-signs';
  c.description = 'Convert a human-readable address to a point';
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
    const address = input.getData('in');
    const geoCoder = new where.Geocoder();
    geoCoder.toPoint(address)
      .then((point) => {
        output.sendDone({
          out: point,
        });
      }, (err) => {
        output.done(err);
      });
  });
  return c;
};
