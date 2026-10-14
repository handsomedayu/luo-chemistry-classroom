(()=>{
const mode=matchMedia('(pointer:coarse) and (max-width:1000px)'),bar=document.createElement('nav'),hint=document.createElement('p');bar.className='mobile-controls';bar.setAttribute('aria-label','手机课堂控制');
bar.innerHTML='<a href="../" aria-label="返回五章首页">首页</a>'+[['prev','前页'],['back','回退'],['step','分步'],['play','播放'],['reset','重播'],['next','后页']].map(([id,label])=>`<button data-control="${id}"${id==='step'?' class="primary"':''}>${label}</button>`).join('');hint.className='rotate-tip';hint.textContent='建议横屏观看，内容更清晰。可用底部按钮分步演示。';document.body.append(bar,hint);
bar.onclick=e=>{const b=e.target.closest('[data-control]');if(b)document.getElementById(b.dataset.control).click()};
const syncMobile=()=>{for(const b of bar.querySelectorAll('button')){const original=document.getElementById(b.dataset.control);b.disabled=original.disabled;b.hidden=original.hidden;if(b.dataset.control==='play')b.textContent=original.textContent==='暂停'?'暂停':'播放'}};
new MutationObserver(syncMobile).observe(document.querySelector('footer'),{subtree:true,attributes:true,childList:true,characterData:true});syncMobile();
function fitMobile(){if(!mode.matches){fit();return}const h=innerHeight-bar.getBoundingClientRect().height,w=innerWidth,s=Math.min(w/1600,h/900),stage=document.getElementById('stage');Object.assign(stage.style,{transform:`scale(${s})`,left:(w-1600*s)/2+'px',top:(h-900*s)/2+'px'})}
addEventListener('resize',fitMobile);mode.addEventListener('change',fitMobile);visualViewport?.addEventListener('resize',fitMobile);fitMobile();
const full=document.getElementById('fullscreen');full.addEventListener('click',()=>{if(mode.matches&&!document.documentElement.requestFullscreen){hint.textContent='当前浏览器不支持网页全屏，请将手机横屏观看。';hint.style.display='block';setTimeout(()=>{hint.style.display='';hint.textContent='建议横屏观看，内容更清晰。可用底部按钮分步演示。'},4000)}});
})();
