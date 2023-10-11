<template>
  <div class="sidebar">
    <h3 class="sidebar__title">
      Поиск сотрудников
    </h3>
    <input
      class="sidebar__search"
      @input="updateInput" 
      type="text"
      placeholder="Введите Id или имя"
    />
    <span class="sidebar__subtitle">
      Результаты
    </span>
    <div v-if="users?.length > 0">
      <div
        :class="[userId == user.id ? 'sidebar__users_border' : '', 'sidebar__users']"
        v-for="user in users"
        :key="user.id"
        @click="btnClick(user.id)"
      >
        <img class="sidebar__users_img" src="../assets/img/user.png" />
        <div :class="[userId == user.id ? 'sidebar__users_dark' : '','sidebar__users_info']">
          <span class="sidebar__users_name">{{ user.username }}</span>
          <span>{{ user.email }}</span>
        </div>
      </div>
    </div>
    <MyPreloader v-else-if="isPreloaderUsers" style="top: 200px; width: 0.5em; height: 0.5em;" />
    <div 
      v-else-if="isError && searchUser.length > 0" 
      class="sidebar__users_error"
    >
      Ошибка! Сервер не отвечает, повторите попытку позже.
    </div>
    <div 
      v-else-if="searchUser?.length == 0" 
      class="sidebar__users_empty"
    >
      начните поиск
    </div>
    <div v-else class="sidebar__users_empty">
      ничего не найдено
    </div>
  </div>
</template>

<script>
import MyPreloader from "@/components/UI/Preloader";
import {mapState, mapActions, mapMutations} from 'vuex';

export default {
  components: {
    MyPreloader
  },
  name: "MainSidebar",

  methods: {
    ...mapMutations({
      setUserId: 'setUserId'
    }),
    ...mapActions({
      fetchUsers: 'fetchUsers',
      selectUser: 'selectUser',
    }),
    btnClick(id) {
      if (this.userId != id) {
        this.selectUser(id)
      }
    },
    updateInput(event) {
      let data = {
        userId: this.userId,
        value: event.target.value
      }
      this.fetchUsers(data)
    }
  },
  computed: {
    ...mapState({
      isPreloaderUsers: state => state.isPreloaderUsers,
      users: state => state.users,
      searchUser: state => state.searchUser,
      userId: state => state.userId,
      isError: state => state.isError,
    }),
  },
};
</script>

<style scoped lang="scss">
.sidebar {
  position: relative;
  width: 290px;
  padding-left: 20px;
  padding-right: 31px;

  &::after {
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    width: 1px;
    height: 100%;
    border-radius: 0px 10px 10px 0px;
    border-left: 1px solid #E0E0E0;
    background: #FDFDFD;
  }

  &__title {
    margin: 0;
    padding-top: 27px;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
  }

  &__search {
  width: 240px;
  margin: 22px 0;
  padding: 16px;
  font-size: 14px;
  color: #76787d;
  border: 2px solid  #E9ECEF;
  border-radius: 8px;
  }

  &__subtitle {
    font-size: 16px;
    font-weight: 600;
    color: #333333;
  }

  &__users {
    display: flex;
    width: 240px;
    margin-top: 18px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
    }

    &.sidebar__users_border:hover {
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
      cursor: default;
    }

    &_img {
      width: 70px;
      height: 70px;
      object-fit: cover;
      border-right: 1px solid #e0e0e0;
      border-radius: 10px 0 0 10px;
    }

    &_info {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      width: 100%;
      padding: 15px;

      span {
        width: 138px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    &_dark {
      background: #e0e0e0;
      border-radius: 0 10px 10px 0;
    }

    &_border {
      box-shadow: 0;
      border: 1px solid #E0E0E0;
    }

    &_name {
      font-weight: 600;
      color: #333333;
    }

    &_empty {
      padding-top: 10px;
      font-size: 14px;
      color: #76787d;
    }

    &_error {
      padding-top: 10px;
      font-size: 14px;
      color: #f00f00;
    }
  }
}
</style>
