$URL = "http://localhost"
$PORT = 8000

Start-Process "nodemon.cmd" "--exec npm start"
Start-Sleep -Seconds 1
START-Process chrome.exe "${URL}:${PORT}/" -WindowStyle Maximized