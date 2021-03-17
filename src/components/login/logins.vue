  
 <template>
  <div class="container loginPage">
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3">
        <div class="card">
          <div class="card-header text-center">
            <h1>ParxLab JWT Login</h1>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">Kullanıcı Adı</label>
              <input
                v-model="user.username"
                type="text"
                class="form-control"
                placeholder="yusuf.taskiran"
              />
            </div>
            <div class="mb-3">
              <label class="form-label">Şifre</label>
              <input
                v-model="user.password"
                type="current-password"
                class="form-control"
              />
            </div>
            <div class="mb-3 d-flex justify-content-center align-items-center">
              <button
                @click="login({ ...user })"
                style="width: 100%"
                class="btn btn-sm btn-primary"
              >
                <strong>Giriş Yap</strong>
              </button>
            </div>
          </div>
        </div>
        <div class="card-footer text-center"></div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      user: {
        username: "erhan.erdogan",
        password: "1q2w3e4r",
      },
    };
  },
  // created() {
  //   axios
  //     .get(
  //       "https://count-book-on-premises-user-service-dev.azurewebsites.net/swagger/index.html/api/v1/User/Login"
  //     )
  //     .then((response) => {
  //       console.log("gundemListOriginalContent", response);
  //     });
  // },
  // created() {
  //   var token = "eyJ0eXAiO.../// jwt token";
  //   var decoded = jwt_decode(token);
  //   var decodedHeader = jwt_decode(token, { header: true });
  //   console.log(decodedHeader);
  // },
  methods: {
    // ...mapActions({
    //   Login: "Login",
    // }),
    login() {
      this.$store.dispatch("Login", { ...this.user }).then((response) => {
        this.$router.push("/");
      });
    },
  },
};
</script>