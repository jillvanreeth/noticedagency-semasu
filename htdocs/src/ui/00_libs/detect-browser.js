;var detectBrowser = $(function() {

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    var $logo = $('.header__brand');
    var $logoIE = $('.header__ie');

    /**
     * IF the browser is IE, don't animate the logo
     * -- If animated the logo is not shown 🤷‍
     */
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        document.body.classList.add('ie-browser');
        $logo.addClass('hide');
        $logoIE.removeClass('hide');
    } else {
        document.body.classList.add('other-browser');
        $logo.removeClass('hide');
        $logoIE.addClass('hide');
    }
});

export { detectBrowser };