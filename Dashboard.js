document.addEventListener('DOMContentLoaded', () => {
    const sensorContainer = document.getElementById('sensor-container');
    const listViewBtn = document.getElementById('list-view-btn');
    const gridViewBtn = document.getElementById('grid-view-btn');
    const sensorGroupTemplate = document.getElementById('sensor-group-template');
    const sensorCardTemplate = document.getElementById('sensor-card-template');
    const confirmationModal = document.getElementById('confirmation-modal');
    const confirmDeactivateBtn = document.getElementById('confirm-deactivate');
    const cancelDeactivateBtn = document.getElementById('cancel-deactivate');
    const locationModal = document.getElementById('location-modal');
    const locationInput = document.getElementById('location-input');
    const confirmLocationBtn = document.getElementById('confirm-location');
    const cancelLocationBtn = document.getElementById('cancel-location');

    let sensorData = [
        { id: 101, name: 'Fire Sensor 1', type: 'Fire', status: 'active', location: '' },
        { id: 102, name: 'Smoke Sensor 1', type: 'Smoke', status: 'triggered', location: '' },
        { id: 103, name: 'Heat Sensor 1', type: 'Heat', status: 'inactive', location: '' },
        { id: 104, name: 'Fire Sensor 2', type: 'Fire', status: 'error', location: '' },
        { id: 105, name: 'Smoke Sensor 2', type: 'Smoke', status: 'active', location: '' },
        { id: 106, name: 'Heat Sensor 2', type: 'Heat', status: 'active', location: '' },
    ];

    let sensorToDeactivate = null;
    let sensorToUpdateLocation = null;

    function createSensorCard(sensor) {
        const card = sensorCardTemplate.content.cloneNode(true);
        const sensorName = card.querySelector('.sensor-name');
        const sensorNumber = card.querySelector('.sensor-number');
        const sensorStatus = card.querySelector('.sensor-status');
        const sensorLocation = card.querySelector('.sensor-location');
        const sensorIcon = card.querySelector('.sensor-icon i');

        sensorName.textContent = sensor.name;
        sensorNumber.textContent = `Sensor #${sensor.id}`;
        sensorStatus.classList.add(`status-${sensor.status}`);
        sensorStatus.querySelector('.status-text').textContent = sensor.status.charAt(0).toUpperCase() + sensor.status.slice(1);
        
        sensorLocation.textContent = sensor.location ? `Location: ${sensor.location}` : 'Location: Not set';

        // Set the appropriate icon
        switch (sensor.type) {
            case 'Fire':
                sensorIcon.setAttribute('data-lucide', 'flame');
                break;
            case 'Smoke':
                sensorIcon.setAttribute('data-lucide', 'cloud');
                break;
            case 'Heat':
                sensorIcon.setAttribute('data-lucide', 'thermometer');
                break;
        }

        // Add event listeners for buttons
        const deactivateBtn = card.querySelector('.deactivate-btn');
        const resetBtn = card.querySelector('.reset-btn');
        const locationBtn = card.querySelector('.location-btn');

        deactivateBtn.addEventListener('click', () => showDeactivationConfirmation(sensor.id));
        resetBtn.addEventListener('click', () => resetSensor(sensor.id));
        locationBtn.addEventListener('click', () => showLocationModal(sensor.id));

        // Add event listener for renaming
        sensorName.addEventListener('blur', () => renameSensor(sensor.id, sensorName.textContent));

        return card;
    }

    function createSensorGroup(type, sensors) {
        const group = sensorGroupTemplate.content.cloneNode(true);
        const groupTitle = group.querySelector('.sensor-group-title');
        const sensorList = group.querySelector('.sensor-list');

        groupTitle.textContent = `${type} Sensors (${sensors.length})`;
        sensors.forEach(sensor => {
            sensorList.appendChild(createSensorCard(sensor));
        });

        return group;
    }

    function renderSensors() {
        sensorContainer.innerHTML = '';
        const groupedSensors = groupSensorsByType(sensorData);
        
        const sortedTypes = Object.keys(groupedSensors).sort();
        
        for (const type of sortedTypes) {
            sensorContainer.appendChild(createSensorGroup(type, groupedSensors[type]));
        }
        
        lucide.createIcons();
    }

    function groupSensorsByType(sensors) {
        return sensors.reduce((groups, sensor) => {
            if (!groups[sensor.type]) {
                groups[sensor.type] = [];
            }
            groups[sensor.type].push(sensor);
            return groups;
        }, {});
    }

    function showDeactivationConfirmation(sensorId) {
        sensorToDeactivate = sensorId;
        confirmationModal.style.display = 'block';
    }

    function hideDeactivationConfirmation() {
        confirmationModal.style.display = 'none';
        sensorToDeactivate = null;
    }

    function deactivateSensor() {
        if (sensorToDeactivate) {
            const sensor = sensorData.find(s => s.id === sensorToDeactivate);
            if (sensor) {
                sensor.status = 'inactive';
                renderSensors();
            }
            hideDeactivationConfirmation();
        }
    }

    function resetSensor(sensorId) {
        const sensor = sensorData.find(s => s.id === sensorId);
        if (sensor) {
            sensor.status = 'active';
            renderSensors();
        }
    }

    function renameSensor(sensorId, newName) {
        const sensor = sensorData.find(s => s.id === sensorId);
        if (sensor) {
            sensor.name = newName;
            renderSensors();
        }
    }

    function showLocationModal(sensorId) {
        sensorToUpdateLocation = sensorId;
        const sensor = sensorData.find(s => s.id === sensorId);
        locationInput.value = sensor.location;
        locationModal.style.display = 'block';
    }

    function hideLocationModal() {
        locationModal.style.display = 'none';
        sensorToUpdateLocation = null;
    }

    function updateSensorLocation() {
        if (sensorToUpdateLocation) {
            const sensor = sensorData.find(s => s.id === sensorToUpdateLocation);
            if (sensor) {
                sensor.location = locationInput.value;
                renderSensors();
            }
            hideLocationModal();
        }
    }

    listViewBtn.addEventListener('click', () => {
        sensorContainer.classList.remove('grid-view');
        sensorContainer.classList.add('list-view');
        listViewBtn.classList.add('active');
        gridViewBtn.classList.remove('active');
    });

    gridViewBtn.addEventListener('click', () => {
        sensorContainer.classList.remove('list-view');
        sensorContainer.classList.add('grid-view');
        gridViewBtn.classList.add('active');
        listViewBtn.classList.remove('active');
    });

    confirmDeactivateBtn.addEventListener('click', deactivateSensor);
    cancelDeactivateBtn.addEventListener('click', hideDeactivationConfirmation);

    confirmLocationBtn.addEventListener('click', updateSensorLocation);
    cancelLocationBtn.addEventListener('click', hideLocationModal);

    // Close the modals when clicking outside of them
    window.addEventListener('click', (event) => {
        if (event.target === confirmationModal) {
            hideDeactivationConfirmation();
        }
        if (event.target === locationModal) {
            hideLocationModal();
        }
    });

    // Initial render
    renderSensors();

    // Simulating real-time updates
    setInterval(() => {
        const randomSensor = sensorData[Math.floor(Math.random() * sensorData.length)];
        const statuses = ['active', 'triggered', 'inactive', 'error'];
        randomSensor.status = statuses[Math.floor(Math.random() * statuses.length)];
        renderSensors();
    }, 5000);
});