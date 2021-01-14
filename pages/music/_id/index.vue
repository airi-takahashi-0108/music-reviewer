<template>
  <div class="container">
    <h2 class="page-title">楽曲詳細</h2>
    <h3>{{ getMusic.title }}</h3>
    <p>{{ getMusic.comment }}</p>

    <a-button size="small">楽曲を編集</a-button>
    <a-button size="small">楽曲を削除</a-button>
    
    <a-collapse>
      <a-collapse-panel key="1" header="楽曲のバージョンを登録">
        <a-form　:form="versionForm" @submit="versionHandleSubmit">
          <a-form-item label="バージョン">
            <a-input v-decorator="['version', { rules: [{ required: true, message: 'バージョン情報を入力してください' }] }]"/>
          </a-form-item>
          <a-form-item label="楽曲データ">
            <a-upload v-decorator="['upload', { rules: [{ required: true, message: '楽曲ファイルをアップロードしてください' }] }]"
              name="upload"
              :before-upload="beforeUpload"
              :file-list="versionFile"
            >
              <a-button> <a-icon type="upload" /> Click to Upload </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit"> 登録 </a-button>
          </a-form-item>
        </a-form>
      </a-collapse-panel>
    </a-collapse>

    <div v-for="music in getMusic.versions" :key="music.id">
      <div class="musicContents">
        <h4>バージョン:{{ music.version }}</h4>
        <p>{{ music.created_at }}作成</p>

        <audio
          :src="setMusicSrc(music.src)"
          :id="'music' + music.id"
          preload="auto"
          type="audio/mpeg"
        />

        <button id="play" @click="play('music' + music.id)">再生</button>
        <button id="play" @click="stop('music' + music.id)">停止</button>
        <button id="skip" @click="back('music' + music.id)">←</button>
        <button id="skip" @click="skip('music' + music.id)">→</button>

        <div
          @click="changePosition(music.id, $event)"
          :id="'seekbar' + music.id"
          class="seekbar"
          :style="{ 'background-size': percent[music.id] + '%' }"
        ></div>
        <span :id="'status' + music.id">
          {{ currentTime[music.id] }}/{{ duration[music.id] }}
        </span>
        <a id="download" :href="setMusicSrc(music.src)" download>DOWNLOAD</a>
      </div>
    </div>

    <a-button size="small">
      <nuxt-link to="/music">戻る</nuxt-link>
    </a-button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import _ from 'lodash'

export default {
  name: "music-id",
  async mounted() {
    await this.fetchMusic({ id: this.$route.params.id });
    
    _.forEach(this.getMusic.versions, (music) => {
      // 再生位置を０に設定
      this.$set(this.percent, music.id, 0);
      // 再生時間を０に設定
      this.$set(this.currentTime, music.id, 0);

      const audio = document.getElementById("music" + music.id);

      // オーディオが再生可能になったら総再生時間を設定
      audio.addEventListener("canplay", () => {
        this.$set(this.duration, music.id, Math.floor(audio.duration));
      });
      // オーディオが更新されたら再生位置と再生時間をセット
      audio.addEventListener("timeupdate", () => {
        this.$set(this.currentTime, music.id, Math.floor(audio.currentTime));
        this.$set(this.percent, music.id, Math.floor((audio.currentTime / audio.duration) * 100)
        );
      });
    });
  },
  methods: {
    ...mapActions("music", ["fetchMusic"]),
    changePosition(id, e) {
      const audio = document.getElementById("music" + id);

      const percent = Math.floor(
        (e.offsetX / document.getElementById("seekbar" + id).clientWidth) * 100
      );
      const newCurrentTime = Math.floor((audio.duration * percent) / 100);

      audio.currentTime = newCurrentTime;
    },
    skip(id) {
      document.getElementById(id).currentTime += 10;
    },
    back(id) {
      document.getElementById(id).currentTime -= 10;
    },
    play(id) {
      document.getElementById(id).play();
    },
    stop: function (id) {
      document.getElementById(id).pause();
    },
    setMusicSrc(srcUrl) {
      // TODO: バイナリデータを格納するデータベースのURLを返す,s3の予定
      return "http://localhost:8080" + srcUrl;
    },
    versionHandleSubmit() {
      event.preventDefault();
      this.versionForm.validateFields((err, values) => console.log(values))
    },
    beforeUpload(file) {
      this.versionFile = []
      const isAudio = file.type === 'audio/wav' || file.type === 'audio/mpeg';
      if (!isAudio) {
        this.$message.error('拡張子がWAVかmp3のファイルを選択してください');
        return
      } 
      this.versionFile.push(file)
    },
  },
  data() {
    return {
      percent: {},
      currentTime: {},
      duration: {},
      versionForm: this.$form.createForm(this, {name: "version_form"}),
      versionFile:[]
    };
  },
  computed: {
    ...mapGetters("music", ["getMusic"]),
  },
};
</script>

<style lang="postcss" scoped>
.seekbar {
  width: 100%;
  height: 32px;
  margin: 0.5em;
  border-radius: 5px;
  background: linear-gradient(#ccc, #ccc) no-repeat #eee;
}

.musicContents {
  padding: 20px;
  border-bottom: 1px solid rgb(170, 170, 170);
}
</style>
