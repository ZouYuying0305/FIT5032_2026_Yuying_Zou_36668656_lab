<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'

const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

const city = ref('Clayton, AU')
const weatherData = ref(null)
const loading = ref(false)
const error = ref('')
const locationStatus = ref('')

const temperature = computed(() => {
  return weatherData.value ? Math.round(weatherData.value.main.temp) : null
})

const iconUrl = computed(() => {
  const icon = weatherData.value?.weather?.[0]?.icon
  return icon ? `https://openweathermap.org/img/wn/${icon}@2x.png` : ''
})

const description = computed(() => {
  return weatherData.value?.weather?.[0]?.description || ''
})

const fetchWeatherData = async (url) => {
  if (!apiKey) {
    error.value = 'Missing VITE_OPENWEATHER_API_KEY in .env.local.'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const response = await axios.get(url)
    weatherData.value = response.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to retrieve weather data.'
    console.error('OpenWeather API error:', err)
  } finally {
    loading.value = false
  }
}

const searchByCity = async () => {
  if (!city.value.trim()) {
    error.value = 'Please enter a city name, for example Clayton, AU.'
    return
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city.value.trim(),
  )}&appid=${apiKey}&units=metric`

  await fetchWeatherData(url)
}

const fetchCurrentLocationWeather = () => {
  if (!navigator.geolocation) {
    locationStatus.value = 'Geolocation is not supported by this browser.'
    return
  }

  locationStatus.value = 'Requesting current location weather...'

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`

      await fetchWeatherData(url)
      locationStatus.value = 'Current location weather loaded.'
    },
    () => {
      locationStatus.value = 'Location permission was denied. Use city search instead.'
    },
  )
}

onMounted(() => {
  fetchCurrentLocationWeather()
})
</script>

<template>
  <section class="container py-5">
    <div class="weather-card">
      <p class="text-uppercase text-primary fw-semibold mb-2">FIT5032 Lab 10</p>
      <h1 class="display-6 fw-bold">Weather API Service</h1>
      <p class="text-secondary">
        This page uses the OpenWeather Current Weather API to display current location weather and
        searchable city weather in Celsius.
      </p>

      <div class="row g-3 align-items-end mt-3">
        <div class="col-12 col-md-8">
          <label for="city" class="form-label">Search weather by city</label>
          <input
            id="city"
            v-model="city"
            class="form-control"
            type="text"
            placeholder="Example: Clayton, AU"
          />
        </div>
        <div class="col-12 col-md-4 d-grid">
          <button class="btn btn-primary" type="button" :disabled="loading" @click="searchByCity">
            {{ loading ? 'Loading...' : 'Search Weather' }}
          </button>
        </div>
      </div>

      <div class="mt-3 d-flex flex-wrap gap-2">
        <button
          class="btn btn-outline-secondary"
          type="button"
          :disabled="loading"
          @click="fetchCurrentLocationWeather"
        >
          Use Current Location
        </button>
        <span v-if="locationStatus" class="text-secondary align-self-center">
          {{ locationStatus }}
        </span>
      </div>

      <div v-if="error" class="alert alert-danger mt-4">{{ error }}</div>

      <div v-if="weatherData" class="result-panel mt-4">
        <div>
          <p class="text-uppercase text-primary fw-semibold mb-1">Current Weather</p>
          <h2 class="h3 mb-1">{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
          <p class="text-secondary mb-0 text-capitalize">{{ description }}</p>
        </div>

        <div class="weather-reading">
          <img v-if="iconUrl" :src="iconUrl" alt="Weather icon" />
          <strong>{{ temperature }} °C</strong>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.weather-card {
  background: #ffffff;
  border: 1px solid #dbe4f0;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(31, 77, 120, 0.08);
  padding: 28px;
}

.result-panel {
  align-items: center;
  background: #f4f9ff;
  border: 1px solid #cde1f6;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.weather-reading {
  align-items: center;
  display: flex;
  font-size: 2rem;
  gap: 12px;
}

.weather-reading img {
  height: 72px;
  width: 72px;
}
</style>
