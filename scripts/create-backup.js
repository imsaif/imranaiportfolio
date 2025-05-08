const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create a timestamped backup of the project
function createBackup() {
  try {
    // Get current date for backup name
    const now = new Date();
    const timestamp = now.toISOString().replace(/:/g, '-').replace(/\..+/, '');
    
    // Create backups directory if it doesn't exist
    const backupDir = path.join(__dirname, '../backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const backupName = `backup-${timestamp}`;
    const backupPath = path.join(backupDir, backupName);
    
    // Get list of files to exclude from backup
    const excludeList = [
      'node_modules',
      '.next',
      'backups',
      '.git',
    ].map(item => `--exclude=${item}`).join(' ');
    
    // Create backup using tar (on Unix-like systems) or powershell (on Windows)
    const isWindows = process.platform === 'win32';
    
    if (isWindows) {
      // Windows PowerShell compression
      const sourceDir = path.join(__dirname, '..');
      const zipPath = path.join(backupDir, `${backupName}.zip`);
      
      const powershellCmd = `
        Compress-Archive -Path "${sourceDir}/*" -DestinationPath "${zipPath}" -Force
      `;
      
      execSync(`powershell -command "${powershellCmd}"`, { stdio: 'inherit' });
      console.log(`✅ Backup created at: ${zipPath}`);
    } else {
      // Unix-like system (Linux/Mac)
      const tarCommand = `tar -czf ${backupDir}/${backupName}.tar.gz ${excludeList} -C .. .`;
      execSync(tarCommand, { stdio: 'inherit' });
      console.log(`✅ Backup created at: ${backupDir}/${backupName}.tar.gz`);
    }
  } catch (error) {
    console.error('❌ Failed to create backup:', error);
    process.exit(1);
  }
}

createBackup(); 