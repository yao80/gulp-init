# gulp-init

静的webサイト開発用スケルトン

## 目次

- [必要環境](#sec1)
- [インストール](#sec2)
- [プロジェクト開始時](#sec3)
- [作業ルール](#sec4)
- [pug（旧jade）](#sec5)
    - [ファイル設計](#sec5-1)
    - [記法](#sec5-2)
- [SCSS](#sec6)
    - [ファイル設計](#sec6-1)
    - [補足](#sec6-2)
    - [汎用的mixinについて](#sec6-3)
- [bower](#sec7)
- [オプションコマンド](#sec8)
- [課題](#sec9)

<br>
<br>

<a name="sec1"></a>
## 必要環境

* Node.js
* ruby
* git
* sass（sourcemapを未使用のためver3.3.4推奨）
* gulp
* bower


<br>


<a name="sec2"></a>
## インストール

sassをインストールしていない場合、下記コマンドにてインストール（rubyインストール後　Macは標準でrubyが入っている）

    gem install sass -v '3.3.4'

gulpをグローバルにインストールしていない場合、下記コマンドにてインストール

    npm install -g gulp

bowerをグローバルにインストールしていない場合、下記コマンドにてインストール

    npm install -g bower


<br>


<a name="sec3"></a>
## プロジェクト開始時

まずターミナル上で作業ディレクトリへ移動

    cd \Users\NipponTaro\htdocs

移動後、スケルトンリポジトリをgit clone

    git clone  git@github.com:yao80/gulp-init.git

続いて、プロジェクトディレクトリに移動する（プロジェクト名に合わせてディレクトリ名を変更する）

    cd project-name

初回のみnpm packageとjsのライブラリをインストールするため下記コマンドを実行

    npm i && gulp bower

packageのインストール完了後、下記コマンドにてタスクランナー起動

    gulp


<br>


<a name="sec4"></a>
## 作業ルール

<br>

### 作業ディレクトリ
src/ディレクトリ配下のファイルを編集する。

<br>

### config設定
build/ディレクトリ配下に出力されるファイルがリモートにアップするファイルとなる。


<br>


<a name="sec5"></a>
## pug


<a name="sec5-1"></a>
### ファイル設計

パーシャル用pugファイルはtemplateディレクトリ配下に格納する。

各pugファイルの役割は以下。

* layout.pug…docment全体のフレーム
* header.pug…全ページ共通のヘッダー
* footer.pug…全ページ共通のフッター
* js.pug…読み込むJSファイルを指定
* ga.pug…GoogleAnalyticsの解析タグを指定
* ie.pug…IE9以下で読み込むJSファイルを指定（不要であればincludeしない）

※その他必要に応じてpugファイルを追加し、インクルードする。

<br>

<a name="sec5-2"></a>
### 記法

**■idとclassの書き方**
```pug
// pug
section#top
  .content 
```
↓
```html
// html
<section id="top">
  <div class="content"></div>
</section>
```
<br>
**■属性の書き方**
```pug
// CSS
link(link="css/style.css")

// JS
script(src="js/bundle.js")

// リンク
a(href="#") Top

// inputタグ
input(type="text")

input(
  type="radio"
  name="hoge"
  checked
)
```
<br>
**■文章の改行**
```pug
// pug
p
  |テキストテキストテキスト
  br
  |テキストテキストテキスト
```
↓
```html
// html
<p>テキストテキストテキスト<br>テキストテキストテキスト</p>
```
<br>
**■コメント**
```pug
// pug
// HTMLで出力されるコメント
//- HTMLで出力されないコメント
```
<br>
**■変数**
```pug
// 変数の定義
- var page = "top";

// 出力する時
h1 #{page}
```
<br>
**■ループ**
```pug
// pug
section
  - for (var i = 0; i < 3; i++){
    .block
      h2(class=`${i}`) タイトル
  - }
```
↓
```html
// html
<section>
  <div class="block">
    <h2 class="0">タイトル</h2>
  </div>
  <div class="block">
    <h2 class="1">タイトル</h2>
  </div>
  <div class="block">
    <h2 class="2">タイトル</h2>
  </div>
</section>
```
<br>
**■include**

記述の一部をパーツ化し、includeで必要な箇所に読み込むことができる。
```pug
include header
```
<br>
**■mixin**

関数のようなもの。引数を渡したり、呼び出し元にblockがあるかないかで出力結果を変えることもできる。
```pug
// pug

// mixinの定義
mixin article(title)
  article
    h1 #{title}
    if block
      block
    else
      p ダミーテキストです

// mixinの呼び出し（blockなし）
+article("タイトル")

// mixinの呼び出し（blockあり）
+article("タイトル")
  p テキストテキスト
```
↓
```html
// html

// blockがない場合
<article>
  <h1>タイトル</h1>
  <p>ダミーテキストです</p>
</article>

// blockがある場合
<article>
  <h1>タイトル</h1>
  <p>テキストテキスト</p>
</article>
```
<br>
<br>
**■extends**

テンプレートを継承して、部分的に固有の値を出力させることができる
```pug
// layout.pug
doctype
html(lang='ja')
  head
    meta(charset='UTF-8')
    meta(http-equiv='X-UA-Compatible' content='IE=edge')
    meta(name='viewport', content='width=device-width,user-scalable=yes,initial-scale=1.0')
    meta(name='format-detection', content='telephone=no')
    block title
    block meta
    link(rel='shortcut icon', href='/favicon.ico')
  body
    include header
    block body
    include footer


// index.pug
extends template/layout
block title
  title index.pugのタイトルが入ります
block meta
  meta(name='description', content='index.pugのディスクリプションが入ります')
block body
  #content
    p ここはindex.pugのコンテンツです
```
↓
```html
// html
<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,user-scalable=yes,initial-scale=1.0">
    <meta name="format-detection" content="telephone=no">
    <title>index.pugのタイトルが入ります</title>
    <meta name="description" content="index.pugのディスクリプションが入ります">
    <link rel="shortcut icon" href="/favicon.ico">
  </head>
  <body>
    <header>
    </header>
    <div id="content">
      <p>ここはindex.pugのコンテンツです</p>
    </div>
    <footer>
    </footer>
  </body>
</html>
```
<br>
<br>


<a name="sec6"></a>
## SCSS


<a name="sec6-1"></a>
### 命名規則

基本的にBEMの概念に則って命名する。

B…Block  
E…Element  
M…Modifier

* blockとelementは「_」で区切る
* blockまたはelementとmodifierは「-」で区切る
* block、element、modifierが2単語以上からなる場合はキャメルケースで繋ぐ（mainCol、isActive等）
* modifierは基本的にkeyValueの形で指定する（.btn-sizeL等）

例）
```html
<nav class="gNav">
  <ul class="gNav_list">
    <li class="gNav_item gNav_item-isActive">Menu1</li>
    <li class="gNav_item">Menu2</li>
    <li class="gNav_item">Menu3</li>
  </ul>
</nav>
```

### ルール

* blockは独立した存在であり、デザインの構成要素となる。ページのどこの位置に配置されても機能することが前提。
* elementはblockの一部であり、特定の役割を果たす。elementはコンテキストに依存していて、そのエレメントが属するblockだけで機能する。
* modifierはblockとelementのスタイルにバリエーションをもたせる役割をする。modifierは複数組み合わせることも可能。
* セレクターにIDは使用しない。（そのblockをページ内で1回しか使えなくなってしまうため）
* 子孫セレクタは使用せず、個別にclassを持たせる。（.nav ul li等の指定はNG）
* block単位でファイルを作成する。（block名の重複を防止できる）
* BEMで命名していくとクラス名が冗長になりやすいが、見てわかりやすい名前にすることでパーツの再利用性やメンテナンス性を高めることを重要視するため、クラス名の長さにこだわらない

### ファイル設計

最終的にstyle.scssで全パーシャルファイルをインポートし、style.cssとして全ページ読み込む。  
パーシャルファイルは必ず「_（アンダースコア）」を接頭辞とする。  
（パーシャルファイルはビルド時にcssファイルとしては出力されない）

各scssファイルの役割は以下。

* import/_base.scss…bodyなど全ページ共通部分を記述（リセットCSS含む）
* import/_settings.scss…サイトの基本設定を定義（必要に応じて適宜パラメータを変更・追加する）
* import/_extentions.scss…汎用的mixinまたはextendを定義
* blocks/_xxx.scss…1ブロック1ファイルで構成していく
* style.scss…パーシャルファイルインポート用

<br>

<a name="sec6-2"></a>
### 補足

画像パスは下記のようにインターポレーションを使用して記述可能であり、あとからパスが変わった場合も一括で変更可能  
※$imgPathはimport/_settings.scssにて設定可能

    background: url(#{$imgPath}common/bg.png);

<br>

<a name="sec6-3"></a>
### 汎用的mixinについて

import/_extentions.scssに記述してある汎用的mixinの使い方・役割は下記の通り。

<br>

#### フォントサイズ
フォントサイズをCSS3のrem（emや%などのように親要素の影響を受けず、常にroot要素（html要素）のフォントサイズを基準とする単位）に変換し、またremをサポートしていないブラウザのためにpxでフォントサイズを指定できるmixin

```scss
/* 
 * 第1引数 : pxでのサイズ指定
 */
 
@include font-size(12);
```

<br>

#### font-face
フォントファイルの読み込みを行うmixin  
フォントファイルのフォーマットはeot,woff,ttf,svgを想定（必要に応じて追加・削除）

```scss
/*
 * 第1引数 : フォント名
 * 第2引数 : フォントスタイル
 * 第3引数 : 太さ
*/

@include font-face(Noto-sans,normal,normal);
```

<br>

#### メディアクエリ
import/_settings.scssのブレークポイントの値に基づいてデバイスサイズごとにスタイルを振り分けるmixin（主にレスポンシブ対応用）

```scss
// PCサイズでのスタイル指定
@include mqPC{
  color : #000;
}

// タブレットサイズでのスタイル指定
@include mqTab{
  color : #333;
}

// スマホサイズでのスタイル指定
@include mqSP{
  color : #666;
}
```

<br>

#### CSSスプライト（Retina対応）
Retina対応用に2倍のサイズで作成したCSSスプライトの画像を実際の表示サイズに戻すmixin  
基本的に後述の[スプライト画像生成コマンド](#sec8)で作成されるスプライト画像とscssファイルと併用して使用する。

```scss
// 使用例
h1{
  width: 200px;
  height: 20px;
  a{
    @include r-sprite($logo);
  }
}
```

<br>

#### ポジション
要素を絶対位置（absolute）で指定できるmixin

```scss
/*
 * 第1引数 : 基準点（lt,rt,lb,rb）
 * 第2引数 : leftまたはrightからの位置（単位：px or %）
 * 第3引数 : topまたはbottomからの位置（単位：px or %）
 */

@include abs(lt,100px,50%);
```

<br>

#### 透明度
IEにも対応した透明度の指定を行うmixin

```scss
/* 
 * 第1引数 : 透明度（小数点で指定）
 */
 
@include opacity(0.8);
```

<br>

#### border-box
borderやpaddingを含めて高さや幅の計算をしてくれるbox-sizingのborder-boxを指定するmixin  
デフォルトのcontent-boxに戻したい場合は引数に「content-box」を指定

```scss
/* 
 * 第1引数 : box-sizing プロパティ（デフォルト値：border-box）
 */

 @include border-box;
```

<br>

#### 円形
要素を円形にするmixin

```scss
/*
 * 第1引数 : 円形にするポイント（all,lt,rt,lb,rb）
 * 第2引数 : 値（単位：px or %）
 */

@include radius(all,50%);
```

<br>

#### 矢印
矢印アイコンのmixin

```scss
/* 
 * 第1引数 : 矢印の向き（top,bottom,left,right）
 * 第2引数 : 高さ（単位：px）
 * 第3引数 : 幅（単位：px）
 * 第4引数 : 色（rgbaでの指定も可能）
 */

@include arrow(bottom,10px,5px,#F00);
```

<br>

#### ボックスシャドウ
要素にボックスシャドウをかけるmixin

```scss
/* 
 * 第1引数 : 水平方向の影の距離（単位：px）
 * 第2引数 : 垂直方向の影の距離（単位：px）
 * 第3引数 : ぼかし具合（単位：px）
 * 第4引数 : 広がり具合（単位：px）
 * 第5引数 : 影の色（rgbaでの指定も可能）
 */

@include box-shadow(5px,5px,3px,3px,rgba(100,100,100,0.2));
```

<br>

#### テキスト非表示
テキストのみを非表示にしたいときに使うmixin

```scss
// 使用例
@include text-hidden;
```

<br>

#### 上下中央に配置
要素を上下中央に配置したいときに使うmixin

```scss
// 使用例
@include vam;
```

<br>

#### グリッドシステム
％による可変幅のグリッドレイアウトが出来るmixin  
1px単位まで求められるデザインでは使用が難しい。

```html
<div class="row-3">
  <div class="col-4"></div>
  <div class="col-4"></div>
  <div class="col-4"></div>
</div>
```

```scss
/* 
 * 第1引数 : 分割トータルカラム数
 * 第2引数 : マージン（%指定）
 * 第3引数 : グリッドシステム適用する親要素のクラス名
 */
@include rows(12,3%,'row-3');
.row-3 {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}
```

<br>

#### element,modifier
elementとmodifierの詳細度を上げずにネストで書けるようにするmixin

```scss
// 使用例
.header {
  width: 100%;
  @include e(logo){
    float: left; 
  }
  @include m(isActive){
    color: #F00; 
  }
}
```

<br>

#### clearfix
float解除用mixin（floatさせる子要素を包括する親要素に指定）

```scss
// 使用例
@include clearfix;
```


<br>
<br>
---
<br>
<br>


<a name="sec7"></a>
## bower

フロントエンド用のパッケージマネージャ。開発に必要なJSのライブラリをコマンドラインから検索したりインストールすることが可能。

### コマンド

#### ライブラリの追加
    bower install jquery --save

#### ライブラリの削除
    bower uninstall libraryName --save

#### ライブラリの検索
    bower search jquery

#### インストール済みのライブラリを確認
    bower list


<br>
<br>
---
<br>
<br>


<a name="sec8"></a>
## オプションコマンド

####JSライブラリのインストール
    gulp bower

bower.jsonを参照し、ライブラリを/common/js/配下にインストールするコマンド
基本的にプロジェクト開始時にbower.jsonを編集し、必要なライブラリを定義しておく
開発中に必要なライブラリの変更があった場合は、bower.jsonをアップデートし、再度gulp bowerを実行

<br>

####CSSスプライト画像生成
    gulp sprites

src/images/sprites/hoge配下に入っているpngファイルをbuild/images/common配下に1つのpng画像（hoge.png）として出力する。
それと同時に、src/scss/sprites配下に_hoge.scssを出力する。


実際に使用するときは出力されたscssファイルをimportし、mixinで呼び出す。

<br>

####納品ファイル生成
    gulp --env production

圧縮化されたJSファイルとCSSファイルをデプロイする。


<br>
<br>
---
<br>
<br>


<a name="sec9"></a>
## 課題

* スタイルガイドジェネレーターのパッケージを追加

<br>
<br>
