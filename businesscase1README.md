# BusinessCase
All things strictly business

# Building Management System Dashboard

This project is a **Building Management System Dashboard** that allows administrators to manage users, monitor sensor statuses across floors, and generate reports for each floor. The dashboard includes features to add new users, assign floors, and view sensor alerts.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

---

## Features

1. **User Management**:
   - Admins can add users and assign them to a specific floor.
   - Unique key pass generation for each user, required to access their assigned floor.

2. **Sensor Monitoring**:
   - Displays sensor statuses (fire, smoke, and heat) for each floor.
   - 20% chance of alert generation for sensor malfunctions every 5 hours, indicated by red status.

3. **Floor Reports**:
   - Individual report pages for each floor (Floor 1, Floor 2, Floor 3).
   - Logs sensor alert timestamps and allows admins to download the report.

4. **Control Panel**:
   - Toggles to manage sensor states across floors from the control panel.
   - Sensor states are visually represented on each dashboard.

---

## Technologies Used

- **HTML5 & CSS3**: For structuring and styling the web pages.
- **JavaScript**: For interactive and dynamic functionality.
- **LocalStorage**: Used for persisting user and sensor data on the client-side.
- **Font Awesome**: For iconography to represent sensors and controls.


