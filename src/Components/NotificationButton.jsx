import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { requestFirebaseNotificationToken } from '../services/firebaseService';

function getDeviceName() {
  const platform = navigator.platform || 'Unknown platform';
  const browser = navigator.userAgent.includes('Chrome')
    ? 'Chrome'
    : navigator.userAgent.includes('Firefox')
      ? 'Firefox'
      : navigator.userAgent.includes('Safari')
        ? 'Safari'
        : 'Browser';

  return `${browser} on ${platform}`.slice(0, 100);
}

const NotificationButton = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem('notificationsSubscribed');
    setIsSubscribed(subscribed === 'true');
  }, []);

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      alert('Notification permission denied');
      return;
    }

    setLoading(true);
    try {
      if (!api.auth.isLoggedIn()) {
        alert('Please log in before enabling notifications');
        return;
      }

      const token = await requestFirebaseNotificationToken();
      if (!token) {
        throw new Error('Firebase did not return a device token');
      }

      await api.notifications.registerDevice(token, 'WEB', getDeviceName());

      localStorage.setItem('notificationsSubscribed', 'true');
      localStorage.setItem('notificationToken', token);
      setIsSubscribed(true);

      new Notification('Notifications Enabled', {
        body: 'You will now receive updates from IIIT Insider',
        icon: '/logo.png'
      });
    } catch (error) {
      console.error('Error subscribing to notifications:', error);
      alert(`Failed to subscribe to notifications: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    try {
      const token = localStorage.getItem('notificationToken');
      if (token) {
        await api.notifications.unregisterDevice(token);
      }

      localStorage.removeItem('notificationsSubscribed');
      localStorage.removeItem('notificationToken');
      setIsSubscribed(false);

      new Notification('Notifications Disabled', {
        body: 'You have unsubscribed from notifications',
        icon: '/logo.png'
      });
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  };

  const sendTestNotification = async () => {
    try {
      if (!api.auth.isLoggedIn()) {
        alert('Please log in before sending a test notification');
        return;
      }

      await api.notifications.sendNotification(
        'Test Notification',
        'This is a test notification from IIIT Insider',
        ''
      );
      alert('Test notification sent!');
    } catch (error) {
      alert('Failed to send notification: ' + error.message);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="relative flex items-center gap-2 rounded-xl border border-yellow-400/40 bg-yellow-400/15 px-4 py-2 font-semibold text-yellow-100 shadow-lg shadow-yellow-950/30 backdrop-blur-lg transition-all hover:bg-yellow-400/25 hover:text-yellow-200 cursor-pointer"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/>
        </svg>
        {isSubscribed && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"/>
        )}
        Notifications
      </button>

      {showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowMenu(false)}
          />
          <div className="absolute right-0 mt-2 bg-gradient-to-br from-gray-950 to-amber-950/80 border border-yellow-400/30 rounded-xl shadow-2xl shadow-yellow-950/30 p-4 z-20 min-w-[250px] backdrop-blur-xl">
            <p className="text-yellow-200 text-sm font-medium mb-3">Notification Settings</p>

            {isSubscribed ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-400 text-sm">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/>
                  Notifications enabled
                </div>
                <button
                  onClick={sendTestNotification}
                  className="w-full rounded-lg border border-yellow-400/30 bg-yellow-400/15 py-2 text-sm font-semibold text-yellow-100 transition-colors hover:bg-yellow-400/25 cursor-pointer"
                >
                  Send Test Notification
                </button>
                <button
                  onClick={unsubscribe}
                  className="w-full rounded-lg border border-red-400/40 bg-red-500/15 py-2 text-sm font-semibold text-red-200 transition-colors hover:bg-red-500/25 cursor-pointer"
                >
                  Disable Notifications
                </button>
              </div>
            ) : (
              <button
                onClick={requestNotificationPermission}
                disabled={loading}
                className="w-full rounded-lg border border-yellow-400/40 bg-yellow-400/15 py-2 text-sm font-semibold text-yellow-100 transition-all hover:bg-yellow-400/25 hover:text-yellow-200 cursor-pointer disabled:opacity-50"
              >
                {loading ? 'Enabling...' : 'Enable Notifications'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationButton;
