let modal = {};
modal.show = id => {
    document.getElementById(id).style.display = "block";
}
modal.hide = id => {
    document.getElementById(id).style.display = "none";
}
