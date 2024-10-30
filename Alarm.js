// script.js

let isMuted = false;
let isAcknowledged = false;

// Simulated alarm data
const alarmData = {
  sensorName: "Sensor #101",
  sensorType: "Fire",
  location: "Warehouse Section A",
  alarmTime: new Date().toLocaleTimeString('en-US', { hour12: false }),
};

// Function to initialize alarm notification
function initializeAlarm() {
  document.getElementById('sensor-name').textContent = alarmData.sensorName;
  document.getElementById('sensor-type').textContent = alarmData.sensorType;
  document.getElementById('location').textContent = alarmData.location;
  document.getElementById('alarm-time').textContent = alarmData.alarmTime;

  if (!isMuted && !isAcknowledged) {
    playAlarmSound();
  }
}

// Simulated alarm sound
let alarmSound = null;
function playAlarmSound() {
  alarmSound = new Audio('alarm-sound.mp3');
  alarmSound.loop = true;
  alarmSound.play().catch(error => console.error('Error playing alarm sound:', error));
}

// Mute the alarm
document.getElementById('mute-button').addEventListener('click', function () {
  isMuted = true;
  if (alarmSound) {
    alarmSound.pause();
  }
  this.disabled = true;
  this.textContent = "Alarm Muted";
});

// Acknowledge the alarm
document.getElementById('acknowledge-button').addEventListener('click', function () {
  isAcknowledged = true;
  isMuted = true;
  if (alarmSound) {
    alarmSound.pause();
  }
  document.querySelector('.alarm-popup').style.display = 'none';
});

// Initialize the alarm when the page loads
window.onload = initializeAlarm;
