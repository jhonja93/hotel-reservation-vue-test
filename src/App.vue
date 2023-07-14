<script setup>
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

const numNights = computed(() => {
  if (startDate.value && endDate.value) {
    const start = new Date(startDate.value)
    const end = new Date(endDate.value)
    const timeDifference = Math.abs(end.getTime() - start.getTime())
    const numDays = Math.ceil(timeDifference / (1000 * 3600 * 24)) // Calculate the number of days rounding up
    return numDays - 1 // Subtract 1 to get the number of nights
  } else {
    return 0
  }
})

const handleStartDate = () => {
  endDate.value = ''
}

const handleSubmit = () => {
  // const data = {
  //   startDate: startDate.value,
  //   endDate: endDate.value,
  //   customerType: customerType.value,
  // }
  // hotels.value = hotels.filter(({weekday_regular_price, weekday_rewards_price, weekend_regular_price, weekend_rewards_price}) => {
  //   if ()
  // })
}
</script>

<template>
  <div class="container">
    <form>
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
          <button class="search" type="submit" @submit.prevent="handleSubmit">Search</button>
        </div>
      </section>
    </form>
    <hr style="opacity: 0.3" />
    <article class="hotels">
      <section class="hotel__card" v-for="hotel in hotels" :key="hotel.id">
        <p class="hotel__card__title">{{ hotel.name }}</p>
        <div class="hotel__card__details">
          <!-- <span>Prices:</span> -->
          <span v-for="star in hotel.rating" :key="star">{{ '⭐️' }}</span>
          <hr style="opacity: 0.3; margin: 12px 0" />
          <p>
            <span>Weekday:</span><br />Regular ${{ hotel.weekday_regular_price }} | Rewards: ${{
              hotel.weekday_rewards_price
            }}
          </p>
          <p>
            <span>Weekend:</span><br />Regular ${{ hotel.weekend_regular_price }} | Rewards: ${{
              hotel.weekend_rewards_price
            }}
          </p>
        </div>
      </section>
    </article>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
