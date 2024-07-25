        var map = L.map('map').setView([28.7041, 77.1025], 5);
        
        var tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var India_State_Boundary = L.tileLayer.wms('http://103.215.208.107:8585/geoserver/cite/wms?', {
            layers: 'cite:metsub',
            transparent: true,
            format: 'image/png'
        }).addTo(map);

        // Grid Overlay Control
        L.Control.GridOverlay = L.Control.extend({
            onAdd: function(map) {
                var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                
                container.innerHTML = '<i class="fas fa-th"></i>'; // Font Awesome icon markup

                container.onclick = function() {
                    var gridOverlay = document.getElementById('grid-overlay');
                    if (gridOverlay) {
                        gridOverlay.style.display = gridOverlay.style.display === 'none' || gridOverlay.style.display === '' ? 'block' : 'none';
                    } else {
                        console.error('grid-overlay element not found.');
                    }
                };

                return container;
            },
            onRemove: function(map) {
                // Cleanup if needed
            }
        });

        // Capture Map Control
        L.Control.CaptureMap = L.Control.extend({
            onAdd: function(map) {
                var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
                
                container.innerHTML = '<i class="fas fa-camera"></i>'; // Font Awesome icon markup

                container.onclick = function() {
                    captureMap();
                };

                return container;
            },
            onRemove: function(map) {
                // Cleanup if needed
            }
        });

        // Add both controls to the map
        map.addControl(new L.Control.GridOverlay({ position: 'topright' }));
        map.addControl(new L.Control.CaptureMap({ position: 'topright' }));



        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        var drawControl = new L.Control.Draw({
            draw: {
                polygon: true,
                marker: true,
                polyline: true,
                rectangle: true,
                circle: true
            },
            edit: {
                featureGroup: drawnItems
            }
        });
        map.addControl(drawControl);

        function captureMap() {
            var gridOverlay = document.getElementById('grid-overlay');
            var mapElement = document.getElementById('map');

            if (!gridOverlay || !mapElement) {
                console.error('Cannot capture map: grid-overlay or map element not found.');
                return;
            }

            var gridRect = gridOverlay.getBoundingClientRect();
            var mapRect = mapElement.getBoundingClientRect();

            var cropX = gridRect.left - mapRect.left;
            var cropY = gridRect.top - mapRect.top;
            var cropWidth = gridRect.width;
            var cropHeight = gridRect.height;

            ensureTilesLoaded(function() {
                html2canvas(mapElement, { useCORS: true }).then(function(canvas) {
                    var croppedCanvas = document.createElement('canvas');
                    var croppedContext = croppedCanvas.getContext('2d');

                    croppedCanvas.width = cropWidth;
                    croppedCanvas.height = cropHeight;

                    croppedContext.drawImage(canvas, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);

                    croppedCanvas.toBlob(function(blob) {
                        saveAs(blob, 'map_capture.png');
                    });

                    gridOverlay.style.display = 'block';
                });
            });
        }

        function ensureTilesLoaded(callback) {
            var tiles = document.querySelectorAll('.leaflet-tile');
            var loadedTiles = 0;
            tiles.forEach(function(tile) {
                if (tile.complete) {
                    loadedTiles++;
                } else {
                    tile.onload = function() {
                        loadedTiles++;
                        if (loadedTiles === tiles.length) {
                            callback();
                        }
                    };
                }
            });

            if (loadedTiles === tiles.length) {
                callback();
            }
        }