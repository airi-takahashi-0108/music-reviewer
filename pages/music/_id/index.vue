<template>
  <div class="container">
    <h2>楽曲詳細</h2>
    <h3>{{ getMusic.title }}</h3>
    <p>{{ getMusic.comment }}</p>

    <div v-if="!(getMusic.versions && getMusic.versions.length)" class="explanation">
      楽曲のバージョンと楽曲データを登録してみよう！<br>
      <br>
      例）<br>
      バージョン：ギターを入れてみた<br>
      コメント：ギターを入れてみましたがいかがでしょうか。<br>
      楽曲データ：20210115.mp3
    </div>

    <button @click="toggleUpdateForm" class="editButton">楽曲を編集</button>
    <button @click="deleteMusicId(getMusic.id)" class="deleteButton">楽曲を削除</button>
    
    <div class="updateForm" v-show="dispMusicUpdateForm">
      <a-form :form="musicUpdateForm" @submit="musicUpdateHandleSubmit(getMusic.id)">
        <a-form-item label="楽曲タイトル">
          <a-input v-decorator="['title', { initialValue: getMusic.title, rules: [{ required: true, message: '楽曲タイトルを入力してください' }] }]"/>
        </a-form-item>
        <a-form-item label="コメント">
          <a-input type="textarea" v-decorator="['comment', { initialValue: getMusic.comment, rules: [{ required: true, message: 'コメントを入力してください' }] }]"/>
        </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="updateForm__button"> 更新 </a-button>
          </a-form-item>
      </a-form>  
    </div>

    <a-collapse class="registrationForm discRegistrationForm">
      <a-collapse-panel key="1" header="楽曲のバージョンを登録">
        <a-form　:form="versionForm" @submit="versionHandleSubmit(getMusic.id)">
          <a-form-item label="バージョン">
            <a-input v-decorator="['version', { rules: [{ required: true, message: 'バージョン情報を入力してください' }] }]"/>
          </a-form-item>
          <a-form-item label="コメント">
            <a-input v-decorator="['comment', { rules: [{ required: true, message: 'コメントを入力してください' }] }]"/>
          </a-form-item>
          <a-form-item label="楽曲データ">
            <a-upload v-decorator="['audio', { rules: [{ required: true, message: '楽曲ファイルをアップロードしてください' }] }]"
              name="upload"
              :before-upload="beforeUpload"
              :file-list="versionFile"
              accept="audio/wav, audio/mpeg"
              :multiple="false"
            >
              <a-button> <a-icon type="upload" /> Click to Upload </a-button>
            </a-upload>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="registrationForm__button"> 登録 </a-button>
          </a-form-item>
        </a-form>
      </a-collapse-panel>
    </a-collapse>

    <div v-for="music in getMusic.versions" :key="music.id">
      <div class="musicContents">
        <h4>バージョン:{{ music.version }}</h4>
        <p class="musicContents__createdAt">{{ music.created_at }}作成</p>
        <p>{{ music.comment }}</p>

        <audio
          :src="setMusicSrc('/music/001.mp3')"
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

        <a-textarea placeholder="コメント入力" class="musicContents__commentTextarea"/> <a-button size="small" class="musicContents__commentButton">コメントする</a-button>
        <a-list
          class="comment-list"
          item-layout="horizontal"
          :data-source="sample"
        >
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-comment :author="item.author" :avatar="item.avatar">
              <p slot="content">
                {{ item.content }}
              </p>
              <a-tooltip slot="datetime" :title="item.datetime">
                <span>{{ item.datetime }}</span>
              </a-tooltip>
            </a-comment>
          </a-list-item>
        </a-list>

      </div>
    </div>

    <a-button size="small">
      <nuxt-link to="/music">戻る</nuxt-link>
    </a-button>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";

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
        this.$set(
          this.percent,
          music.id,
          Math.floor((audio.currentTime / audio.duration) * 100)
        );
      });
    });
  },
  data() {
    return {
      percent: {},
      currentTime: {},
      duration: {},
      versionForm: this.$form.createForm(this, { name: "version_form" }),
      musicUpdateForm: this.$form.createForm(this, {
        name: "music_update_form",
      }),
      versionFile: [],
      dispMusicUpdateForm: false,
      sample: [
        {
          author: "TAKAHASHI",
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          content: "ありがとうー！もっとシンプルでもいいかも",
          datetime: 2020,
        },
        {
          author: "SHINJI",
          avatar:
            "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
          content: "わかりました、シンプルにして弾き直してみますね！",
          datetime: 2020,
        },
      ],
    };
  },
  methods: {
    ...mapActions("music", [
      "fetchMusic",
      "postVersion",
      "deleteMusic",
      "updateMusic",
    ]),
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
    test(e) {
      event.preventDefault();
      console.log(e.target.files);
    },
    setMusicSrc(srcUrl) {
      // TODO: バイナリデータを格納するデータベースのURLを返す,s3の予定
      return "http://localhost:8080" + srcUrl;
    },
    versionHandleSubmit(id) {
      this.versionForm.validateFields((err, values) => {
        values = _.omit(values, ["audio"]);
        this.postVersion({ data: values, id: id });
      }).then(()=> {
        this.$router.push('/music/' + this.route.params.id)
      })
    },
    musicUpdateHandleSubmit(id) {
      this.musicUpdateForm.validateFields((err, values) => {
        this.updateMusic({ data: values, id: id });
      }).then(()=> {
        this.$router.push('/music/' + this.route.params.id)
      })
    },
    beforeUpload(file) {
      this.versionFile = [];
      const isAudio = file.type === "audio/wav" || file.type === "audio/mpeg";
      if (!isAudio) {
        this.$message.error("拡張子がWAVかmp3のファイルを選択してください");
        return;
      }
      this.versionFile.push(file);
    },
    async deleteMusicId(id) {
      if (window.confirm("楽曲を本当に削除しますか？")) {
        await this.deleteMusic(id);
        this.$router.push('/music/')
      }
    },
    toggleUpdateForm() {
      this.dispMusicUpdateForm = !this.dispMusicUpdateForm;
    },
  },
  computed: {
    ...mapGetters("music", ["getMusic"]),
  },
};
</script>

<style lang="scss" scoped>
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
  &__createdAt {
    font-size: 0.7rem;
  }
  &__commentButton {
    margin-top: 10px;
  }
  &__commentTextarea {
    margin-top: 10px;
  }
}

.discRegistrationForm {
  margin: 15px 0;
}

.ant-comment-content-detail {
  & p {
    white-space: unset;
  }
}
.ant-comment-inner {
  padding: 0;
}
</style>
