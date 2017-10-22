import Hapi from 'hapi';
import Good from 'good';
import Inert from 'inert';

const server = new Hapi.Server();
server.connection({
	port: 3000,
	host: 'localhost'
});

server.register(Inert, err => {
	if (err) {
		throw err;
	}

	server.route({
		path: '/schedule/rtaij2',
		method: 'GET',
		handler: (request, reply) => {
			reply.file('./public/test.json');
		}
	});
});

server.register({
	register: Good,
	options: {
		reporters: {
			console: [{
				module: 'good-squeeze',
				name: 'Squeeze',
				args: [{
					response: '*',
					log: '*'
				}]
			}, {
				module: 'good-console'
			}, 'stdout']
		}
	}
}, err => {
	if (err) {
		throw err;
	}

	server.start(err => {
		if (err) {
			throw err;
		}
		server.log('info', 'Server running at: ' + server.info.uri);
	});
});
