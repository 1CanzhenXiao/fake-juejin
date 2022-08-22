$(window).scroll((e) => {
    // 计算滚动条距离顶部的距离
    let scrollTop = $(document).scrollTop();
    let temp = document.querySelector(".btn1.to-top-btn")
    if(scrollTop<1000){
        temp.style.display = "none";
    }else{
        temp.style.display = "";
    }
})

document.querySelector(".btn1.to-top-btn").addEventListener('click', (e)=>{
    document.documentElement.scrollTop = 0;
})