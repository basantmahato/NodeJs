// os_module_demo.js
const os = require('os');

console.log('==============================');
console.log('🧠 SYSTEM INFORMATION SUMMARY');
console.log('==============================\n');

// System Architecture
console.log('CPU Architecture:', os.arch());

// Platform and OS details
console.log('Operating System Type:', os.type());
console.log('Platform:', os.platform());
console.log('OS Release:', os.release());

// Host and User info
console.log('Hostname:', os.hostname());
console.log('Home Directory:', os.homedir());
console.log('Temp Directory:', os.tmpdir());

const user = os.userInfo();
console.log('User Info:', user);

// CPU Information
console.log('\n------------------------------');
console.log('⚙️  CPU INFORMATION');
console.log('------------------------------');
const cpus = os.cpus();
console.log('Total Cores:', cpus.length);
console.log('Model:', cpus[0].model);
console.log('Speed (MHz):', cpus[0].speed);
// Uncomment next line to view full CPU details
// console.log(cpus);

// Memory Information
console.log('\n------------------------------');
console.log('💾 MEMORY INFORMATION');
console.log('------------------------------');
console.log('Total Memory:', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2), 'GB');
console.log('Free Memory:', (os.freemem() / 1024 / 1024 / 1024).toFixed(2), 'GB');

// System uptime
console.log('\n------------------------------');
console.log('⏱️  SYSTEM UPTIME');
console.log('------------------------------');
const uptimeHours = (os.uptime() / 3600).toFixed(2);
console.log('System Uptime:', uptimeHours, 'hours');

// Network Interfaces
console.log('\n------------------------------');
console.log('🌐 NETWORK INTERFACES');
console.log('------------------------------');
const nets = os.networkInterfaces();
console.log(nets);

// Endianness
console.log('\n------------------------------');
console.log('🧩 SYSTEM ENDIANNESS');
console.log('------------------------------');
console.log('Endianness:', os.endianness());

// Constants
console.log('\n------------------------------');
console.log('⚡ OS CONSTANTS');
console.log('------------------------------');
console.log(os.constants);

console.log('\n==============================');
console.log('✅ SYSTEM INFO FETCHED SUCCESSFULLY');
console.log('==============================');
