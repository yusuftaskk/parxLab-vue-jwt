<template>
  <div class="pos-f-t">
    <div class="collapse" id="navbarToggleExternalContent">
      <div class="bg-primary p-4"></div>
    </div>
    <nav class="navbar navbar-dark bg-primary">
      <button
        style="margin-left: 20px"
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggleExternalContent"
        aria-controls="navbarToggleExternalContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="div">
        <a href="#" @click.prevent="Logout">
          <i
            style="color: #fff; font-size: 30px; margin-right: 20px"
            class="fas fa-sign-out-alt"
          >
          </i
        ></a>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  methods: {
    Logout() {
      this.$store.dispatch("Logout")
      this.$router.push("/Login")
    },
  },
  computed: {},
};
</script>