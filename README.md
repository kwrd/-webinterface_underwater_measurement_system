## 海中センサ計測システムのwebインターフェース

### Bluetoothのエラー


### 手元で再現したい場合

#### taiwwindcssの設定(UI適当で良い場合省略可)
- npm init
- npm install tailwindcss postcss autoprefixer
- tailwindcss/styles.cssの作成 (名前はなんでもいい)
```css
@tailwind base;

@tailwind components;

@tailwind utilities;
```
- npx tailwind build ./tailwindcss/styles.css -o ./static/css/style.css (作成したディレクトリに対して指定する)

