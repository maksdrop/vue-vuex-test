<template>
  <div :class="[user == null || isPreloader ? 'card__empty' : '', 'card']">
    <MyPreloader v-if="isPreloader" />
    <div 
      v-else-if="user" 
      class="card__container"
    >
      <img 
        class="card__img" 
        src="../assets/img/user.png" 
      />
      <div>
        <p class="card__username card__text_bold">{{ user.name }}</p>
        <p class="card__text card__text_bold">
          email:
          <span class="card__text_light">{{ user.email }}</span>
        </p>
        <p class="card__text card__text_bold">
          phone:
          <span class="card__text_light">{{ user.phone }}</span>
        </p>
        <p class="card__about card__text_bold">О себе</p>
        <p class="card__text card__text_light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
    <p v-else>Выберите сотрудника, чтобы посмотреть его профиль</p>
  </div>
</template>

<script>
import MyPreloader from "@/components/UI/Preloader";
import { mapState } from 'vuex';

export default {
  components: {
    MyPreloader
  },
  name: "PersonalCard",

  computed: {
    ...mapState({
      user: state => state.user,
      isPreloader: state => state.isPreloader,
    }),
  }
};
</script>

<style scoped lang="scss">
.card {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 30px 30px 30px 20px;

  &__empty {
    align-items: center;
    justify-content: center;
  }

  &__container {
    display: flex;
    align-items: flex-start;
    column-gap: 61px;

    p {
      margin: 0;
      margin-bottom: 10px;
      line-height: 1.4;

      &:last-child {
        line-height: normal;
      }
    }

    p.card__about {
      margin-top: 20px;
      margin-bottom: 25px;
    }
  }

  &__img {
    border: 1px solid #E0E0E0;
  }

  &__text {
    font-size: 14px;

    &_bold {
      font-weight: 600;
      color: #333333;
    }

    &_light {
      font-weight: 400;
      color: #76787d;
    }
  }

  &__username {
    font-size: 16px;
    color: #000000;
  }
}
</style>
