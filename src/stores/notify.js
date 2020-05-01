import { derived, readable } from 'svelte/store';
import io from 'socket.io-client';

// notification type\color (succers\error\info)
// id
// label
// text
// time to remove?
// important (remove only by click)

let notify;
const MAX_RECENT_MESSAGES = 30;
const MESSAGE_VISIBLE = 3000;

export const notifyStore = readable([], function (set) {
	let messages = [];
	notify = io('/notify');
	function finishMessage(id) {
		messages = messages.map((message) => ({
			...message,
			elapsed: message.id === id ? false : message.elapsed,
		}));
		set(messages);
	}
	notify.on('message', function (message) {
		const newMessage = { ...message, elapsed: true, recent: true };
		messages.push(newMessage);
		messages = messages.map((message, index, { length }) => ({
			...message,
			recent: index >= length - MAX_RECENT_MESSAGES,
		}));
		set(messages);
		setTimeout(() => finishMessage(message.id), MESSAGE_VISIBLE);
	});
	return () => {
		notify.emit('user disconnect', '%username%');
		notify.disconnect();
	};
});

export const notifyRecentStore = derived(notifyStore, ($notifyStore) =>
	$notifyStore.filter(({ recent }) => recent)
);

export const notifyNotElapsedStore = derived(notifyStore, ($notifyStore) =>
	$notifyStore.filter(({ elapsed }) => elapsed)
);

// const delayed = derived(a, ($a, set) => {
//   setTimeout(() => set($a), 1000);
// }, 'one moment...');

export function sendSocket(message) {
	if (notify) notify.send(message);
}

export function emitNotifyDisconnect() {
	notify.emit('user disconnect', '%username%');
}
