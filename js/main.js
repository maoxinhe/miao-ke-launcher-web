/* 喵科启动器官网：版本号 / 更新日志 / 下载入口对接云端台账（auth.camzy.tech） */
(function () {
  var CLOUD_BASE = 'https://auth.camzy.tech';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function setText(id, txt) {
    var el = document.getElementById(id);
    if (el) el.textContent = txt;
  }

  function renderDownload(info) {
    var actions = document.getElementById('dlActions');
    var sub = document.getElementById('dlSub');
    if (!actions) return;
    var latest = info && info.latest;
    if (sub) sub.textContent = latest ? '最新版本 v' + latest : '最新版本以云端台账为准。';

    if (info && info.downloadUrl) {
      actions.innerHTML =
        '<a class="btn btn-primary dl-link" href="' + esc(info.downloadUrl) + '" target="_blank" rel="noopener">' +
        '前往下载</a>';
    } else {
      actions.innerHTML = '<span class="dl-pending">安装包发布后将在此提供下载入口</span>';
    }
  }

  function renderChangelog(info) {
    var box = document.getElementById('changelogBox');
    if (!box) return;
    var latest = info && info.latest;
    var log = info && info.changelog;
    if (!log) {
      box.innerHTML = '<div class="empty">暂无更多版本说明。</div>';
      return;
    }
    box.innerHTML =
      '<div class="cl-item"><h4>v' + esc(latest || '') +
      '<span class="cl-tag">最新</span></h4><p>' + esc(log) + '</p></div>';
  }

  function apply(info) {
    if (info && info.latest) {
      setText('versionBadge', '最新版本 v' + info.latest);
      var meta = [];
      if (info.channel) meta.push('频道 ' + info.channel);
      if (info.arch) meta.push('架构 ' + info.arch);
      setText('heroMeta', meta.length ? meta.join(' · ') : '');
    }
    renderDownload(info);
    renderChangelog(info);
  }

  fetch(CLOUD_BASE + '/api/launcher/check')
    .then(function (r) { return r.json(); })
    .then(function (info) { apply(info || {}); })
    .catch(function () {
      // 云端不可达时降级为静态文案，不展示虚构版本或下载入口
      renderDownload(null);
      renderChangelog(null);
    });
})();
