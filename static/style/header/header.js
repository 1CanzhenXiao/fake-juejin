document.querySelector('.more').addEventListener('click', function (){
    let head_more_list = document.querySelector('.head_more_list');
    let svg12 = document.querySelector('.unfold12-icon');
    if(head_more_list.style.display === 'none'){
        head_more_list.style.display = 'block';
        svg12.style.transform = 'rotate(180deg)';
    }else{
        head_more_list.style.display = 'none'
        svg12.style.transform = 'rotate(0deg)';
    }
})

document.querySelector('.unfold16-icon').addEventListener('click', function(){
    let phone_hide = document.querySelector('.phone-hide');
    let svg16 = document.querySelector('.unfold16-icon');
    if(phone_hide.className==='phone-hide isResourceVisible'){
        phone_hide.className='phone-hide show isResourceVisible';
        svg16.style.transform = 'rotate(180deg)';
    }else{
        phone_hide.className='phone-hide isResourceVisible';
        svg16.style.transform = 'rotate(0deg)';
    }
})