function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_attrs(t,r){var a="";for(var s in t)if(pug_has_own_property.call(t,s)){var u=t[s];if("class"===s){u=pug_classes(u),a=pug_attr(s,u,!1,r)+a;continue}"style"===s&&(u=pug_style(u)),a+=pug_attr(s,u,!1,r)}return a}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_merge(e,r){if(1===arguments.length){for(var t=e[0],g=1;g<e.length;g++)t=pug_merge(t,e[g]);return t}for(var l in r)if("class"===l){var n=e[l]||[];e[l]=(Array.isArray(n)?n:[n]).concat(r[l]||[])}else if("style"===l){var n=pug_style(e[l]);n=n&&";"!==n[n.length-1]?n+";":n;var a=pug_style(r[l]);a=a&&";"!==a[a.length-1]?a+";":a,e[l]=n+a}else e[l]=r[l];return e}
function pug_style(r){if(!r)return"";if("object"==typeof r){var t="";for(var e in r)pug_has_own_property.call(r,e)&&(t=t+e+":"+r[e]+";");return t}return r+""}function cardViewPeliculaCompiled(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (pases) {var delayPaseScale = 0.07;
// iterate pases
;(function(){
  var $$obj = pases;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var pase = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv" + (" class=\"card flex-row text-break  m-3 border-primary cardPelicula\""+pug_attr("style", pug_style("width: 315px; min-height: 200px; animation: scaleCard 0.8s "+delayPaseScale+"s forwards;"), true, false)) + "\u003E\u003Cdiv class=\"card\" id=\"divPoster\" style=\"width: 50%; height: 100%;\"\u003E\u003Cimg" + (pug_attrs(pug_merge([{"class": "rounded","alt": "Imagen Película","style": "width: 100%; height: 100%;"},{'src': pase.poster}]), false)) + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"card-block px-2 m-2\" style=\"width: 65%; height: 100%;\"\u003E\u003Ch5 class=\"card-title\"\u003E" + (pug_escape(null == (pug_interp = pase.titulo) ? "" : pug_interp)) + "\u003C\u002Fh5\u003E\u003Cp class=\"text-wrap\"\u003E\u003Cp class=\"card-text font-weight-light\" id=\"salaCine\"\u003ESala " + (pug_escape(null == (pug_interp = pase.sala) ? "" : pug_interp)) + " - " + (pug_escape(null == (pug_interp = pase.cine) ? "" : pug_interp)) + "\u003Cp class=\"font-weight-bold\"\u003E  \u003C\u002Fp\u003E\u003C\u002Fp\u003E\u003C\u002Fp\u003E";
// iterate pase.horas                 
;(function(){
  var $$obj = pase.horas                 ;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var hora = $$obj[pug_index1];
pug_html = pug_html + "\u003Ca class=\"btn btn-primary m-1 btHora\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = hora) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var hora = $$obj[pug_index1];
pug_html = pug_html + "\u003Ca class=\"btn btn-primary m-1 btHora\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = hora) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
delayPaseScale = delayPaseScale + 0.07
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var pase = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv" + (" class=\"card flex-row text-break  m-3 border-primary cardPelicula\""+pug_attr("style", pug_style("width: 315px; min-height: 200px; animation: scaleCard 0.8s "+delayPaseScale+"s forwards;"), true, false)) + "\u003E\u003Cdiv class=\"card\" id=\"divPoster\" style=\"width: 50%; height: 100%;\"\u003E\u003Cimg" + (pug_attrs(pug_merge([{"class": "rounded","alt": "Imagen Película","style": "width: 100%; height: 100%;"},{'src': pase.poster}]), false)) + "\u002F\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"card-block px-2 m-2\" style=\"width: 65%; height: 100%;\"\u003E\u003Ch5 class=\"card-title\"\u003E" + (pug_escape(null == (pug_interp = pase.titulo) ? "" : pug_interp)) + "\u003C\u002Fh5\u003E\u003Cp class=\"text-wrap\"\u003E\u003Cp class=\"card-text font-weight-light\" id=\"salaCine\"\u003ESala " + (pug_escape(null == (pug_interp = pase.sala) ? "" : pug_interp)) + " - " + (pug_escape(null == (pug_interp = pase.cine) ? "" : pug_interp)) + "\u003Cp class=\"font-weight-bold\"\u003E  \u003C\u002Fp\u003E\u003C\u002Fp\u003E\u003C\u002Fp\u003E";
// iterate pase.horas                 
;(function(){
  var $$obj = pase.horas                 ;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var hora = $$obj[pug_index2];
pug_html = pug_html + "\u003Ca class=\"btn btn-primary m-1 btHora\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = hora) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var hora = $$obj[pug_index2];
pug_html = pug_html + "\u003Ca class=\"btn btn-primary m-1 btHora\" href=\"#\"\u003E" + (pug_escape(null == (pug_interp = hora) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
delayPaseScale = delayPaseScale + 0.07
    }
  }
}).call(this);
}.call(this,"pases" in locals_for_with?locals_for_with.pases:typeof pases!=="undefined"?pases:undefined));;return pug_html;}