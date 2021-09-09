$(document).ready(function(){
    let params = new URLSearchParams(location.search);
    var available=params.get("host");
    console.log(available);
    if(available==null){

var peer = new Peer()
    peer.on('open', function(id){
        peer.on('connection',function(con){
            $("#sender").on("change",function(){
                con.send("sending");
                $('#sender').prop("files")[0].text().then(
                    function(value){                    
                        con.send({
                            file_name:$("#sender").prop("files")[0].name,
                            file:value
                        });
                    }
                );
                
            });            
            
            con.on('data',function(data){
                $("#sender").remove()
                console.log("lol we go");
                var file_download = function(file){
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    var url = window.URL.createObjectURL(file);
                    a.href = url;
                    a.download = file.name;
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
                con.on('data',function(d2){
                    console.log(typeof(d2.file));
                    var f = new File([d2.file],d2.file_name);
                    
                    file_download(f);
                });
            });
             
        });
        //$("#idnumber").html("<a href=\"file:///home/joe0400/sendit/tester.html?host=true&id="+id+"\">link</a>");
        new QRCode("qrcode",{
            text: "https://joe0400.github.io?host=true&id="+id
        });
        console.log("file:///home/joe0400/sendit/receive.html?id="+id);
        
        console.log("outside peer on connection");
    });
    }
    else{
    $("#idnumber").remove();
    $("#qrcode").remove();
    var c_id = params.get("id");
    console.log(c_id);
    var our_id = md5(c_id);
    var peer = new Peer();
    peer.on('open',function(){
        var con = peer.connect(c_id);
        console.log("connection attempting");
        $("#sender").on("change",function(){
            console.log("lol we go");
            con.send("sending");
            $('#sender').prop("files")[0].arrayBuffer().then(
                function(value){                    
                    con.send({
                        file_name:$("#sender").prop("files")[0].name,
                        file:value
                    });
                }
            );
                
        });         
        con.on('data',function(data){
            $("#sender").remove()
            var file_download = function(file){
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.style = "display: none";
                    var url = window.URL.createObjectURL(file);
                    a.href = url;
                    a.download = file.name;
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
            con.on('data',function(d2){
                
                var f = new File([d2.file],d2.file_name);
                    file_download(f);
            });
        });
    });
    }
});
