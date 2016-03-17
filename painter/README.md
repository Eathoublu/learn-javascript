## ǰ��
websocket��html5�е�һ��ͨ��Э�飬��httpЭ��ġ����󡪡���Ӧ�����Ʋ�ͬ��websocket�ڽ������Ӻ�������ͷ�����֮�����ʵ��ȫ˫��ͨ�š�����˵��������websocket���Ӻ�������ͷ�����֮�����ʵʱ�����ɵؽ���������ص㣬����ʵ�ֶ��������Ļ���Ҫ�����ڡ�
## ʵ��
ʵ�ּ����õ���socket.io + node.js��ԭ��ܼ򵥣�websocketЭ����Ҫ������ͷ������Ľ�������node.js�����ṩ��һ����������������������ͳһΪjavascript��ʮ�ַ����ݡ�socket.io��Ϊ������ͷ������ṩ��ͳһ���򵥵ı�̽ӿڡ�

��Σ�Ҫʵ�ֵ�������һ��Эͬ�Ļ���������������node.js�¡����ȣ�����������Ŀpainter������װexpress��socket.ioģ�顣����express������������socket.ioʵ��websocket���ӡ�

Ȼ����ǳ��������ļ�`index.js`,��Ҫ�������ڱ��ض˿ڣ�`localhost:3000`�����з�����������������ʸ�Ŀ¼ʱ����`painter.html`�ļ���������`painter.html`�д����Ļ����¼�������Я���˻��ʵ�λ����Ϣ����Ҫ�������£�
```
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res){
	res.sendFile(__dirname + '/painter.html');
});

io.on('connection',function(socket){
    ......
	socket.on('paint event', function(data){
		socket.broadcast.emit('paint event', data);
	});
    ......
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});
```
�������ҳ���ϵĻ��ʿ�ʼ�滭ʱ�����λ��������`index.js`����`begin`���������£���`painter`������ͼ������`end`������̧���¼������������Ż�ʹ��`socket.broadcast.emit`���������н������ӵ�ҳ�洫�ݻ����¼������˷�����Ϣ��ҳ�棬��ֹ����ԭ��ҳ��Ļ��ʣ����������������Щ�¼��󣬽���������Ļ���λ�ã��ͻ���Ƴ���Ӧ��ͼ�����ﵽ�˶���������Ч����

��`painter.html`�У����ȴ���`<canvas>`��ǩ��������`socket.io.js`����Ҫ�������£�
```
</script>
    <script src='/socket.io/socket.io.js'></script>
    <script>
    var canvas_ = document.getElementById("_canvas");
    var context = canvas_.getContext("2d");
    ......
    var socket = io();
    socket.on('begin event', function(data){
            context2.beginPath();
            context2.moveTo(data[0], data[1]);
    });

    socket.on('paint event', function(data){
            context2.lineTo(data[0], data[1]);
            context2.moveTo(data[0], data[1]);
            context2.stroke();
    });
    ......
</script>
```
## Ч��
������Ŀ`node index.js`���ò�ͬ�豸���߲�ͬ���������Ȼ���ִ��������:-)���Ͻ��������ϳ¾ɵ�IE�ɣ����ʱ��ض˿ڣ�`http://localhost:3000`��Ȼ����һ��ҳ���ϻ滭�������������ӵ�ҳ���߻�չʾ���ƵĹ��̡�ʾ��ͼƬ�ĳ����������ֻ����ƣ�����chrome����չʾЧ����
![screen.gif][1]

## ���
��ѧ�����������κ�������߽��飬��ӭ���ҷ���������ϣ��web����Խ��Խ�ã�����ÿ���˵�����Ʒ�ʡ�


  [1]: http://chunqiuyiyu-typechoupload.stor.sinaapp.com/2527727131.gif