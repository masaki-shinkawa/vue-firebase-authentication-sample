# Vue + Firebase Authentication のサンプルプロジェクト

社内勉強会用に作成したサンプルプロジェクトです。
Firebaseの設定から、vueで作成したプロジェクトでOAuth認証を行う所までの手順です。

---

# 設定手順
## Firebaseでの操作
1. firebaseにアクセス  
https://firebase.google.com/
1. **コンソールへ移動**を押す
    1. ログインが必要な場合は適当なアカウントでログイン
1. **プロジェクトを追加**を押す
1. **プロジェクトの追加**モーダルを下記内容に変更
    - プロジェクト名: fb-auth-test
    - アナリティクスの地域: 日本
    - Cloud Firestore のロケーション: asia-northeast1
1. Project Overviewに遷移するので、**Authentication**を押す
1. **ログイン方法を設定**を押す
1. **Google**を押す
1. 入力画面が開くので下記内容を入力
    - プロジェクトの公開名: fb-auth-test
    - プロジェクトのサポートメール: 自分のメールアドレス
    - 右上の**有効にする**をON
1. Project Overviewの横の**歯車**を押す
1. **プロジェクトの設定**を押す
1. 設定->全般->アプリの **</>** を押す
1. モーダルが表示されるのでコピーを押す(出しっぱなしにしておくと後で楽)

## コンソールでの操作
1. mkdir -p ~/Desktop/sample/fb-auth/
1. cd ~/Desktop/sample/fb-auth/
1. npx -p @vue/cli vue create .
    - ? Generate project in current directory? Yes
    - ? Please pick a preset: default (babel, eslint)
1. npm run serve
1. ctr + c
1. npm i firebase

## エディタでの操作
1. `/src/main.js` に下記を追加(configは**Firebaseでの操作**でコピーした内容)
``` javascript
import Vue from 'vue'
import App from './App.vue'
// 追加ここから ---
import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyAsbEOjgm12wwwMFHg-V6KqmYXtd6YxLUY",
  authDomain: "fb-auth-test-1111.firebaseapp.com",
  databaseURL: "https://fb-auth-test-1111.firebaseio.com",
  projectId: "fb-auth-test-1111",
  storageBucket: "fb-auth-test-1111.appspot.com",
  messagingSenderId: "693208013602"
};
firebase.initializeApp(config);
// 追加ここまで ---

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```
1. `/src/components/HelloWorld.vue` のtemplateを書き換え
``` html
<template>
    <div class="hello">
        <button @click="auth">Google</button>
  </div>
</template>
```

1. `/src/components/HelloWorld.vue` のscriptを書き換え
``` javascript
<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data: () => {
    return {
      result: {}
    };
  },
  methods: {
    auth() {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      firebase.auth().signInWithRedirect(provider);
    }
  },
  async created() {
    const result = await firebase
      .auth()
      .getRedirectResult()
      .catch(function(error) {
        console.error(error);
      });
    if (result) {
      this.result = result;
    }
  }
};
</script>
```

## 実行
`npm run serve`

# まとめ
* firebaseを使うことでGoogleの認証処理を実装することは非情に簡単
* 実際に使うのであればvuexにわたすか、コンポーネントにしてしまったほうがいいかも
* ちょっと再認証の時に遅いのが気になる。解決策わかる人教えて。