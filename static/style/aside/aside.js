$(window).scroll((e) => {
    // 计算滚动条距离顶部的距离
    let scrollTop = $(document).scrollTop();
    let temp = document.querySelector(".sidebar-block.sticky-block")
    if(scrollTop>1200){
        temp.style.opacity = "1";
        let img = temp.querySelectorAll(".sticky-banner .banner-image")
        img[0].height = "200";
        img[1].height = "200";
    }else{
        temp.style.opacity = "0";
        let img = temp.querySelectorAll(".sticky-banner .banner-image")
        img[0].height = "0";
        img[1].height = "0";
    }
})