import * as websocket from 'websocket';
import Xev from 'xev';

const ev = new Xev();

export default function homeStream(request: websocket.request, connection: websocket.connection): void {
	const onStats = stats => {
		connection.send(JSON.stringify({
			type: 'stats',
			body: stats
		}));
	};

	ev.addListener('stats', onStats);

	connection.on('close', () => {
		console.log('yooo');
		ev.removeListener('stats', onStats);
	});
}
