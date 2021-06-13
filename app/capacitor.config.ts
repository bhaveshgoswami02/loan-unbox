import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.loanunbox.partner',
  appName: 'loanunbox partner',
  webDir: 'dist/loan-unbox',
  bundledWebRuntime: false,
  "plugins": {
    "PushNotifications": {
      "presentationOptions": ["badge", "sound", "alert"]
    }
  },
};

export default config;
