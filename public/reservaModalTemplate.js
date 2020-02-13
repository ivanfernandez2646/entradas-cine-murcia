function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_match_html=/["&<>]/;function reservaModalCompiled(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (butacasPorFila, pase) {pug_html = pug_html + "\u003Cdiv class=\"modal-dialog modal-dialog-centered\" role=\"document\"\u003E\u003Cdiv class=\"modal-content\"\u003E\u003Cdiv class=\"modal-header\"\u003E\u003Ch5 class=\"modal-title\" id=\"exampleModalLabel\"\u003EReserva de butacas\u003C\u002Fh5\u003E\u003Cbutton class=\"close\" type=\"button\" data-dismiss=\"modal\" aria-label=\"Close\"\u003E\u003Cspan aria-hidden=\"true\"\u003E&times;\u003C\u002Fspan\u003E\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"modal-body p-0\"\u003E\u003Cdiv class=\"modal-body p-20\"\u003E\u003Ch5\u003E" + (pug_escape(null == (pug_interp = pase.titulo) ? "" : pug_interp)) + "\u003Cspan class=\"badge badge-primary ml-1 mr-1\"\u003ESala " + (pug_escape(null == (pug_interp = pase.sala) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"badge badge-warning mr-1\"\u003E" + (pug_escape(null == (pug_interp = pase.cine) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"badge badge-danger mr-1\"\u003E" + (pug_escape(null == (pug_interp = pase.hora) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fh5\u003E\u003Cdiv class=\"d-flex justify-content-center mt-4\"\u003E\u003Ctable\u003E\u003Ctbody id=\"tableButacasBody\"\u003E";
let numButaca = 1;
let row = 1;
while (row < pase.filas) {
pug_html = pug_html + "\u003Ctr\u003E";
var butacaFila = 0;
while (butacaFila < butacasPorFila) {
butacaFila++
var esButacaReservada = false;
// iterate pase.reservadas
;(function(){
  var $$obj = pase.reservadas;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var numButacaReservada = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv id=\"numButacaReservada\"\u003E";
if (numButacaReservada == numButaca) {
esButacaReservada = true;
{
pug_html = pug_html + "\u003Ctd" + (" bgcolor=\"#FF0000\""+pug_attr("id", numButaca, true, false)) + "\u003E\u003Cimg src=\"img\u002FbutacaCine.png\" alt=\"\" height=\"25\" width=\"25\"\u002F\u003E\u003C\u002Ftd\u003E";
}
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var numButacaReservada = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv id=\"numButacaReservada\"\u003E";
if (numButacaReservada == numButaca) {
esButacaReservada = true;
{
pug_html = pug_html + "\u003Ctd" + (" bgcolor=\"#FF0000\""+pug_attr("id", numButaca, true, false)) + "\u003E\u003Cimg src=\"img\u002FbutacaCine.png\" alt=\"\" height=\"25\" width=\"25\"\u002F\u003E\u003C\u002Ftd\u003E";
}
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003Cdiv id=\"esButacaReservada\"\u003E";
if (esButacaReservada == false) {
pug_html = pug_html + "\u003Ctd" + (" class=\"noReservada\""+" bgcolor=\"#00FF00\""+pug_attr("id", numButaca, true, false)) + "\u003E\u003Cimg src=\"img\u002FbutacaCine.png\" alt=\"\" height=\"25\" width=\"25\"\u002F\u003E\u003C\u002Ftd\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
numButaca++
}
pug_html = pug_html + "\u003C\u002Ftr\u003E";
row++
}
pug_html = pug_html + "\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003Cp class=\"p text-center text-white bg-info mb-0\"\u003EPantalla\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"modal-footer\"\u003E\u003Cp\u003EElegidas \u003Cspan id=\"cantidadButacas\"\u003E0 butacas.\u003C\u002Fspan\u003E\u003C\u002Fp\u003E\u003Cbutton class=\"btn btn-secondary\" type=\"button\" data-dismiss=\"modal\"\u003ECancelar\u003C\u002Fbutton\u003E\u003Cbutton class=\"btn btn-primary\" type=\"button\" id=\"btnConfirmar\"\u003EConfirmar\u003C\u002Fbutton\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"butacasPorFila" in locals_for_with?locals_for_with.butacasPorFila:typeof butacasPorFila!=="undefined"?butacasPorFila:undefined,"pase" in locals_for_with?locals_for_with.pase:typeof pase!=="undefined"?pase:undefined));;return pug_html;}