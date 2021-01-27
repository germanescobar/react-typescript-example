const viewPort = {
  width: 1366,
  height: 768
};

module.exports = {
  server: {
    command: 'npm run start:test',
    launchTimeout: 15000,
    port: 4444
  },
  launch: {
    headless: true,
    slowMo: 0,
    args: [`--window-size=${viewPort.width},${viewPort.height}`],
    defaultViewport: {
      height: viewPort.height,
      width: viewPort.width
    },
  }
}
