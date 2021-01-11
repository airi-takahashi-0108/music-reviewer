<template>
  <div class="container">
    <h2　class="page-title">レビュワー一覧</h2>

    <a-collapse>
      <a-collapse-panel key="1" header="レビュワーを登録">
        <a-form-model :model="form">
          <a-form-model-item ref="name" label="名前" prop="name">
            <a-input />
          </a-form-model-item>
          <a-form-model-item ref="mail" label="メール" prop="mail">
            <a-input />
          </a-form-model-item>
          <a-form-model-item ref="phone" label="電話" prop="phone">
            <a-input />
          </a-form-model-item>

          <a-form-model-item label="権限">
            <a-radio-group>
              <a-radio value="admin">
                管理者
              </a-radio>
              <a-radio value="canReview">
                レビュワー
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-form-model>
        <a-button type="primary"> 登録 </a-button>
      </a-collapse-panel>
    </a-collapse>

    <a-list item-layout="horizontal" :data-source="getUserList">
      <a-list-item slot="renderItem" slot-scope="item, index">
        <button slot="actions">削除</button>
        <a-list-item-meta
          :description="'mail: ' + item.mail  + '　' + 'phone: ' + item.phone"
        >
          <p slot="title">{{ item.name }} <span class="user__authority">{{item.authority}}</span></p>
          <a-avatars
            slot="avatar"
            :src="item.image"
          />
        </a-list-item-meta>
      </a-list-item>
    </a-list>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters("user", ["getUserList", "getIsLoading"]),
  },
};
</script>

<style lang="postcss" scoped>
.user {
  &__authority {
    font-weight: 100;
    font-size: 0.7rem;
  }
}
</style>
