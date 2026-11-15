# 拾启｜LumeStart 官网（launcher.camzy.tech）

官方介绍与下载入口，纯静态、无构建命令，部署于 **EdgeOne Makers**。

## 目录结构

```
.
├── index.html          # 单文件官网（内联 CSS / SVG，无外部 JS 依赖）
├── assets/
│   ├── ui-settings.png # 设置页（Hero）
│   ├── ui-download.png # 下载中心
│   └── ui-network.png  # 多人联机
├── legacy-2026-11/     # 旧版粉色站，仅留档，不参与部署
├── DEPLOY_MAKERS.md    # Makers 部署步骤与能力边界
└── README.md
```

## 本地预览

```bash
python3 -m http.server 8791
# 打开 http://127.0.0.1:8791/index.html
```

## 内容口径

- 品牌名固定为「拾启｜LumeStart」，进程名与发布产物保持 `LumeStart.exe` / `LumeStart_<YYMMDD>_x64_<序号>.zip`。
- 不出现管理后台域名；技术形态写明「.NET 8 WPF、无 WebView2、无网页层」。
- 下载入口指向公开发布仓库 `MaoKeDei/launcher_v1` 的 Releases，不放直链，避免包名/哈希变更后失效。
- 三张界面图为**设计还原稿**，图注已标明，不作为实机截图使用。
- 版本号与 build 为静态文案，发版时同步更新（1.1.0 / build 38）。

## EdgeOne Makers 部署

见 `DEPLOY_MAKERS.md`。要点：无构建命令、输出目录为仓库根目录；创建项目与绑定自定义域名仍需在控制台完成。
