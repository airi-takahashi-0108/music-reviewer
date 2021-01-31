# music-reviewer

私、高橋愛理のポートフォリオとして作成した、楽曲レビューアプリです。

少しマニアックなアプリになりますが…

作曲家が、ギタリストなどの奏者と一緒に楽曲制作をするにあたり、「この曲のここはもっとこうしたい！」などのやりとりが頻繁に発生しますが、このアプリを使うと、楽曲ファイルごとにweb上でコメントしあうことができます。

※使用方法はトップページにてご確認ください。

## apiサーバーの立ち上げ
```bash
$ cd api
$ bundle install
$ rails s
```

## フロントの立ち上げ
```bash
$ yarn 
$ yarn dev
```

なお、現在まだまだ途中の段階ですので、楽曲情報などの基本的な登録更新削除のみ機能しています。
（削除時の画面のリロードがうまくいっていなかったり、ローディングアニメーションやエラーハンドリングはまだ実装しておりません…）
ユーザー認証は未実装です。