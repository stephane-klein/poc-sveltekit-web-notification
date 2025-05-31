console.log('service-worker begin');
self.addEventListener('push', event => {
    const data = event.data ? event.data.json() : {};
    console.log('addEventListener', data);

    const options = {
        body: data.body || 'Nouvelle notification',
        tag: 'default'
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'Notification', options)
    );
});
console.log('service-worker end');
