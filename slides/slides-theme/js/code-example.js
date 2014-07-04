;(function() {

var api = {
  reveal: forEachEl.bind(null,revealEl),
  revealAlongside: forEachEl.bind(null,revealAlongsideEl),
};

window.codeExamples = api;


// library

function revealEl(src) {
  var el = document.createElement("code");
  el.innerText = src.innerHTML;
  src.parentElement.insertBefore(el,src);
}

function revealAlongsideEl(src) {
  var wrap = document.createElement("div");
  wrap.className = "code-alongside-wrap";

  var div = document.createElement("div");
  div.innerHTML = src.innerHTML;
  var el = document.createElement("code");
  el.innerText = cleanWs(src.innerHTML);

  wrap.appendChild(el);
  wrap.appendChild(div);

  src.parentElement.insertBefore(wrap,src);
}

function cleanWs(src) {
  var lines = src.split("\n").filter(function(l) {
    return !/^\s*$/.test(l);
  });
  var wsLength = lines.map(function(l) {
    var ws = /^\s+(?=\S)/.exec(l);
    return ws ? ws[0].length : Infinity;
  });
  var trim = Math.min.apply(null,wsLength);
  return lines.map(function(x) {
    return x.slice(trim);
  }).join("\n");
}

function forEachEl(fn,selector) {
  [].forEach.call(document.querySelectorAll(selector),fn);
}


})();
