<template>
  <div class="container loginContainer">
    <h2>MUSIC REVIEWIE</h2>
    <div class="formContentContainer">
      <h3>ログイン</h3>
      <a-form :form="loginForm" @submit="loginHandleSubmit">
        <a-form-item label="メールアドレス">
          <a-input v-decorator="['title', { rules: [{ required: true, message: 'メールアドレスを入力してください' }] }]"/>
        </a-form-item>
        <a-form-item label="パスワード">
          <a-input v-decorator="['description', { rules: [{ required: true, message: 'パスワードを入力してください' }] }]"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="button"> ログイン </a-button>
        </a-form-item>
      </a-form>
    </div>

    <div class="formContentContainer">
      <h3>ユーザー登録</h3>
      <a-form :form="createUserForm" @submit="createUserHandleSubmit">
        <a-form-item label="メールアドレス">
          <a-input v-decorator="['title', { rules: [{ required: true, message: 'メールアドレスを入力してください' }] }]"/>
        </a-form-item>
        <a-form-item label="パスワード">
          <a-input v-decorator="['description', { rules: [{ required: true, message: 'パスワードを入力してください' }] }]"/>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" class="button"> 登録 </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      loginForm: this.$form.createForm(this, { name: "login_form" }),
      createUserForm: this.$form.createForm(this, { name: "create_user_form" }),
    };
  },
  methods: {
    loginHandleSubmit() {
      event.preventDefault();
    },
    createUserHandleSubmit() {
      event.preventDefault();
    }
  }
};
</script>


<style scoped>
.loginContainer {
  height: 100%;
  margin: 0 auto;
  width: 400px;
}

.formContentContainer {
  margin-bottom: 18px;
}

.button {
  margin-top: 15px
}
</style>