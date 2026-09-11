import fs from 'fs';
import path from 'path';

async function runTest() {
  console.log('--- RUNNING TECHNICAL TEST: Cross-Platform Packaging & Configs ---');

  const rootDir = process.cwd();

  // 1. Capacitor Config Verification
  const capConfigPath = path.join(rootDir, 'capacitor.config.ts');
  if (!fs.existsSync(capConfigPath)) {
    throw new Error('capacitor.config.ts does not exist');
  }
  const capContent = fs.readFileSync(capConfigPath, 'utf-8');
  if (!capContent.includes("appId: 'cz.regal.app'")) {
    throw new Error('Capacitor appId cz.regal.app not set');
  }
  if (!capContent.includes("webDir: 'dist'")) {
    throw new Error("Capacitor webDir 'dist' not set");
  }
  console.log('✓ Test 1: Capacitor configuration (Android package cz.regal.app) verified');

  // 2. Android Manifest & Foldable Support
  const manifestPath = path.join(rootDir, 'android', 'app', 'src', 'main', 'AndroidManifest.xml');
  if (!fs.existsSync(manifestPath)) {
    throw new Error('AndroidManifest.xml does not exist');
  }
  const manifestContent = fs.readFileSync(manifestPath, 'utf-8');
  if (!manifestContent.includes('android.permission.INTERNET')) {
    throw new Error('INTERNET permission missing in AndroidManifest.xml');
  }
  if (!manifestContent.includes('android:resizeableActivity="true"')) {
    throw new Error('Foldable resizeableActivity attribute missing');
  }
  if (!manifestContent.includes('smallestScreenSize')) {
    throw new Error('Foldable configChanges attribute missing');
  }
  console.log('✓ Test 2: AndroidManifest verified with hardware fold & dual-screen configuration handling');

  // 3. Tauri v2 Desktop Configuration
  const tauriConfPath = path.join(rootDir, 'src-tauri', 'tauri.conf.json');
  if (!fs.existsSync(tauriConfPath)) {
    throw new Error('src-tauri/tauri.conf.json does not exist');
  }
  const tauriConf = JSON.parse(fs.readFileSync(tauriConfPath, 'utf-8'));
  if (tauriConf.identifier !== 'cz.regal.app') {
    throw new Error(`Expected Tauri identifier cz.regal.app, got ${tauriConf.identifier}`);
  }
  if (tauriConf.build?.frontendDist !== '../dist') {
    throw new Error(`Expected frontendDist ../dist, got ${tauriConf.build?.frontendDist}`);
  }
  if (!tauriConf.app?.windows || tauriConf.app.windows.length === 0) {
    throw new Error('Tauri desktop window configuration missing');
  }
  console.log('✓ Test 3: Tauri v2 configuration verified for Desktop (Windows/macOS/Linux)');

  // 4. Tauri Rust manifest & entrypoint
  const cargoPath = path.join(rootDir, 'src-tauri', 'Cargo.toml');
  const mainRsPath = path.join(rootDir, 'src-tauri', 'src', 'main.rs');
  if (!fs.existsSync(cargoPath) || !fs.existsSync(mainRsPath)) {
    throw new Error('Tauri Rust sources missing');
  }
  console.log('✓ Test 4: Tauri v2 Rust cargo manifest and main entrypoint verified');

  console.log('--- ALL CROSS-PLATFORM CONFIG TESTS PASSED SUCCESSFULLY! ---');
}

runTest().catch((err) => {
  console.error('Cross-platform test failed:', err);
  process.exit(1);
});
