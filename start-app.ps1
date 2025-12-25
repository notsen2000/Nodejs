# Script to stop any process on port 3000 and start the Node.js app fresh

# Find the process using port 3000
$netstatOutput = netstat -ano | findstr :3000

if ($netstatOutput) {
    # Extract the PID (last column)
    $pid = ($netstatOutput -split '\s+')[-1]
    Write-Host "Found process $pid using port 3000. Terminating..."
    taskkill /PID $pid /F
    Start-Sleep -Seconds 2  # Wait a bit for the port to be freed
} else {
    Write-Host "No process found on port 3000."
}

# Start the app with nodemon
Write-Host "Starting the app..."
nodemon .\app.js