import { useEffect, useState, useMemo } from "react";

export const useWeather = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [isCelcius, setIsCelcius] = useState(true);
    const [loading, setLoading] = useState(true);
    const [weather, setWeather] = useState({});
    const [cities, setCities] = useState([]);

    // Agrupadas en un objeto para limpiar el scope global del hook
    const config = useMemo(() => ({
        appid: import.meta.env.VITE_OPENWEATHER_APPID,
        ipInfoToken: import.meta.env.VITE_IPINFO_TOKEN,
        baseUrl: 'https://api.openweathermap.org'
    }), []);



    
    // Verificar credenciales al montar
    useEffect(() => {
        const keySnippet = config.appid ? `${config.appid.substring(0, 8)}...` : '❌ NO CONFIGURADA';
        
    }, [config]);

    const getCoordinates = () => new Promise((res, rej) => navigator.geolocation.getCurrentPosition(res, rej));

    const dateFormat = (date) => {
        return new Date(date).toLocaleDateString("es-ES", { weekday: 'short', day: 'numeric', month: 'short' });
    };

    const windDireccion = (value) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        // Divide los 360 grados en 8 sectores de 45 grados cada uno
        const index = Math.floor(((value + 22.5) % 360) / 45);
        return directions[index] || 'N';
    };

    const changeTempUnit = (temp_f) => parseInt((temp_f - 32) * 0.5556);

    const getLocationByIp = async () => {
        try {
            
            const response = await fetch(`https://ipinfo.io/json?token=${config.ipInfoToken}`);
            if (!response.ok) throw new Error(`IPInfo error: ${response.status}`);
            
            const { city, loc } = await response.json();
            
            
            const [lat, long] = loc.split(',');
            return { lat, long, city };
        } catch (error) {
           
            return { lat: '40.4168', long: '-3.7038', city: 'Madrid' };
        }
    };

    const getAccurateWeather = async () => {
        try {
           
            const { coords: { latitude: lat, longitude: lon } } = await getCoordinates();
            

            const geoUrl = `${config.baseUrl}/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${config.appid}`;
            
            
            const geoResponse = await fetch(geoUrl);
            if (!geoResponse.ok) throw new Error(`Geocoding error: ${geoResponse.status} ${geoResponse.statusText}`);
            
            const geoData = await geoResponse.json();
            const cityName = geoData[0]?.name || 'Tu ubicación';
            

            await getWeather(lat, lon, cityName);
        } catch (error) {
            
            alert('No se pudo obtener tu ubicación. Usando ubicación por IP.');
            const { lat, long, city } = await getLocationByIp();
            await getWeather(lat, long, city);
        }
    };

    const getCityWeather = async (lat, lon, city) => {
        await getWeather(lat, lon, city);
        setIsNavOpen(false);
    };

    const getCities = async (city) => {
        if (!city) return;
        try {
            const url = `${config.baseUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${config.appid}`;
            
            
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
            
            const jsonResponse = await response.json();
            
            setCities(jsonResponse);
            setIsNavOpen(true);
        } catch (error) {
            
            alert(`Error al buscar ciudades: ${error.message}`);
        }
    };

    const getWeather = async (latitude, longitude, city) => {
        try {
            setLoading(true);
            

            const endpoints = [
                `${config.baseUrl}/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${config.appid}&units=imperial`,
                `${config.baseUrl}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${config.appid}&units=imperial`
            ];



            // Llamadas paralelas asíncronas para mejorar velocidad de carga
            const [currentRes, forecastRes] = await Promise.all(endpoints.map(url => fetch(url)));

            if (!currentRes.ok) throw new Error(`Weather API error ${currentRes.status}: ${await currentRes.text()}`);
            if (!forecastRes.ok) throw new Error(`Forecast API error ${forecastRes.status}: ${await forecastRes.text()}`);

            const [currentData, forecastData] = await Promise.all([currentRes.json(), forecastRes.json()]);
            

            const current = {
                date: dateFormat(currentData.dt * 1000),
                location: city,
                icon: currentData.weather[0].icon,
                temp_f: parseInt(currentData.main.temp),
                temp_c: changeTempUnit(currentData.main.temp),
                condition: currentData.weather[0].description,
                windDirection: currentData.wind.deg,
                windDirString: windDireccion(currentData.wind.deg),
                windSpeed_mph: currentData.wind.speed,
                windSpeed_ms: (currentData.wind.speed * 0.44704).toFixed(2),
                visivility_m: (currentData.visibility / 1609).toFixed(2),
                visivility_k: (currentData.visibility / 1000).toFixed(2),
                pressure: currentData.main.pressure,
                humidity: currentData.main.humidity
            };

            const dailyForecast = {};
            forecastData.list.forEach(({ dt_txt, main, weather: w }) => {
                const date = dt_txt.split(' ')[0];
                if (!dailyForecast[date]) {
                    dailyForecast[date] = { date, min: main.temp_min, max: main.temp_max, icon: w[0].icon };
                } else {
                    dailyForecast[date].min = Math.min(dailyForecast[date].min, main.temp_min);
                    dailyForecast[date].max = Math.max(dailyForecast[date].max, main.temp_max);
                }
            });

            const forecast = Object.values(dailyForecast).slice(0, 5).map((day, idx) => ({
                date: idx === 0 ? 'Hoy' : dateFormat(day.date),
                min_f: `${parseInt(day.min)}°F`,
                max_f: `${parseInt(day.max)}°F`,
                min_c: `${changeTempUnit(day.min)}°C`,
                max_c: `${changeTempUnit(day.max)}°C`,
                icon: day.icon
            }));

            setWeather({ current, forecast });
            
        } catch (error) {
           
            alert(`Error al obtener el clima: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (config.appid && config.ipInfoToken) {
            getLocationByIp().then(({ lat, long, city }) => getWeather(lat, long, city));
        } else {
           
            setLoading(false);
        }
    }, [config]);

    return {
        isNavOpen, setIsNavOpen,
        isCelcius, setIsCelcius,
        loading, setLoading,
        weather, cities,
        getAccurateWeather, getCities, getCityWeather
    };
};
export default useWeather