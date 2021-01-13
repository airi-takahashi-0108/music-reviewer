<template>
  <div class="container">
    <h2 class="page-title">楽曲一覧</h2>

    <a-collapse>
      <a-collapse-panel key="1" header="ディスクを登録">
        <a-form :form="discForm" @submit="discHandleSubmit">
          <a-form-item ref="name" label="ディスク名" prop="name">
            <a-input />
          </a-form-item>
          <a-form-item ref="comment" label="詳細" prop="comment">
            <a-input type="textarea" />
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
            <a-form-model>
              <a-form-model-item ref="name" label="楽曲名" prop="name">
                <a-input />
              </a-form-model-item>
              <a-form-model-item ref="comment" label="コメント" prop="comment">
                <a-input type="textarea" />
              </a-form-model-item>
            </a-form-model>
            <a-button type="primary" html-type="submit"> 登録 </a-button>
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
      discForm: this.$form.createForm(this),
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
      
          this.discForm.validateFields((err, values) => console.log(values))



    },
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
