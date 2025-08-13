# TodoAppLv2

Angular Todo アプリケーションのレベル2実装版です。

## Level1からの変更点

### 主な改善点
- **Reactive Forms**: Template-driven formsからReactive Formsに変更
  - バリデーション機能の強化
  - フォーム状態の詳細管理
  - より堅牢なデータ入力処理

- **Bootstrap & NG Bootstrap**: UIライブラリの導入
  - Bootstrap 5.3.7 による洗練されたデザイン
  - NG Bootstrap 16.0.0 によるAngular専用コンポーネント
  - レスポンシブデザインの改善

- **機能拡張**:
  - フォームバリデーションエラーの詳細表示
  - ローディング状態の表示
  - カードベースの美しいUI
  - ボタンアニメーションとホバーエフェクト

### 技術スタック
- Angular 17.3.0
- Reactive Forms
- Bootstrap 5.3.7
- NG Bootstrap 16.0.0
- Angular In-Memory Web API

### 実装済み機能
- Todo項目のCRUD操作（作成・読み取り・更新・削除）
- Reactive Formsによるバリデーション
- ルーティング機能
- レスポンシブデザイン
- エラーハンドリング

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
