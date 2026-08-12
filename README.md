# 世勢觀察靜態部落格

這是一個可直接開啟的「分析型部落格 + 世勢電子報」原型，不需要安裝 npm、框架或伺服器。

## 檔案

- `index.html`：首頁，包含主文、最新文章、專題入口、Start Here 與訂閱表單。
- `posts/weekly-brief.html`：示範文章頁。
- `assets/css/styles.css`：全站樣式。
- `assets/js/subscribe.js`：訂閱表單前端互動，目前用 localStorage 模擬成功狀態。
- `assets/images/`：已安裝的部落格視覺資源。
- `resources/editorial-plan.md`：內容定位、欄目與發刊節奏。
- `resources/newsletter-template.html`：可複用的電子報 HTML 模板。

## 預覽

直接用瀏覽器開啟：

`/home/cathome/AI@Agent/CODEX/worldview-blog/index.html`

## GitHub Pages

這個資料夾已包含 GitHub Pages workflow：

`.github/workflows/pages.yml`

推送到 GitHub repo 的 `main` 分支後，在 repo 的 Settings > Pages 選擇 GitHub Actions 作為來源，即可由 workflow 發布。

## 正式接訂閱服務

目前表單不會真的送到外部服務。正式上線時可替換 `assets/js/subscribe.js` 的 submit 行為，或把 HTML form 改成以下服務提供的 form action：

- Substack
- Buttondown
- Mailchimp
- 自架 API
