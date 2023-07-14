<script setup>
defineProps({
  hotel: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="hotel__card">
    <p class="hotel__card__title">
      {{ hotel.name }} <span id="best-price-tag" v-if="hotel.showBestPriceTag">Best Price</span>
    </p>
    <div class="hotel__card__details">
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
</template>

<style scoped>
.hotel__card {
  display: grid;
}

.hotel__card__title {
  font-size: 15px;
  font-weight: bold;
  padding: 1rem;
  background-color: var(--vt-c-indigo);
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.hotel__card__details {
  background-color: #fff;
  color: #000;
  padding: 1rem;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 13px;
}

.hotel__card__details > p > span {
  font-weight: 600;
}

#best-price-tag {
  float: right;
  background-color: #1ada39;
  border-radius: 13px;
  padding: 0px 12px;
}
</style>
