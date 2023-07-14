<script setup>
import HotelCard from './components/HotelCard.vue'
import HOTELS from './../HOTELS.json'
import { ref, computed } from 'vue'

const hotels = ref(HOTELS)
const startDate = ref('')
const endDate = ref('')
const customerType = ref('Regular')

const minStartDate = computed(() => {
  const today = new Date()
  return today.toISOString().split('T')[0]
})

const minEndDate = computed(() => {
  if (startDate.value) {
    const minDate = new Date(startDate.value)
    minDate.setDate(minDate.getDate() + 1)
    return minDate.toISOString().split('T')[0]
  } else {
    return null
  }
})

const disabledEndDate = computed(() => {
  return startDate.value === ''
})

const handleDisabledSearchButton = computed(() => {
  return startDate.value === '' || endDate.value === ''
})

const numNights = computed(() => {
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value)
    const end = new Date(endDate.value)
    const timeDifference = Math.abs(end.getTime() - start.getTime())
    const numDays = Math.ceil(timeDifference / (1000 * 3600 * 24)) // Calculate the number of days rounding up
    return numDays
  } else {
    return 0
  }
})

const numWeekdayNights = computed(() => {
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value)
    const end = new Date(endDate.value)
    let weekdayCount = 0

    for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
      if (day.getDay() !== 0 && day.getDay() !== 5 && day.getDay() !== 6) {
        weekdayCount++
      }
    }

    return weekdayCount
  } else {
    return 0
  }
})

const numWeekendNights = computed(() => {
  if (startDate.value && endDate.value) {
    return numNights.value - numWeekdayNights.value
  } else {
    return 0
  }
})

const handleStartDate = () => {
  endDate.value = ''
}

const handleSubmit = () => {

  hotels.value = hotels.value.map((hotel) => {
    hotel.showBestPriceTag = false
    return hotel
  })
  
  const data = {
    startDate: startDate.value,
    endDate: endDate.value,
    customerType: customerType.value
  }

  hotels.value = hotels.value.sort((a, b) => {
    const aTotal = calculateTotalPrice(a, data)
    const bTotal = calculateTotalPrice(b, data)
    let res = aTotal - bTotal

    if (res === 0) {
      return b.rating - a.rating
    }
    return res
  })

  hotels.value[0].showBestPriceTag = true
}

const calculateTotalPrice = (hotel, data) => {
  const { customerType } = data
  let totalPrice = 0

  for (let i = 0; i < numWeekdayNights.value; i++) {
    totalPrice +=
      customerType === 'Regular' ? hotel.weekday_regular_price : hotel.weekday_rewards_price
  }

  for (let i = 0; i < numWeekendNights.value; i++) {
    totalPrice +=
      customerType === 'Regular' ? hotel.weekend_regular_price : hotel.weekend_rewards_price
  }

  return totalPrice
}
</script>

<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <section class="search-input">
        <div id="dates-container">
          <div>
            <label for="startDate">Check-in</label>
            <input
              id="startDate"
              type="date"
              v-model="startDate"
              :min="minStartDate"
              @change="handleStartDate"
            />
          </div>
          <div>
            <label for="endDate">Check-out</label>
            <input
              id="endDate"
              type="date"
              v-model="endDate"
              :disabled="disabledEndDate"
              :min="minEndDate"
            />
          </div>
          <div>{{ numNights }} nights</div>
        </div>
        <div id="customer-type-selector">
          <div>
            <input type="radio" id="regular" value="Regular" v-model="customerType" />
            <label for="regular">Regular</label>
          </div>
          <div>
            <input type="radio" id="rewards" value="Rewards" v-model="customerType" />
            <label for="rewards">Rewards</label>
          </div>
        </div>
        <div>
          <button class="search" type="submit" :disabled="handleDisabledSearchButton">
            Search
          </button>
        </div>
      </section>
    </form>
    <hr style="opacity: 0.3" />
    <article class="hotels">
      <HotelCard v-for="hotel in hotels" :key="hotel.id" :hotel="hotel" />
    </article>
  </div>
</template>

<style scoped>
.hotels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
  gap: 1rem;
}

.search-input {
  background-color: #e3bd2d;
  display: flex;
  border-radius: 5px;
  justify-content: space-between;
  margin: 6px 0 3px;
  padding: 3px;
}

.search-input > div {
  background-color: #fff;
  border-radius: 5px;
  box-sizing: border-box;
  display: flex;
  flex-grow: 2;
  margin-left: 3px;
}

.search-input > div:nth-child(2) {
  flex-direction: column;
  min-width: 150px;
  text-align: center;
  justify-content: center;
}

button.search {
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  line-height: 28px;
  padding: 1px 6px;
  width: 100%;
  border: 0;
  align-items: center;
  justify-content: center;
  background-color: var(--vt-c-indigo);
  color: #fff;
  border-radius: 5px;
}

#dates-container {
  display: flex;
  justify-content: space-around;
  padding: 3px 6px;
  flex: 1 1 auto;
  margin-left: 0px;
  align-items: center;
  border: 2px solid var(--vt-c-indigo);
}

#dates-container label {
  word-break: break-word;
}

#dates-container input {
  width: 250px;
  margin: 0 10px;
}

#dates-container input[type='date'] {
  background-color: var(--vt-c-indigo);
  padding: 10px;
  color: #ffffff;
  font-family: 'Roboto Mono', monospace;
  border: none;
  outline: none;
  border-radius: 5px;
}

#customer-type-selector input[type='radio'] {
  display: none;
}

#customer-type-selector label {
  position: relative;
  color: var(--vt-c-indigo);
  font-family: 'Roboto Mono', monospace;
  font-size: 16px;
  border: 2px solid var(--vt-c-indigo);
  padding: 5px 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
}

#customer-type-selector > div:nth-child(1) > label {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

#customer-type-selector > div:nth-child(2) > label {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

#customer-type-selector label:before {
  content: '';
  height: 20px;
  width: 20px;
  border: 3px solid var(--vt-c-indigo);
  border-radius: 50%;
  margin-right: 15px;
}

#customer-type-selector input[type='radio']:checked + label {
  background-color: var(--vt-c-indigo);
  color: white;
}

#customer-type-selector input[type='radio']:checked + label:before {
  height: 16px;
  width: 16px;
  border: 4px solid white;
  background-color: var(--vt-c-indigo);
}
</style>
