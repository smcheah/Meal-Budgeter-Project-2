/* eslint-disable quotes */
/* eslint-disable no-undef */
$(document).ready(function() {

    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(function(data) {
        if (data.username) {
            $(".member-name").text(data.username);
            $("#logout").show();
        } else {
            $("#logout").hide();
        }
    });

    $(".recipe-rating").each(function(i, item) {
        let rating = parseFloat(item.textContent);
        rating = Math.round(rating * 2) / 2;
        let output = [];
        for (let i = rating; i > 0; i--) {
            if (i === 0.5) {
                output.push(`<i class="fas fa-star-half-alt"></i>`);
            } else {
                output.push(`<i class="fas fa-star"></i>`);
            }
        }
        for (let i = (5 - rating); i >= 1; i--) {
            output.push(`<i class="far fa-star"></i>`);
        }
        item.innerHTML = output.join('');
    })

});