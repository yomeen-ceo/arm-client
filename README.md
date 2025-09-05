# Yomeen

yomeen at app engine

## Only for Google App Engine

### gcp切換帳號
```bash
gcloud auth login
```

### gcp切換至ifood專案
```bash
gcloud config set project i-food-project-v1
```

### 查詢gcp專案資訊
```bash
gcloud config list
```

### 如何更新子網域

#### 1、設定Google Cloud Platform 自訂網址
* App Engine
* 設定
* 自訂網址
* 新增自訂網域


#### 2、到Godaddy 管理dns

#### 3、更新 dispatch.yaml
* 更新 dispatch.yaml
* 執行 gcloud app deploy dispatch.yaml或 npm run dispatch

### Build the app for production

```bash
windows + R 開啟 DOS 視窗
cd \GAE_iCoin\set  GAE-order路徑
npm run build
copy app.yaml functions\set\dist
cd functions\set\dist
gcloud app deploy -q
```

