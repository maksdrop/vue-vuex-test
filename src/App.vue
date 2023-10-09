<template>
  <MainHeader company="Жилфонд" subtitle="Пользователь" />
  <div class="container">
    <MainSidebar />
    <PersonalCard />
  </div>
</template>

<script>
import MainHeader from "./components/MainHeader.vue";
import MainSidebar from "./components/MainSidebar.vue";
import PersonalCard from "./components/PersonalCard.vue";

export default {
  name: "App",
  components: {
    MainHeader,
    MainSidebar,
    PersonalCard,
  },
};
</script>

<style scoped lang="scss">
.container {
  display: flex;
  max-width: 1266px;
  height: 575px;
  margin: 0 auto;
  border-radius: 10px;
  background: #fdfdfd;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.10);
}
</style>
