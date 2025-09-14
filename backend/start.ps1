# Load environment variables from config.env
Get-Content config.env | ForEach-Object {
    if ($_ -match '^([^=]+)=(.*)') {
        [System.Environment]::SetEnvironmentVariable($matches[1], $matches[2], 'Process')
    }
}

# Start the server
node app.js
