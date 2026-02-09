# 宗师之路 PWA 安装指南

## 🎯 什么是 PWA？

PWA (Progressive Web App) 是一种可以像原生应用一样安装到设备上的网页应用。安装后，你可以：

- ✅ 从主屏幕直接启动（像普通 App 一样）
- ✅ 离线访问（没有网络也能查看内容）
- ✅ 接收推送通知（提醒你完成每日任务）
- ✅ 全屏体验（没有浏览器地址栏）
- ✅ 更快的加载速度（使用缓存）

## 📱 如何安装

### 在 Android 手机上：

1. 使用 Chrome 浏览器打开网站
2. 点击右上角的"⋮"菜单
3. 选择"添加到主屏幕"或"安装应用"
4. 点击"安装"确认

### 在 iPhone/iPad 上：

1. 使用 Safari 浏览器打开网站
2. 点击底部的"分享"按钮（方框带箭头）
3. 向下滚动，选择"添加到主屏幕"
4. 点击"添加"确认

### 在 Windows/Mac 电脑上：

1. 使用 Chrome 或 Edge 浏览器打开网站
2. 点击地址栏右侧的"安装"图标（➕）
3. 点击"安装"确认

## 🛠️ 开发者设置步骤

### 1. 生成图标

1. 在浏览器中打开 `create-icons.html`
2. 点击"生成所有图标"按钮
3. 创建 `icons` 文件夹
4. 将下载的所有图标文件放入 `icons` 文件夹

### 2. 文件结构

确保你的项目包含以下文件：

```
project/
├── index.html
├── styles.css
├── script.js
├── manifest.json
├── service-worker.js
├── icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   └── icon-512x512.png
└── README-PWA.md
```

### 3. 部署到服务器

PWA 需要 HTTPS 才能正常工作（localhost 除外）。你可以使用：

- **GitHub Pages**（免费，自动 HTTPS）
- **Netlify**（免费，自动 HTTPS）
- **Vercel**（免费，自动 HTTPS）
- 自己的服务器（需要配置 SSL 证书）

#### GitHub Pages 部署步骤：

1. 创建 GitHub 仓库
2. 上传所有文件
3. 进入仓库设置 → Pages
4. 选择分支（通常是 main）
5. 点击保存
6. 等待几分钟，访问提供的 URL

### 4. 测试 PWA

1. 在 Chrome 中打开开发者工具（F12）
2. 切换到"Application"标签
3. 检查：
   - Manifest：确保所有信息正确
   - Service Workers：确保已注册并激活
   - Cache Storage：确保文件已缓存

### 5. 验证 PWA

使用 Lighthouse 进行 PWA 审计：

1. 打开 Chrome 开发者工具
2. 切换到"Lighthouse"标签
3. 选择"Progressive Web App"
4. 点击"Generate report"
5. 查看评分和建议

## 🔧 自定义配置

### 修改主题颜色

在 `manifest.json` 中修改：

```json
"theme_color": "#ff6b35",
"background_color": "#f5f5f5"
```

### 修改应用名称

在 `manifest.json` 中修改：

```json
"name": "你的应用名称",
"short_name": "短名称"
```

### 修改缓存策略

在 `service-worker.js` 中修改 `urlsToCache` 数组，添加或删除需要缓存的文件。

## 📊 功能特性

### 已实现：

- ✅ 离线访问
- ✅ 安装到主屏幕
- ✅ 自定义安装提示
- ✅ 缓存策略
- ✅ 响应式设计
- ✅ 主题颜色
- ✅ 启动画面

### 可扩展：

- 🔔 推送通知（需要后端支持）
- 🔄 后台同步（需要后端支持）
- 📍 地理位置（如果需要）
- 📷 相机访问（如果需要）

## 🐛 常见问题

### Q: 为什么安装按钮不显示？

A: 确保：
1. 网站使用 HTTPS（或在 localhost）
2. manifest.json 文件正确
3. Service Worker 已注册
4. 浏览器支持 PWA

### Q: 为什么离线不工作？

A: 检查：
1. Service Worker 是否已激活
2. 文件是否已缓存
3. 浏览器控制台是否有错误

### Q: 如何更新 PWA？

A: 
1. 修改 `service-worker.js` 中的 `CACHE_NAME`（如 'grandmaster-v2'）
2. 用户下次访问时会自动更新

### Q: 如何卸载 PWA？

A: 
- Android：长按图标 → 卸载
- iOS：长按图标 → 删除应用
- 桌面：在应用设置中卸载

## 📚 更多资源

- [PWA 官方文档](https://web.dev/progressive-web-apps/)
- [Service Worker API](https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API)
- [Web App Manifest](https://developer.mozilla.org/zh-CN/docs/Web/Manifest)

## 🎉 完成！

现在你的"宗师之路"网站已经是一个完整的 PWA 了！用户可以将它安装到手机或电脑上，随时追踪自己的进化之路。

---

**祝你在宗师之路上一路前行！** 💪🔥
