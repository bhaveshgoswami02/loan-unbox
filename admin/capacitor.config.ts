import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.loanunbox.admin',
  appName: 'admin',
  webDir: 'dist/admin',
  bundledWebRuntime: false,
  server: {
    url: "https://loan-unbox-admin.web.app",
    cleartext: true
  }
};

export default config;
