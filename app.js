(() => {
 'use strict';
 const $=(s,root=document)=>root.querySelector(s);
 const dialog=$('#info-dialog'), body=$('#dialog-body');
 const data={
 performance:`<p class="section-label">Nos performances</p><h2 class="dialog-heading" id="dialog-title">Une portée qui dépasse notre réseau.</h2><div class="metrics"><div class="metric"><strong>283 696</strong><span>Impressions</span></div><div class="metric"><strong>184 545</strong><span>Membres touchés</span></div><div class="metric"><strong>98 %</strong><span>Impressions hors réseau</span></div></div><p class="small-note">Source : captures des statistiques LinkedIn du 15 octobre 2026, période affichée de 365 jours. Une impression est un affichage, pas une personne distincte. Résultats historiques, sans garantie de portée pour une prestation.</p>`,
 audience:`<p class="section-label">Une audience qualifiée</p><h2 class="dialog-heading" id="dialog-title">Des profils au cœur de l’économie.</h2><div class="audience-chart"><svg class="audience-donut" viewBox="0 0 240 240" role="img" aria-labelledby="chart-title chart-desc"><title id="chart-title">Répartition des niveaux hiérarchiques de l’audience</title><desc id="chart-desc">34 % expérimentés, 27 % management, direction et propriétaires, 24 % premier emploi et 15 % de catégories non détaillées dans la capture.</desc><g transform="rotate(-90 120 120)" fill="none" stroke-width="34"><circle cx="120" cy="120" r="90" stroke="#e6ecf3"/><circle class="chart-segment" cx="120" cy="120" r="90" pathLength="100" stroke="#071a32" data-value="34" stroke-dasharray="0 100"/><circle class="chart-segment" cx="120" cy="120" r="90" pathLength="100" stroke="#0765df" data-value="27" stroke-dashoffset="-34" stroke-dasharray="0 100"/><circle class="chart-segment" cx="120" cy="120" r="90" pathLength="100" stroke="#83b5f2" data-value="24" stroke-dashoffset="-61" stroke-dasharray="0 100"/></g><text x="120" y="115" text-anchor="middle">Audience</text><text class="chart-subtitle" x="120" y="137" text-anchor="middle">LinkedIn</text></svg><ul class="legend"><li><i style="background:#071a32"></i><strong>34 %</strong> Professionnels expérimentés</li><li><i style="background:#0765df"></i><strong>27 %</strong> Management, direction et propriétaires*</li><li><i style="background:#83b5f2"></i><strong>24 %</strong> Premier emploi</li><li><i style="background:#e6ecf3"></i><strong>15 %</strong> Catégories non détaillées</li></ul></div><p class="small-note">*Managers 9 %, directeurs 8 %, PDG 5 %, propriétaires 3 % et vice-présidents 2 %. Somme des pourcentages arrondis affichés par LinkedIn. Le solde de 15 % correspond aux catégories non visibles, et non à une catégorie LinkedIn identifiée.</p><p class="small-note">Source : statistiques d’audience transmises le 15 octobre 2026. Cette répartition ne décrit pas l’ensemble des 184 545 membres touchés par les contenus.</p>`,
 linkedin:`<p class="section-label">Reconnaissance éditoriale</p><h2 class="dialog-heading" id="dialog-title">Pulse Média sélectionné par LinkedIn Actualités</h2><img src="assets/linkedin-original.jpg" width="1237" height="1536" alt="Visuel de sélection LinkedIn Actualités transmis par Pulse Média" class="proof-full"><p class="small-note">Visuel fourni par Pulse Média. Cette sélection concerne une publication ; elle ne constitue pas un partenariat officiel avec LinkedIn.</p>`
 };
 const reduced=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
 let trigger=null,closing=false;
 function closeDialog(){if(!dialog?.open||closing)return;closing=true;dialog.classList.add('closing');const finish=()=>{dialog.close();dialog.classList.remove('closing');trigger?.setAttribute('aria-expanded','false');trigger?.focus();closing=false;};if(reduced())finish();else window.setTimeout(finish,280);}
 document.querySelectorAll('[data-dialog]').forEach(el=>el.addEventListener('click',()=>{
  if(!dialog||!body||dialog.open)return;const content=data[el.dataset.dialog];if(!content)return;
  trigger=el;body.innerHTML=content;dialog.showModal();el.setAttribute('aria-expanded','true');$('.dialog-close',dialog)?.focus();
  requestAnimationFrame(()=>requestAnimationFrame(()=>dialog.querySelectorAll('.chart-segment').forEach(seg=>{seg.style.strokeDasharray=seg.dataset.value+' 100';})));
 }));
 if(dialog){$('.dialog-close',dialog).addEventListener('click',closeDialog);dialog.addEventListener('cancel',e=>{e.preventDefault();closeDialog();});dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog();});}
 const form=$('#contact-form');if(!form)return;
 const select=$('select[name="prestation"]',form),submit=$('[type="submit"]',form),status=$('#form-status');
 const requested=new URLSearchParams(location.search).get('prestation');
 if(requested&&[...select.options].some(o=>o.value===requested))select.value=requested;
 submit.disabled=false;
 status.textContent='Votre demande ouvrira votre application e-mail. Vous devrez confirmer son envoi.';
 form.addEventListener('submit', event=>{
  event.preventDefault();
  if(!form.reportValidity())return;
  const d=new FormData(form);
  if(!$('#consent',form).checked)return;
  const subject='Contact Pulse Média — '+(d.get('prestation')||'Demande de renseignement');
  const body=[
   'Bonjour Pulse Média,','',
   'Nom : '+d.get('nom'),
   'Entreprise : '+d.get('entreprise'),
   'E-mail de réponse : '+d.get('email'),
   'Prestation : '+d.get('prestation'),'',
   'Projet :',d.get('message'),'','Bien cordialement.'
  ].join('\n');
  status.textContent='Votre application e-mail devrait s’ouvrir avec la demande préremplie. Vérifiez les informations puis appuyez sur Envoyer. Aucun message n’est envoyé automatiquement par ce site.';
  const mailto='mailto:pulse.instacontact@gmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  window.location.href=mailto;
 });
})();
