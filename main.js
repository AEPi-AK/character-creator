var app = require('app');  // Module to control application life.
var BrowserWindow = require('browser-window');  // Module to create native browser window.

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    app.quit();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {

  app_mode = process.env.BOOTH_APP_MODE
  console.log('app mode:', app_mode)

  // Create the browser window.
  var height = 480;
  var width = 800;
  if (process.platform == 'darwin') {
    height += 23;
  }

  if (app_mode === 'forest-monster') {
    height = 1200
    width = 1920
  }

  mainWindow = new BrowserWindow({width: width, height: height});

  // Hide Menu bar
  mainWindow.setMenu(null);

  // Load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/build' + '/index.html?electron&mode=' + app_mode);

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
