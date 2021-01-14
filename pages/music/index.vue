<template>
  <div class="container">
    <h2 class="page-title">楽曲一覧</h2>

    <a-collapse>
      <a-collapse-panel key="1" header="ディスクを登録">
        <a-form :form="discForm" @submit="discHandleSubmit">
          <a-form-item label="ディスクタイトル">
            <a-input v-decorator="['title', { rules: [{ required: true, message: 'ディスクタイトルを入力してください' }] }]"/>
          </a-form-item>
          <a-form-item label="詳細">
            <a-input type="textarea" v-decorator="['description', { rules: [{ required: true, message: 'ディスクの詳細を入力してください' }] }]"/>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit"> 登録 </a-button>
          </a-form-item>
        </a-form>
      </a-collapse-panel>
    </a-collapse>

    <div class="discContent" v-for="disc in getDiscList" :key="disc.id">
      <h3 class="discContent__title">{{ disc.title }}</h3>

      <div>
        <a-collapse>
          <a-collapse-panel key="1" header="楽曲を登録">
            <a-form :form="musicForm" @submit="musicHandleSubmit(disc.id)">
              <a-form-item label="楽曲タイトル">
                <a-input v-decorator="['title', { rules: [{ required: true, message: '楽曲タイトルを入力してください' }] }]"/>
              </a-form-item>
              <a-form-item label="コメント">
                <a-input type="textarea" v-decorator="['comment', { rules: [{ required: true, message: 'コメントを入力してください' }] }]"/>
              </a-form-item>
                <a-form-item>
                  <a-button type="primary" html-type="submit"> 登録 </a-button>
                </a-form-item>
            </a-form>
          </a-collapse-panel>
        </a-collapse>
      </div>

      <a-list
        :loading="getIsLoading"
        item-layout="horizontal"
        :data-source="disc.musics"
      >
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta :description="item.comment">
            <nuxt-link
              slot="title"
              :to="{ name: 'music-id', params: { id: item.id } }"
              >{{ index + 1 }}. {{ item.title }}</nuxt-link
            >
          </a-list-item-meta>
        </a-list-item>
      </a-list>

      <a-button size="small">ディスクを編集</a-button>
      <a-button size="small">ディスクを削除</a-button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      loading: false,
      discForm: this.$form.createForm(this, {name: "disc_form"}),
      musicForm: this.$form.createForm(this, {name: "music_form"}),
    };
  },
  async fetch() {
    await this.fetchDiscList();
  },
  computed: {
    ...mapGetters("music", ["getDiscList", "getIsLoading"]),
  },
  methods: {
    ...mapActions("music", ["fetchDiscList"]),
    discHandleSubmit() {
      event.preventDefault();
      this.discForm.validateFields((err, values) => console.log(values))
    },
    musicHandleSubmit(id, e) {
      event.preventDefault();
      console.log("discID: " + id)
      this.musicForm.validateFields((err, values) => console.log(values))
    }
  },
};
</script>

<style lang="postcss" scoped>
.discContent {
  padding: 20px;
  border: 2px solid rgb(211, 211, 211);
  margin-bottom: 20px;
  &__title {
    font-size: 1.5rem;
  }
}

.musicForm {
  padding: 20px;
  background-color: rgb(245, 245, 245);
}

/deep/ .ant-list-item-meta-title {
  font-size: 1.2rem;
}
/deep/ .ant-list-item-meta-description {
  font-size: 0.8rem;
}
</style>
