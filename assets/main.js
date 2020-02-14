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
    M.Modal.init(cart,{
        inDuration: 350,
    })
    
    vid[0].addEventListener("click",  function video() {
    frame.src = "https://www.youtube.com/embed/SSqgaFE9igo"})
    vid[1].addEventListener("click", function video() {
    frame.src = "https://www.youtube.com/embed/W1xwTqgzQ_g"})
    vid[2].addEventListener("click", function video() {
    frame.src = "https://www.youtube.com/embed/mTBSo3Ur4UA"})
    vid[3].addEventListener("click", function video() {
    frame.src = "https://www.youtube.com/embed/WiJubHinH8Y"})
    
   
    let btnF = $("#btn-flight");
    $(".row-f>:first-child").hide()
     btnF.click(function(){
    
        // for(i=0; i<4; i++) {
        //     let divR  =  $(".row-f");
        //     let divC  =  $("<div>").addClass("col s6");
        //     let divCa =  $("<div>").addClass("card red lighten-5");
        //     let divCc = $("<div>").addClass("card-content");
        //     let a = $("<a>").addClass("btn-floating btn-small red right a-flight");
        //     let icon = $("<i>").addClass("material-icons").text("add");                
        //     $("<p>").text("Departing Date:").appendTo(divCc);
        //     $("<p>").text("Returning Date:").appendTo(divCc);
        //     $("<p>").text("AirPort Name:").appendTo(divCc);
        //     $("<p>").text("AirPort Location:").appendTo(divCc);
        //     $("<p>").text("Price:").appendTo(divCc);
        //     icon.appendTo(a)
        //     a.appendTo(divCc)
        //     divCa.append(divCc)
        //     divC.append(divCa)
        //     divR.append(divC)
        //     console.log(divCa.children())

        // }
    //    let copy = $(".row-f>:first-child").clone(true);
    //    console.log(copy)
    //    console.log(copy[0].firstElementChild.firstElementChild.children[1])
    //    copy[0].firstElementChild.firstElementChild.children[0].textContent="hello"
    //    copy[0].firstElementChild.firstElementChild.children[1].textContent="hello"
    //    copy[0].firstElementChild.firstElementChild.children[2].textContent="hello"
    //    copy[0].firstElementChild.firstElementChild.children[3].textContent="hello"
    //    copy[0].firstElementChild.firstElementChild.children[4].textContent="hello"
      
    //    copy.appendTo($(".row-f")) 
   
    
    for(i=0; i<6; i++) {   
        $(".row-f>:first-child").show()
        let copy = $(".row-f>:first-child").clone(true);

        copy[0].firstElementChild.firstElementChild.children[0].children[0].textContent="hello"
        copy[0].firstElementChild.firstElementChild.children[1].children[0].textContent="hello"
        copy[0].firstElementChild.firstElementChild.children[2].children[0].textContent="hello"
        copy[0].firstElementChild.firstElementChild.children[3].children[0].textContent="hello"
        copy[0].firstElementChild.firstElementChild.children[4].children[0].textContent="hello"
        copy.appendTo($(".row-f")) 
        
        
        // console.log(copy)
        // console.log(copy[0].firstElementChild.firstElementChild.children[0].children.textContent)
    }
    $(".row-f>:first-child").hide()
})
    $(".btn-floating").click(function() {
        let text = $(this).children().text();
            $(this).children().text(
                text === "add" ? "close" : "add"
            )
         console.log($(this).children().text())
        $(this).toggleClass("red green")
    }) 
        
    
     


})