// ==UserScript==
// @name         广告加速器
// @version      0.1
// @description  超快的广告加速器
// @author       You
// @icon    https://favicon.yandex.net/favicon/youtube.com
// @run-at       document-end
// @include      *
// @grant        unsafeWindow
// ==/UserScript==
function checkIS_H5Page() {
  return !!unsafeWindow._h5Player
}

function changeVideoSpeed(speed = 1) {
  unsafeWindow._h5Player.setPlaybackRate(speed, true)
}

function addStyle(css) { //添加CSS的代码--copy的--注意里面必须是双引号
  var pi = document.createProcessingInstruction(
    'xml-stylesheet',
    'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"'
  );
  return document.insertBefore(pi, document.documentElement);
}

function bindEvent(event) {
  if (isEditableTarget(event.target)) return
  const keyCode = event.key.toLowerCase()
  switch (keyCode) {
    case '0':
    case '1':
      // 恢复默认速度
      changeVideoSpeed(1)
      break
    case '2':
      changeVideoSpeed(2)
      break
    case '3':
      changeVideoSpeed(4)
      break
    default:
      return
  }
  event.stopPropagation()
  event.preventDefault()
  return true
}

function isEditableTarget (htmlTarget) {
  const isEditable = htmlTarget.getAttribute && htmlTarget.getAttribute('contenteditable') === 'true';
  const isInputDom = /INPUT|TEXTAREA|SELECT/.test(htmlTarget.nodeName);
  return isEditable || isInputDom
}

function safeFunction(func) {
  try{
    func()
  }catch (e){}
}

function removeYoutubeAds() {
  function removeTipAds() {
    safeFunction(() => {
      document.querySelector('.ytp-ad-skip-button-text').click()
    })
  }
  function clickSkipAds() {
    safeFunction(() => {
      document.querySelector('.ytp-ad-skip-button-text').click()
    })
  }

  setInterval(() => {
    removeTipAds()
    clickSkipAds()
  }, 800)
  addStyle('.video-ads{display: none;}')
}

if(checkIS_H5Page) {
  document.addEventListener('keypress', bindEvent)
}
removeYoutubeAds()
