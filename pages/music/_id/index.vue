<template>
  <div class="container">
    <h2 class="page-title">楽曲詳細</h2>

    <h3>{{ getMusic.title }}</h3>
    <p>{{ getMusic.comment }}</p>

    <a-button size="small">楽曲を編集</a-button>
    <a-button size="small">楽曲を削除</a-button>

    　<a-collapse>
      <a-collapse-panel key="1" header="楽曲のバージョンを登録">
        <a-form-model>
          <a-form-model-item ref="version" label="バージョン" prop="version">
            <a-input />
          </a-form-model-item>
          <a-upload
            name="music"
            :multiple="true"
          >
            <a-button> <a-icon type="upload" /> Click to Upload </a-button>
          </a-upload>
        </a-form-model>
        <a-button type="primary"> 登録 </a-button>
      </a-collapse-panel>
    </a-collapse>

    <div v-for="music in getMusic.versionList" :key="music.id">
      <div class="musicContents">
        <h4>バージョン:{{ music.version }}</h4>
        <p>{{ music.created }}作成</p>

        <audio
          :src="music.src"
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
        <a id="download" :href="music.src" download>DOWNLOAD</a>
      </div>
    </div>

    <a-button>戻る</a-button>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "music-id",
  created() {
  },
  mounted() {

    _.forEach(this.getMusic.versionList, (music) => {
      const audio = document.getElementById("music" + music.id);
      this.$set(this.percent, music.id, 0);
      this.$set(this.currentTime, music.id, 0);

      audio.addEventListener("canplay", () => {
        this.$set(this.duration, music.id, Math.floor(audio.duration));
      });
      audio.addEventListener("timeupdate", () => {
        this.$set(this.currentTime, music.id, Math.floor(audio.currentTime));
        this.$set(
          this.percent,
          music.id,
          Math.floor((audio.currentTime / audio.duration) * 100)
        );
      });
    });
  },
  methods: {
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
  },
  data() {
    return {
      percent: {},
      currentTime: {},
      duration: {},
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
