<template>
  <div class="hello">
    <h1>{{ company }}</h1>
    <p>{{ subtitle }}</p>
  </div>
</template>

<script>
export default {
  name: "MainHeader",
  props: {
    company: String,
    subtitle: String,
  },
};
</script>

<style scoped lang="scss">
.hello {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1266px;
  margin: 0 auto;
  margin-top: 46px;
  margin-bottom: 30px;

  h1 {
    margin: 0;
    font-size: 32px;
    color: #e31f24;
  }

  p {
    color: #333333;
  }
}
</style>
