

var app = {
	userid: false,
	username: null,
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
		$('#page-additem').hide();
		$('#but-additem').on('click',()=>$('#page-additem').fadeIn());
		$('#but-home').on('click',()=>$('#page-additem').fadeOut());
		$('.sidenav').sidenav();
	}
};

var orders = {
	templist:[],
	list:[],
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
		$('#page-additem').fadeOut()
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
		}
		);
		}else{
			alerty.alert('Please add Items to your order!');
			orders.list = [];
			$("#order-list").children().remove();
		}
	}
};

$('.itembut').map((i,dom)=>$(dom).on('click',(e)=>{
	var k = $(e.target).html();
	var item = (/^\d+$/.test(k))? 'NO. '+k : k;
	console.log(typeof(item));
	
	alerty.prompt('Quantity',
		{
			inputType: 'number',
			inputPlaceholder: 'Kg / Rolls',
			inputValue: ''
		},(input)=>{
			var order = {
				'item': k,
				'quantity': input
			};
			orders.templist.push(order);
			$('#templist').append($('<div></div>')
				.addClass('chip')
				.attr('onclick','orders.remove('+(orders.templist.length-1)+')')
				.html(item+" "+order.quantity+"<i class='close material-icons'>close</i>")
				.attr('itemid',orders.templist.indexOf(order)));
		},()=>{
			alerty.alert('You must enter quantity');
		});
}));
app.init();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}