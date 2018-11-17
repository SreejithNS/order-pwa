var app = {
	userid: false,
	username: null,
	version:'v1.9',
	sync: null,
	swPort:1,
	swPorts : new MessageChannel(),
	getName:()=>{
		if(localStorage.getItem('username')!==null && localStorage.getItem('username')!==""){
			app.username = localStorage.getItem('username');
		}else{
			alerty.prompt('Enter your Shop name',
			{
			inputType: 'text',
			inputPlaceholder: '',
			inputValue: ''
			},(input)=>{
				localStorage.setItem('username',input);
				app.getName();
			},()=>{
				alerty.alert('Please enter your shop name!');
				app.getName();
			})
		}
	},
	init: ()=>{
		app.getName();
		let id = (localStorage.getItem('userid'))? localStorage.getItem('userid'):Date.now();
		localStorage.setItem('userid',id);
		app.userid = id;
		$('#app-username').html(app.username).css('text-transform','capitalize');
		$('#app-userid').html(app.userid);
		$('#but-home').on('click',()=>app.clickPage('orderlist'));
		$('.menu').each((i,e)=>{
			$(e).on('click',()=>$('.sidenav').sidenav('open'));
		});
		$('.sidenav').sidenav();
		sync = setInterval(()=>{
			orders.getOrders(true)
		},5*1000);
		app.clickPage('yourorders');
		$('.tap-target').tapTarget();
		app.swPorts.port1.onmessage = (e)=>app.swMessageHandler(e);
	},
	clickPage:(id,close)=>{
		if(!close) $('.sidenav').sidenav('close');
		var pages = $(".page");
		pages.each((i,page)=>{
			var name = $(page).attr('id').split('');
				name.splice(0,5);
				name = name.join('');
			if(name == id){
				$(page).show();
				$(page).addClass('show');
			}else{	
				$(page).hide();
				$(page).removeClass('show');
			}
		});
	},
	swMessage:(work,data)=>{
       return new Promise(function(resolve, reject) {
	    app.swPorts.port1/*["port"+app.swPort++]*/.onmessage = function(event) {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };
    let command = {'do':work,'data':data};
    navigator.serviceWorker.controller.postMessage(command,
      [app.swPorts.port2/*["port"+(++app.swPort)]*/]);
  	});
	}
};

var orders = {
	raw:[],
	templist:[],
	list:[],
	ordered:[],
	remove: (index)=>{
		orders.templist.splice(index,1);		
	},
	save: ()=>{
		orders.templist.forEach((order)=>{
			orders.list.push(order);
			let a = $('#order-list').children().length;//)? 1:$('#order-list').children().length;
			$('#order-list').append(
				$('<tr></tr>').append(
					'<td>'+(++a)+'</tr>',
					'<td>'+order.item+'</tr>',
					'<td>'+order.quantity+'</td>'
					)
				)
		})
		orders.templist = []
		$('#templist').children().remove()
		app.clickPage('orderlist')
	},
	submit: ()=>{
		if(orders.list.length !== 0){
		var data = JSON.stringify({
			userid:app.userid,
			name:app.username.replace(/'/g,"&#039;"),
			odr:JSON.stringify(orders.list),
			time:Date.now()
		});
		$.get('cgi/index.php',{
			do:'place',
			data:data
		},(a,b,c)=>{
			if(a==1){
				M.toast({html: 'Order sent successfully',displayLength:2000});
			}
			$('#order-list').children().remove();
			orders.list = [];
			app.clickPage('yourorders',true);
			orders.getOrders(1,1);
		}
		);
		}else{
			alerty.alert('Please add Items to your order!');
			orders.list = [];
			$("#order-list").children().remove();
		}
	},
	getOrders: (a,b)=>{
		var data = {
			do: "myorders",
			data: app.userid
		}
		$.get("cgi/index.php",data,
			(res)=>{
				var temp = [];
				if(res !== orders.raw) {
					orders.raw = res;
					//M.toast({html: 'One of your order is ready',displayLength:2000});
					var a = JSON.parse(res);
					a.forEach((d)=>temp.push(JSON.parse(d)));
					temp.forEach((d,i)=>{
						temp[i].odr = JSON.parse(temp[i].odr)
					});
					orders.updateNotice(temp,'sync');
					orders.ordered = temp;
				}else{
					a=false;
				}
				if(a) {
					orders.loadOrdered();
					if(b) orders.updateNotice(0,'submit');
				}
			}
			);
	},
	loadOrdered: ()=>{
		$('#ordered').children().remove();
		$('#ordered').prepend('<div class="section"></div>');
		var delay = 0;
		orders.ordered.forEach((d)=>{
			var id,sts,time,chips;
			delay += 0.1;
			id = d.id;
			sts = (d.status == 0)? "Ordered":"Ready";
			var epoch = new Date(1541170348750);
			time = epoch.toLocaleString();
			chips = "";
			d.odr.forEach((o)=>{
				let name = o.item +' - '+o.quantity;
				chips += `<div class='chip'>${name}</div>`;
			});
			var data = `<div class="marginpadding fadeIn" style="animation-delay:${delay}s">
					<div class="row z-depth-3 roundpadding">
					<div class="col s2">
						<span class="grey-text">ORDER ID #</span><span class="grey-text">${id}</span>
						<h3>${sts}</h3>
						<span class="grey-text">${time}</span>
					</div>

					<div class="col s12 centered">
						<span class="grey-text">Items</span><br>
						${chips}
						<br><a class="waves-effect waves-teal btn-flat" onclick="orders.delete(${id})"><i class="tiny material-icons" style="vertical-align:-4px">delete_outline</i> Delete</a>
					</div>
				</div>
			</div>`;
		$('#ordered').append(data);
		});
	},
	delete: (id)=>{
		var data = {
			'do':"delete",
			'data': id
		};
		alerty.confirm('Delete your order?', function() {
		$.get("cgi/index.php",data,
			(res)=>{
				if(res == 1) {
					M.toast({html: 'Your Order deleted!',displayLength:2000});
					orders.getOrders(true);
				}else{
					alerty.alert('Sorry, Please check your internet Connection');
				}
			});
		}, function(){
		  M.toast({html:'Nothing happened!'});
		});
	},
	updateNotice:(newList,process)=>{
		switch(process){
			case 'submit'://updateNotice for Submited order with ID
			M.toast({html:`#${orders.ordered[0].id} is the OrderID`});
			break;
			case 'sync'://updateNotice for Changes in order status
			newList.forEach(elem=>{
					orders.ordered.forEach(mirror=>{
						if(mirror.id == elem.id){
							if(mirror.status !== elem.status){
							let sts = (elem.status == 0)? "Ordered":"Ready";
							M.toast({html:`Your order #${elem.id} is ${sts}`});
							}
						}
					});
			});
			break;
		}
	}
};

$('.itembut').map((i,dom)=>$(dom).on('click',(e)=>{
	var k = $(e.target).html();
	var price = ($(e.target).attr('data-mass'))? 'Weight '+$(e.target).attr('data-mass'):'Chips';
	var item = k;//(/^\d+$/.test(k))? 'NO. '+k : k;

	
	alerty.prompt(`${item} - ${price}`,
		{	
			title:'Quantity',
			inputType: 'number',
			okLabel:'ADD',
			inputPlaceholder: 'Rolls',
			inputValue: ''
		},(input)=>{
			var order = {
				'item': k,
				'quantity': input +' Rolls'
			};
			orders.templist.push(order);
			$('#templist').append($('<div></div>')
				.addClass('chip')
				.attr('onclick','orders.remove('+(orders.templist.length-1)+')')
				.html(item+" - "+order.quantity+"<i class='close material-icons'>close</i>")
				.attr('itemid',orders.templist.indexOf(order)));
		},()=>{
			alerty.alert('You must enter quantity');
		});
}));




$(document).ready(function(){
    	app.init();
    	$('div[style*="text-align: right;position: fixed;z-index:9999999;bottom: 0; width: 100%;cursor: pointer;line-height: 0;display:block !important;"]').hide();
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      console.log('Welcome to Orders-PWA!\nWe have a Service Worker for ' + registration.scope);
    }, function(err) {
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}