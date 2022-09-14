import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.loanunbox.pms',
  appName: 'pms',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    url: "https://pms-loanunbox.web.app",
    cleartext: true
  }
};

export default config;
