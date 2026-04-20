importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDbPcOeUQtRa0RBNwMlPsOXVHIEKMiajYU",
  authDomain: "barrio-seguro-app-93edd.firebaseapp.com",
  projectId: "barrio-seguro-app-93edd",
  storageBucket: "barrio-seguro-app-93edd.firebasestorage.app",
  messagingSenderId: "76472451854",
  appId: "1:76472451854:web:7595602fcd6ca40fb8cd5f"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || '🚨 Alerta Vecinal';
  const body = payload.notification?.body || 'Hay una emergencia en tu villa';
  const options = {
    body: body,
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    vibrate: [200, 100, 200, 100, 200],
    requireInteraction: true,
    actions: [{ action: 'ver', title: 'Ver alerta' }]
  ];
  self.registration.showNotification(title, options);
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(clients.openWindow('/'));
});
