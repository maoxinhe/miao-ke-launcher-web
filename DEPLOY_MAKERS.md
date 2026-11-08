# 官网部署交接（launcher.camzy.tech · EdgeOne Makers）

## 一、本地已完成并推送

- 静态站源码仓：`maoxinhe/miao-ke-launcher-web`（public，`main`，最新提交 `13d5463`）。
- 纯静态 HTML/CSS/JS，**无构建命令**，输出目录为仓库根目录。
- 本轮已落地：
  - 四张客户端界面宣传图 `assets/screenshots/`（p1 启动 / p2 版本实例 / p3 模组加载器 / p4 下载中心），演示实例数据。
  - 仿 MSLX 版式重构：导航、split Hero、四组左右交错 mac-window 预览、六卡特性网格、下载卡、更新日志、FAQ 折叠、关于、页脚。
  - 云端对接 `GET https://auth.camzy.tech/api/launcher/check`：版本徽章、渠道/架构元信息、下载副标题、更新日志；`downloadUrl` 为空时隐藏下载按钮，不展示虚构入口；接口失败降级静态文案。
- 本地已用静态服务（`python3 -m http.server 8791`）逐区块核对：桌面端 Hero / 三组预览 / 特性 / 下载 / FAQ 展开 / 关于 / 页脚正常；390px 窄屏无横向溢出，导航收起、预览纵向、特性单列。

## 二、SDK / API 能力边界（已复核，勿重复尝试）

- 腾讯云 teo SDK `tencentcloud.teo.v20220901`（region `ap-guangzhou`）共 246 个方法，**没有**以下能力：
  - 创建 Makers / Pages 静态站点项目；
  - 静态文件上传 / 一键部署；
  - 给 Makers 项目绑定自定义域名。
- Pages 默认 zone 对当前 DNSPod/teo 密钥返回 `UnauthorizedOperation`。
- 现有安全加速站点（camzy.tech）下的 online 域名，CNAME 规律 `<sub>.camzy.tech.eo.dnse0.com`；**该规律不可套用到 Makers Pages 静态站**，Makers 分配的是另一组 CNAME 目标。
- 结论：Makers 项目创建、首次静态部署、自定义域名添加这三步当前只能在 EdgeOne 控制台人工完成；SDK 侧无法代做。

## 三、控制台人工步骤（拿到 Makers 分配的 CNAME 后再配 DNS）

1. 登录 EdgeOne 控制台 → **Makers（静态站点 / 站点托管）** → **创建项目 / 导入 Git 仓库**，授权并选择 `maoxinhe/miao-ke-launcher-web`。
2. 构建配置：构建命令留空；输出目录为仓库根目录。
3. 部署成功后在 **域名管理 → 自定义域名** 添加 `launcher.camzy.tech`，记录平台分配的 CNAME 目标（形如 `<id>.edgeone.app` 或平台指定域名）。
4. 证书由 EdgeOne 自动签发。

## 四、DNS 待办（DNSPod 托管 camzy.tech）

- 当前 `launcher` **无记录**（已复核 DescribeRecordList）；`www` / `auth` 走安全加速 `eo.dnse0.com`。
- 拿到 Makers 分配的 CNAME 目标后，用 DNSPod SDK（`tencentcloud.dnspod.v20210323`）：
  - `DescribeRecordList` 确认无重复 `launcher` 记录；
  - `CreateRecord` 添加 `launcher` CNAME → 平台分配目标，记录状态 ENABLE。
  - 若平台要求域名归属验证，补充 `_dnsauth.launcher` TXT 记录。
- 注意：CNAME 目标必须来自 Makers 项目创建后的平台分配值，不能套用安全加速的 `eo.dnse0.com`。

## 五、计费边界（保持免费）

- 不开启智能加速 / VAU、HTTP3(QUIC)、图片/视频即时处理、Bot 管理、中国大陆网络优化、DDoS 高防、日志分析等付费增值项。
- 官网为纯静态资源，优先由 EdgeOne Makers 承载，给 Cloudflare 减压；仅版本台账接口回源 `auth.camzy.tech`（EO 门面 → CF Worker）。

## 六、发布联动口径

- 安装包按 `CMY-Pro_打包日期_适用结构_版本.exe` 命名；发布流程：exe → 签名 → 改名 → 版本号上传云端台账 → 下放 GitHub / OneDrive → 云端推送更新。
- 台账 `launcher:release` 写入真实 `downloadUrl` 后，官网下载按钮与启动器更新弹窗才会出现下载入口；当前 `downloadUrl` 为空，入口隐藏。
- 版本号需同步：启动器前端常量、云端 API 台账、管理后台三处一致。
