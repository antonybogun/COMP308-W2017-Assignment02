/*
 *   File-name: app.js
 *   Author's name: Tony Bogun   
 *   Web-site name: antonybogun2.herokuapp.com
 *   File description: Custom JS goes here
 */

// delete confirmation window implementation
(function () {
    $(".btn-danger").click(function (event) {
        if (!confirm("Are you sure?")) {
            event.preventDefault();
            window.location.assign("/contacts");
        }
    });

    /* pagination code */
    $('#myTable').pageMe({
        pagerSelector: '#myPager',
        showPrevNext: true,
        hidePageNumbers: false,
        perPage: 6
    });
})();