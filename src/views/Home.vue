<template>
  <div class="home">
    <p class="h2">Welcome Home!</p>
    <div>
      <h3 v-if="dadJokes.loading">Loading...</h3>
      <h3 v-if="!dadJokes.loading && dadJokes.error">{{ dadJokes.error }}</h3>
      <h3 v-if="dadJokes.data !== null">
        <h4>{{ dadJokes.data.joke }}</h4>
      </h3>
    </div>
    <div class="nasa">
      <input v-model="nasaSearch">
      <h3 v-if="nasaImageSearch.loading">Loading...</h3>
      <h3 v-if="!nasaImageSearch.loading && nasaImageSearch.error">{{ nasaImageSearch.error }}</h3>
      <h3 v-if="nasaImageSearch.data !== null">
        <!-- <div v-for="item in nasaImageSearch.data.collection.items" :key="item.href">
          <span v-for="image in item.links" :key="image.href">
            <img v-if="image.rel == 'preview'" :src="image.href">
          </span>
        </div> -->
        <div v-for="image in nasaImages" :key="image.url" class="image">
          <img :src="image.url">
          <h4>{{ image.caption }}</h4>
        </div>
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

import useFetch from '@/hooks/useFetch';
import { DadJokeResponse, NasaImage, NasaImageResponse } from '@/interfaces/interfaces';

export default defineComponent({
  name: 'Home',
  components: {
  },
  setup() {
    const nasaSearch = ref('moon');
    const nasaSearchUrl = computed(() => `https://images-api.nasa.gov/search?q=${nasaSearch.value}`);
    const dadJokesUrl = computed(() => 'https://icanhazdadjoke.com/');
    const dadJokes = useFetch<DadJokeResponse>(dadJokesUrl);
    const nasaImageSearch = useFetch<NasaImageResponse>(nasaSearchUrl, true);

    const nasaImages = computed<NasaImage[]>(() => {
      if (nasaImageSearch.data) {
        return nasaImageSearch.data.collection.items.reduce((items, item) => {
          if (item.links) {
            const image = item.links.find((link) => link.rel === 'preview');
            if (image) {
              items.push({
                caption: item.data[0].title,
                url: image.href,
              });
            }
          }
          return items;
        }, [] as NasaImage[]);
      }
      return [];
    });

    return {
      dadJokes,
      nasaImageSearch,
      nasaImages,
      nasaSearch,
    };
  },
});
</script>

<style lang="scss">
.nasa {
  .image {
    img {
      width: 100%;
    }
  }
}
</style>
