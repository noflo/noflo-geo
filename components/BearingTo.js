const noflo = require('noflo');
const where = require('where');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.icon = 'compass';
  c.description = 'Calculate bearing from one point to another';
  c.inPorts.add('from', {
    datatype: 'object',
  });
  c.inPorts.add('to', {
    datatype: 'object',
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
    if (!(from instanceof where.Point)) {
      from = new where.Point(from.latitude, from.longitude);
    }
    if (!(to instanceof where.Point)) {
      to = new where.Point(to.latitude, to.longitude);
    }

    const bearing = from.bearingTo(to);
    output.sendDone({
      out: bearing,
    });
  });
  return c;
};
