const noflo = require('noflo');
const where = require('where');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.icon = 'map-marker';
  c.description = 'Create a geographical point';
  c.inPorts.add('latitude', {
    datatype: 'number',
  });
  c.inPorts.add('longitude', {
    datatype: 'number',
  });
  c.outPorts.add('out', {
    datatype: 'object',
  });
  c.outPorts.add('error', {
    datatype: 'object',
  });
  c.forwardBrackets = {
    latitude: ['out', 'error'],
    longitude: ['out', 'error'],
  };
  c.process((input, output) => {
    if (!input.hasData('latitude', 'longitude')) {
      return;
    }
    const [latitude, longitude] = input.getData('latitude', 'longitude');
    output.sendDone({
      out: new where.Point(latitude, longitude),
    });
  });
  return c;
};
