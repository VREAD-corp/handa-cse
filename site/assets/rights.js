/* Privacy requests (R.A. 10173): POST to the Handa CSE Apps Script. */
(function () {
  var f = document.getElementById('rights'); if (!f) return;
  var msg = document.getElementById('rights-msg');
  var EP = 'https://script.google.com/macros/s/AKfycby4di9DZaiESNkujLeJtDkmL6JPXDNV9aQoXAEhDmCCtrKG205rHYL_yoKfT4cqHtmi6g/exec';
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = f.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email)) { msg.className = 'msg err'; msg.textContent = 'Enter the e-mail you signed up with.'; return; }
    var b = f.querySelector('button[type=submit]'); b.disabled = true;
    fetch(EP, { method: 'POST', credentials: 'omit', body: JSON.stringify({ action: 'rights', email: email, type: f.type.value, message: f.message.value, website: f.website.value }) })
      .then(function (r) { return r.json(); }).then(function (r) {
        if (!r.ok) throw new Error(r.error);
        msg.className = 'msg ok';
        msg.textContent = r.status === 'done_automatically' ? (r.matched ? 'Done. Your e-mail was removed from the list.' : 'Done. This e-mail was not on the list.') : 'Received. We reply by e-mail within 15 days.';
        f.reset(); b.disabled = false;
      }).catch(function () { b.disabled = false; msg.className = 'msg err'; msg.innerHTML = 'Not sent. Please e-mail <a href="mailto:octave@vread.fr">octave@vread.fr</a> instead.'; });
  });
})();
