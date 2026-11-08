# 喵科启动器官网（launcher.camzy.tech）

喵科启动器官方介绍与下载入口静态站点，部署于 **EdgeOne Makers**（优先 EdgeOne 承载，给 Cloudflare 减压）。

## 目录结构

```
launcher-web/
├── index.html        # 首页（Hero / 界面预览 / 特性 / 下载 / 日志 / FAQ / 关于）
├── css/style.css     # 品牌样式（粉色 #ec5c83，响应式）
├── js/main.js        # 拉取云端版本台账，渲染版本号 / 更新日志 / 下载入口；FAQ 折叠
└── assets/
    ├── app-icon.png                 # 启动器图标
    └── screenshots/                  # 客户端界面宣传图（本地启动器 SPA 截取）
        ├── p1-launch.png            # 启动页
        ├── p2-instances.png          # 版本与实例
        ├── p3-mods.png              # 模组与加载器
        └── p4-download.png          # 下载中心（版本 / 模组 / 资源 / 光影 / Java）
```

## 本地预览

```bash
python3 -m http.server 8791
# 浏览器打开 http://127.0.0.1:8791/index.html
```

## 数据对接

- 版本号、更新日志、下载地址均来自云端台账，前端只读拉取：
  - `GET https://auth.camzy.tech/api/launcher/check`
- 台账在用户中心「启动器版本」后台维护；`downloadUrl` 为空时官网不展示下载按钮，仅提示安装包待发布，不展示虚构入口。
- 云端只读接口已放开跨域（CORS `*`，GET/OPTIONS）。

## 界面截图

`assets/screenshots/` 三张图为本地启动器前端在演示实例数据下截取，用于展示界面布局与分区；图内实例名、模组列表均为演示内容，不代表线上真实账号或存档。

## EdgeOne Makers 部署

1. 登录 EdgeOne 控制台 → **Makers** → **创建项目** → **导入 Git 仓库**，授权并选择本仓库。
2. 构建配置：无构建命令，输出目录为仓库根目录（静态 HTML/CSS/JS）。
3. 部署后在 **域名管理 → 自定义域名** 添加 `launcher.camzy.tech`，按指引配置 CNAME。
4. DNS（DNSPod 托管 `camzy.tech`）：按 Makers 分配的 CNAME 目标添加 `launcher` 记录；如平台要求归属验证，补充 `_dnsauth.launcher` TXT 记录。
5. 证书由 EdgeOne 自动签发。

## 计费边界

保持免费，不开启智能加速 / VAU、QUIC、媒体处理、Bot 管理等付费增值项。
