self.addEventListener('push', (e) => {
    const dataText = e.data.text();
    const dataObj = JSON.parse(dataText);

    e.waitUntil(
        self.registration.showNotification(dataObj.title, dataObj)
    );
});

self.addEventListener('notificationclick', (e) => {
    e.notification.close();
    e.waitUntil(
        clients.openWindow(e.notification.data.url)
    );
})