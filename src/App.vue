<script setup>
import HOTELS from "./../HOTELS.json";
import { ref } from "vue";

const startDate = ref("");
const endDate = ref("");

const handleStartDateChange = () => {
  if (startDate.value && endDate.value && startDate.value > endDate.value) {
    endDate.value = startDate.value;
  }
};

const handleEndDateChange = () => {
  if (startDate.value && endDate.value && endDate.value < startDate.value) {
    startDate.value = endDate.value;
  }
}
</script>

<template>
  <div>
    <form>
      <section>
        <input type="date" v-model="startDate" @change="handleStartDateChange" />
        <input type="date" v-model="endDate" @change="handleEndDateChange" />
      </section>
    </form>
    <article class="hotels">
      <section class="hotel__card" v-for="hotel in HOTELS" :key="hotel.id">
        <p class="hotel__card__title">{{ hotel.name }}</p>
        <div class="hotel__card__details">
          <!-- <span>Prices:</span> -->
          <span v-for="star in hotel.rating" :key="star">{{ '⭐️' }}</span>
          <hr style="opacity: 0.3; margin: 12px 0;">
          <p><span>Weekday:</span><br/>Regular ${{ hotel.weekday_regular_price }} Rewards: ${{ hotel.weekday_rewards_price }}</p>
          <p><span>Weekend:</span><br/>Regular ${{ hotel.weekend_regular_price }} Rewards: ${{ hotel.weekend_rewards_price }}</p>
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
