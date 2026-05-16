# Amagi Reversi

[繁體中文](README.md) | [English](README.en.md)

使用 Tauri 2、Vue 3、TypeScript、Pinia、Vite 與 Vitest 製作的本機黑白棋 / Reversi 遊戲。

這個專案優先重視規則正確性：黑白棋核心規則集中在 domain layer，Vue 元件只負責畫面呈現與使用者互動。

## 功能

- 標準 8x8 黑白棋棋盤
- 合法落子判斷
- 支援所有有效方向的棋子翻轉
- 回合切換與無合法步時的 pass 處理
- 勝負與平手判定
- 落子紀錄與悔棋
- 本機雙人對戰
- 可選的人機對戰模式與難度設定
- 合法步提示
- 本機遊戲狀態保存
- 適合桌面與手機尺寸的響應式版面
- 使用 Vitest 測試核心規則、序列化與 AI 輔助邏輯

## 技術棧

- Tauri 2
- Vue 3
- TypeScript
- Pinia
- Vue Router
- Vite
- Vitest
- Tailwind CSS

## 專案結構

```text
src/
  app/                 Vue 應用程式外殼與路由
  components/
    board/             棋盤格與棋子元件
    game/              遊戲控制、狀態、模式選擇與結果對話框
    layout/            應用程式版面元件
  domain/              黑白棋規則、型別、常數、序列化與 AI 輔助邏輯
    __tests__/         核心邏輯的 Vitest 單元測試
  pages/               頁面層級的 Vue view
  services/            本機儲存與統計服務
  stores/              Pinia store
  styles/              全域樣式

src-tauri/             Tauri 桌面應用程式外殼
```

## 開始使用

安裝依賴：

```bash
npm install
```

啟動 Web 開發伺服器：

```bash
npm run dev
```

以開發模式啟動 Tauri 桌面應用程式：

```bash
npm run tauri:dev
```

建置 Web 版本：

```bash
npm run build
```

建置 Tauri 桌面應用程式：

```bash
npm run tauri:build
```

## 測試

以 watch 模式執行測試：

```bash
npm test
```

執行一次測試：

```bash
npm run test:run
```

執行 TypeScript 型別檢查：

```bash
npm run type-check
```

## 主要邏輯

核心遊戲規則實作在 `src/domain/`：

- `reversi.rules.ts` 建立初始棋盤、驗證落子、翻轉棋子、計算棋子數、檢查遊戲結束條件並判定勝者。
- `reversi.types.ts` 定義棋盤、玩家、落子、遊戲狀態與模式相關型別。
- `reversi.serializer.ts` 負責棋盤序列化與反序列化，用於落子紀錄與本機保存。
- `reversi.ai.ts` 提供本機 AI 落子選擇邏輯。
- `reversi.evaluator.ts` 提供 AI 決策使用的棋盤評估邏輯。

Pinia 在 `src/stores/gameStore.ts` 協調應用程式狀態。Vue 元件透過 store 與 domain API 互動，不直接把黑白棋規則寫在 UI 裡。

## 目前範圍

目前專案支援本機遊玩與基本棋盤 UI。專案不包含帳號登入、線上多人、雲端同步、廣告、付款或外部 API 整合。

## 已知限制

- AI 為本機輕量實作，尚未追求高強度對弈。
- 原生行動裝置打包尚未作為 MVP 完整功能處理。
- 部分 UI 文字在正式釋出前可能仍需要整理在地化內容。
- 目前沒有線上多人模式，也沒有持久化資料庫後端。
