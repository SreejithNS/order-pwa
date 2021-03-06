Number.prototype.toFixedNumber = function(x, base){
  var pow = Math.pow(base||10,x);
  return +( Math.round(this*pow) / pow );
}

var app = {

	userid: 9944343244,

	username: 'Sujith N',

	sync: null,

	authorise:()=>{

		alerty.prompt('Enter you PIN:',

		{

			inputType: 'password',

			inputPlaceholder: '',

			inputValue: ''

		},(input)=>{

			if(input == 'jithu'){

				M.toast({html:'You are Logged in'});

			}else{

				alerty.alert('Wrong credential<br>May be you are at the wrong place.');

				setTimeout(()=>{window.location.href = "../index.php"},2000);

			}

		},()=>{

			M.toast({html:'Credentials are must'});

			app.authorise();

		});

	},

	startSync:()=>{

		app.sync = setInterval(()=>{

			orders.getOrders(true)

		},5*1000);

	},

	stopSync:()=>{

		clearInterval(app.sync);

		app.sync = 'Stopped';

	},

	init: ()=>{

		app.authorise();

		$('#app-username').html(app.username).css('text-transform','capitalize');

		$('#app-userid').html(app.userid);

		$('#but-additem').on('click',()=>$('#page-additem').fadeIn());

		$('#but-home').on('click',()=>$('#page-additem').fadeOut());

		$('.menu').each((i,e)=>{

			console.log($(e));

			$(e).on('click',()=>$('.sidenav').sidenav('open'));

		});

		$('.sidenav').sidenav();

		app.startSync();

		app.clickPage('orders');

		$('.tap-target').tapTarget();

	},

	clickPage: (id, close) => {

        if (!close) $('.sidenav').sidenav('close');

        var pages = $(".page");

        pages.each((i, page) => {

            var name = $(page).attr('id').split('');

            name.splice(0, 5);

            name = name.join('');

            if (name == id) {

                $(page).show();

                $(page).addClass('show')

            } else {

                $(page).hide();

                $(page).removeClass('show')

            }

        })

    },

};



var orders = {

	complete:true,

	raw:[],

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

		$.get('index.php',{

			do:'place',

			data:data

		},(a,b,c)=>{

			if(a==1){

				M.toast({html: 'Order sent successfully',displayLength:2000});

			}

			$('#order-list').children().remove();

			app.clickPage('yourorders',true);

		}

		);

		}else{

			alerty.alert('Please add Items to your order!');

			orders.list = [];

			$("#order-list").children().remove();

		}

	},

	getOrders: (a)=>{

		var data = {

			do: "allorders"

		}

		$.get("index.php",data,

			(res)=>{

				if(res !== orders.raw) {

					orders.raw = res;

					//M.toast({html: 'One of your order is ready',displayLength:2000});

					var a = JSON.parse(res);

					var temp = [];

					a.forEach((d)=>temp.push(JSON.parse(d)));

					temp.forEach((d,i)=>{

						temp[i].odr = JSON.parse(temp[i].odr)

					});

					orders.ordered = temp;

				}else{

					a=false;

				}

				if(a) orders.loadOrders();

			}

			);

	},

	loadOrders: ()=>{

		$('#ordered').children().remove();

		$('#ordered').prepend('<div class="section"></div>');

		orders.ordered.forEach((d)=>{

			//orders.complete =(d.status == 0)? false:true;

			var id,sts,time,chips,button,sname;

			id = d.id;

			sname = d.name;

			sts = (d.status == 0)? "Ordered":"Ready";

			time = moment(d.time+" UTC").fromNow();
            atime = new Date(d.time+" UTC").toLocaleString()

			chips = "";

			button = (d.status == 0)? `<a class="waves-effect waves-teal btn-flat teal-text" onclick="orders.ready(${id})"><i class="tiny material-icons" style="vertical-align:-4px">done</i> Done</a>`:``;
			console.log(d.odr)
			var amount = d.odr.pop();
			console.log(amount)
			d.odr.forEach((o)=>{

				let name = o.item +' - '+o.quantity +' - ₹'+ o.price;

				chips += `<div class='chip'>${name}</div>`;

			});
			chips += (amount.discount)?`<div class="chip">Discount ₹${(amount.total - amount.gtotal).toFixedNumber(2)}</div>`:``;
            chips += `<div class='chip'>Total : ₹${(amount.gtotal)?amount.gtotal:amount.total}</div>`
            geolocation = (amount.location && amount.location !==1)? `<br><span class="grey-text"><a href="https://maps.google.com/maps?&z=15&q=${amount.location.coords.latitude}+${amount.location.coords.longitude}&ll=${amount.location.coords.latitude}+${amount.location.coords.longitude}" target="_blank"><i class="material-icons">place</i></a></span>`:'No location Provided';
			console.log(amount)
			var data = `<div class="marginpadding">

					<div class="row z-depth-3 roundpadding" ${(d.status==1)? "style='opacity:0.8'":""}>

					<div class="col s2">

						<span class="grey-text">ORDER ID #</span><span class="grey-text">${id}</span>

						<h3>${sname}</h3><span class="grey-text">${sts} |</span>

						<span class="grey-text"> ${time+" | "+atime}</span>
						${geolocation}

					</div>



					<div class="col s12 centered">

						<span class="grey-text">Items</span><br>

						${chips}<br>${button}<a class="waves-effect waves-red btn-flat red-text" onclick="orders.delete(${id})"><i class="tiny material-icons"  style="vertical-align:-4px">delete_outline</i>Delete</a>

					</div> 

				</div>

			</div>`;

		$('#ordered').append(data);

		});

		//if(orders.complete) $('#ordered').prepend('<div class="section"><p class="grey">All orders caught up!</p></div>');

	},

	ready: (id)=>{

		var data = {

			'do':"ready",

			'data': id

		};

		alerty.confirm('Sure?', function() {

		$.get("index.php",data,

			(res)=>{

				console.log(res);

				if(res == 1) {

					M.toast({html: 'Order #'+id+' updated!',displayLength:2000});

					orders.getOrders(true);

				}else{

					alerty.alert('Sorry, Please check your internet Connection');

				}

			});

		}, function(){

		  M.toast({html:'Nothing happened!'});

		});

	},

	delete: (id)=>{

		var data = {

			'do':"delete",

			'data': id

		};

		alerty.confirm('Delete your order?', function() {

		$.get("index.php",data,

			(res)=>{

				if(res == 1) {

					M.toast({html: `Order:#${id} deleted!`,displayLength:2000});

					orders.getOrders(true);

				}else{

					alerty.alert('Sorry, Please check your internet Connection');

				}

			});

		}, function(){

		  M.toast({html:'Nothing happened!'});

		});

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









$(document).ready(function(){

    	app.init();

});

if ('serviceWorker' in navigator) {

  window.addEventListener('load', function() {

    navigator.serviceWorker.register('/sw.js').then(function(registration) {

      console.log('ServiceWorker registration successful with scope: ', registration.scope);

    }, function(err) {

      console.log('ServiceWorker registration failed: ', err);

    });

  });

}