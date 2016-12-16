function openModal(id) {
    var thisModal = document.getElementById(id);
    thisModal.style.display = "block";

}

$(".userName").hover(function () {
    $(this).css("color", "green");
}), function () {
    $(this).css("color", "black");
}