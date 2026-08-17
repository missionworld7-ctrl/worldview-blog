# 世勢觀察靜態部落格

這是一個可直接開啟的「分析型部落格 + 世勢電子報」原型。訂閱表單會保留瀏覽器端記錄，並在 API 可用時同步到寄送清單。

## 檔案

- `index.html`：首頁，包含主文、最新文章、專題入口、Start Here 與訂閱表單。
- `posts/weekly-brief.html`：示範文章頁。
- `assets/css/styles.css`：全站樣式。
- `assets/js/subscribe.js`：訂閱表單前端互動，會保留 localStorage，並嘗試同步到訂閱 API。
- `assets/images/`：已安裝的部落格視覺資源。
- `reports/weekly-sunzi.html`：世勢週報，孫子兵法詮釋版。
- `reports/monthly-sunzi.html`：世勢月報，孫子兵法詮釋版。
- `resources/editorial-plan.md`：內容定位、欄目與發刊節奏。
- `resources/newsletter-template.html`：可複用的電子報 HTML 模板。

## 預覽

直接用瀏覽器開啟：

`/home/cathome/AI@Agent/CODEX/worldview-blog/index.html`

目前 GitHub Pages 版會將訂閱同步到：

`https://hp-codex.tail066c5b.ts.net/api/subscribe`

## GitHub Pages

這個資料夾已包含 GitHub Pages workflow：

`.github/workflows/pages.yml`

推送到 GitHub repo 的 `main` 分支後，在 repo 的 Settings > Pages 選擇 GitHub Actions 作為來源，即可由 workflow 發布。

## 正式接訂閱服務

表單會先存在訪客瀏覽器 localStorage，並嘗試送到訂閱 API。若 API 暫時不可用，瀏覽器端仍會暫存；訪客下次回訪且 API 可用時，尚未同步的 Email 會自動同步。

- Substack
- Buttondown
- Mailchimp
- 自架 API
