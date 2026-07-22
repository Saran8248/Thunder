// location.js - Geolocation API wrapper
class LocationService {
    static getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by your browser.'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    // Mock reverse geocoding for demo
                    const address = `Detected Location (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`;
                    localStorage.setItem('thunder_location', JSON.stringify({ coords, address }));
                    resolve({ coords, address });
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    static getSavedLocation() {
        const loc = localStorage.getItem('thunder_location');
        return loc ? JSON.parse(loc) : null;
    }
}
