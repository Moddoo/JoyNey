$(document).ready(function(){
    // styling html
    const sideNav = document.querySelector(".sidenav");
    const slider = document.querySelectorAll(".slider");
    const scroll = document.querySelectorAll(".scrollspy");
    const parallax = document.querySelectorAll(".parallax");
    const tabs = document.querySelectorAll(".tabs");
    const materialbox = document.querySelectorAll(".materialboxed");
    const date = document.querySelectorAll(".datepicker");
    const vid = document.querySelectorAll(".vid-img");
    const frame = document.getElementById("frame");
    const cart = document.querySelectorAll(".modal");

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
    M.Modal.init(cart)
    
    vid[0].addEventListener("click",  function video() {
    frame.src = "https://www.youtube.com/embed/SSqgaFE9igo"})
    vid[1].addEventListener("click", function video() {
    frame.src = "https://www.youtube.com/embed/W1xwTqgzQ_g"})
    vid[2].addEventListener("click", function video() {
    frame.src = "https://www.youtube.com/embed/mTBSo3Ur4UA"})
    vid[3].addEventListener("click", function video() {
    frame.src = "https://www.youtube.com/embed/WiJubHinH8Y"})
  
 
    
    
        
    
     


})