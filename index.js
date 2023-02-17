li=['Home','Devlog','Skills','About']

DivEls=[];
DivEls1=[];
function Display(a)
{
    // console.log(a);
    for (let i = 0; i < li.length; i++) {
       if(li[i]!=a){
        document.getElementById(li[i]).classList.add('Hidden');
       } 
       else{
        document.getElementById(li[i]).classList.remove('Hidden');
       }
        
    }

    SetSliders();

    if(a=="Devlog" && DivEls.length==0)
        GeneratePosts();
    else if(a!="Devlog"){
        const container=document.getElementById("Posts");
        DivEls.forEach(element => {
            container.removeChild(element);
        });
        DivEls1.forEach(element => {
            container.removeChild(element);
        });
        DivEls=[];
        DivEls1=[];
    }
}
function SetSliders(){
    var slidefgs=document.getElementsByClassName('SliderFg');
    // console.log(slidefgs);
    for (let i = 0; i < slidefgs.length; i++) {
        console.log(slidefgs[i].style.width);
        slidefgs[i].style.width=(Number(slidefgs[i].getAttribute('value'))) + "%";
        console.log(slidefgs[i].style.width);
    }
}

function GeneratePosts()
{
   
    GetJSONGen();
}

function GetJSONGen(){
    let x="";
    const container=document.getElementById("Posts");
    fetch('./posts.json')
    .then((response) => response.json())
    .then((json) =>{
        for (let i = 0; i < json.no.no; i++) {
            let url=json.posts[i].url;
            let ifr=json.posts[i].iframe;
            let abt=json.posts[i].about;
            var div=document.createElement('div');
            var _div=document.createElement('div');
            div.classList.add('DivEl','col-4','BPost');
            _div.classList.add('DivEL','col-8','BPost')
            var Media=document.createElement('div');
            Media.classList.add("Media");
            var Desc=document.createElement('div');
            Desc.classList.add("Description");

            if(ifr==true){
                
                var _iframe=document.createElement('iframe');
                _iframe.setAttribute('width',480);
                _iframe.setAttribute('height',270);
                _iframe.setAttribute('src',url);
                _iframe.setAttribute('title',"YouTube video player");
                _iframe.setAttribute('frameborder','0');
                _iframe.classList.add('Media');
                _iframe.setAttribute('allow','accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
                Media.appendChild(_iframe);
            }
            else{
                var _img=document.createElement('img');
                _img.setAttribute('width',480);
                _img.setAttribute('height',270);
                _img.setAttribute('src',url);
                _img.classList.add('Media');
                Media.appendChild(_img);
            }
            
            
            Desc.innerHTML=abt;
            // console.log(abt);
            
            div.appendChild(Media);
            _div.appendChild(Desc);
            if(i%2==0){
                container.appendChild(div);
                container.appendChild(_div);
                _div.style.textAlign="left";
            }
            else
            {
                container.appendChild(_div);
                container.appendChild(div);
                _div.style.textAlign="right";
            }
            DivEls[i]=div;
            DivEls1[i]=_div;
        }
    });
}