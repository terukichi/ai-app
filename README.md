# AI-APP

<div align="center">
  <a href="https://skillicons.dev">
    <img
      alt="python"
      src="https://img.shields.io/badge/backend-FastAPI-blue"
      />
    <img
      alt="react"
      src="https://img.shields.io/badge/frontend-React-skyblue"
      />
  </a>
</div>

## Summary

入力画像を分類するWebアプリです。

## Installation

### Backend

1. 仮想環境の作成

   ```bash
   python3 -m venv .venv
   ```

2. 仮想環境の有効化

   ```bash
   source .venv/bin/activate
   ```

   or

   ```bash
   .venv\Scripts\activate
   ```

3. ライブラリのインストール

   ```bash
   pip install -r requirements.txt
   ```

4. モデルの作成

   ```bash
   python3 create_model.py
   ```

> [!note]
> Runtime Error となる場合
>
> `create_model.py`で`num_workers`の値を`0`などに変更すると解決することがある

5. サーバーの起動

   ```bash
   uvicorn main:app --reload
   ```

### Frontend

1. サーバーの起動

   ```bash
   npm run dev
   ```
