<template>
  <div class="div">
    <navBar />
    <div class="row mt-5">
      <div class="col-md-6 offset-md-3">
        <h1>hoşgeldiniz {{ TokenName }}</h1>
        <p>
          otomatik olarak olarak sistemden 5 dakika içerisinde ayıralacaksınız !
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/navbar/navBar";
import jwt_decode from "jwt-decode";
export default {
  components: {
    navBar,
  },
  data() {
    return {
      TokenName: "",
    };
  },
  mounted() {
    var token = localStorage.getItem("token"); // localden kullanıcımızın tokenımızı cekiyoruz
    var decoded = jwt_decode(token); // ayarlanıyor..
    this.TokenName = jwt_decode(token).given_name; // localin içindeki tokeni açtığımızda içinden çıkan kullanıcı ismini datanın içerisindekki TokenName veriyoruz.
    // console.log(this.TokenName);
  },
};
</script>

