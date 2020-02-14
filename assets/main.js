$(document).ready(function(){
    // styling html
    const sideNav = document.querySelector(".sidenav");
    const slider = document.querySelectorAll(".slider");
    const scroll = document.querySelectorAll(".scrollspy");
    const parallax = document.querySelectorAll(".parallax");
    const tabs = document.querySelectorAll(".tabs");
    const materialbox = document.querySelectorAll(".materialboxed");
    const date = document.querySelectorAll(".datepicker");

    M.Sidenav.init(sideNav)
    M.Slider.init(slider, {
        indicators: false,
        height: 590,
        duration: 1000,
        interval: 2500,
    })
    M.ScrollSpy.init(scroll)
    M.Parallax.init(parallax)
    M.Tabs.init(tabs)
    M.Materialbox.init(materialbox)
    M.Datepicker.init(date)

    $("#btn")

})