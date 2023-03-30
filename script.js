function get_data(download_){
{
    		    var url = document.querySelector("#url");
    		    url =  url.value.split("/")
    		    var value_ = url[url.length-1].slice(1)
    		    var base_url = "https://terabox-backend.onrender.com/"
    		     let pre_url = base_url+"get_data?url="
		    fetch(pre_url+encodeURIComponent("https://www.4funbox.com/share/list?app_id=250528&web=1&clienttype=0&page=1&num=20&order=time&desc=1&site_referer=&root=1&shorturl="+value_),{headers: {
    'Connection': 'keep-alive',
    'Cache-Control': 'max-age=0',
    'Upgrade-Insecure-Requests': '1',
    'Access-Control-Allow-Origin': '*',
    "Access-Control-Allow-Methods":"GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":"origin, content-type, accept, x-requested-with",
    "Access-Control-Max-Age":"3600",
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Sec-GPC': '1',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-Mode': 'navigate',
     'Content-Type': 'application/json',

    'Sec-Fetch-User': '?1',
    'Sec-Fetch-Dest': 'document',
    'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8',

  }
}).then(res => res.json())
		    .then((res)=> {
			console.log(res,res.list[0].dlink);
			if(download_){
			window.open(res.list[0].dlink, '_blank');

			//window.location.href = ;
			}
			else{
			//console.log(res);
			var url__ = base_url+`get_stream?uk=${res.uk}&share_id=${res.share_id}&fid=${res.list[0].fs_id}`
					 $("#video").html("<source src='"+ url__ +"' type='application/x-mpegURL'>");
		    var ply = videojs("video");
		    ply.play();
			/*fetch(base_url+`get_stream?uk=${res.uk}&share_id=${res.share_id}&fid=${res.list[0].fs_id}`).then((res)=>res.text())
			.then((res)=>{
			
			//console.log(res)
			})
			*/
			
			}
	    })

    	
    	}
}

$(document).ready(function() {
  $("#btn").on("click", function() {
  	get_data(false);return
   
  });
  $("#download").on("click", function() {
  	get_data(true);
  });
});
