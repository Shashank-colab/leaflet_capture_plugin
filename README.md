# leaflet_capture_plugin

This Leaflet plugin adds a fixed grid overlay to the map, which can be toggled on and off. It also provides a functionality to capture and save a screenshot of the map within the grid overlay.

Features
Grid Overlay Control: Toggle the grid overlay on and off.
Map Capture Control: Capture and save a screenshot of the map within the grid overlay.
Easy Integration: Simple to integrate with existing Leaflet maps.
Demo

Installation
Include the necessary CSS and JS files in your HTML:

html
Copy code
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js"></script>
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />
Usage
Add a div with the ID map to your HTML:
html

<div id="map"></div>
Add a div with the ID grid-overlay for the grid overlay:
html

<div id="grid-overlay" class="grid-overlay"></div>
Include the following CSS to style the map and controls:
css

Initialize the Leaflet map and add the grid overlay and capture controls:
javascript

License
This project is licensed under the MIT License.
