import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let app;
let messaging;

function assertFirebaseConfig() {
  const missing = Object.entries(firebaseConfig)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missing.length > 0) {
    throw new Error(`Missing Firebase config: ${missing.join(', ')}`);
  }

  if (!import.meta.env.VITE_FIREBASE_VAPID_KEY) {
    throw new Error('Missing Firebase Web Push VAPID key');
  }
}

async function getMessagingInstance() {
  assertFirebaseConfig();

  const supported = await isSupported();
  if (!supported) {
    throw new Error('Firebase messaging is not supported in this browser');
  }

  if (!app) {
    app = initializeApp(firebaseConfig);
  }

  if (!messaging) {
    messaging = getMessaging(app);
  }

  return messaging;
}

export async function registerFirebaseServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    throw new Error('Service workers are not supported in this browser');
  }

  assertFirebaseConfig();

  const params = new URLSearchParams(firebaseConfig);
  return navigator.serviceWorker.register(`/firebase-messaging-sw.js?${params.toString()}`);
}

export async function requestFirebaseNotificationToken() {
  if (!('Notification' in window)) {
    throw new Error('Notifications are not supported in this browser');
  }

  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Notification permission was not granted');
  }

  const registration = await registerFirebaseServiceWorker();
  const messagingInstance = await getMessagingInstance();

  return getToken(messagingInstance, {
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });
}

export async function listenForForegroundMessages(callback) {
  const messagingInstance = await getMessagingInstance();
  return onMessage(messagingInstance, callback);
}

export { firebaseConfig };
