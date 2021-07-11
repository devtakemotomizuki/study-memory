# StudyMemory

## アプリの概要

勉強時間を記録し管理することで勉強に対するモチベーションの向上を図るためのアプリです。

## 主な機能

### サインアップ・ログイン

![ログイン](/markdown/login.png)

メールアドレスのログインとGoogleアカウントでのログインがあります。

### 勉強時間の記録

![記録](/markdown/record.png)

再生ボタンを押すことで記録を開始できます。特定の日付の部分をクリックすることで編集もできます。


### グラフを見る

![グラフ](/markdown/graph.png)

記録した時間をグラフで見ることができます

## デプロイ

Firebase Hostingでweb上に公開されています。アクセスは[こちら](https://study-memory.web.app/)

## 使用したツール

Type Scritptフレームワークである[Angular](https://github.com/angular/angular-cli) version 11.2.7.を用いて作成しました。
データベースやユーザ認証はFirebaseを使って実装しています。
