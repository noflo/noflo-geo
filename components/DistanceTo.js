const noflo = require('noflo');
const where = require('where');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.icon = 'arrows-h';
  c.description = 'Calculate great circle distance between two points';
  c.inPorts.add('from', {
    datatype: 'object',
  });
  c.inPorts.add('to', {
    datatype: 'object',
  });
  c.inPorts.add('unit', {
    datatype: 'string',
    values: ['K', 'N'],
    default: 'K',
    control: true,
  });
  c.outPorts.add('out', {
    datatype: 'number',
  });
  c.outPorts.add('error', {
    datatype: 'object',
  });
  c.forwardBrackets = {
    from: ['out', 'error'],
    to: ['out', 'error'],
  };
  c.process((input, output) => {
    if (!input.hasData('from', 'to')) {
      return;
    }
    let [from, to] = input.getData('from', 'to');
    let unit = 'K';
    if (input.hasData('unit')) {
      unit = input.getData('unit');
    }
    if (!(from instanceof where.Point)) {
      from = new where.Point(from.latitude, from.longitude);
    }
    if (!(to instanceof where.Point)) {
      to = new where.Point(to.latitude, to.longitude);
    }

    const distance = from.distanceTo(to, unit);
    output.sendDone({
      out: distance,
    });
  });
  return c;
};
