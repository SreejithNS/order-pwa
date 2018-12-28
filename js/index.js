Number.prototype.toFixedNumber = function(x, base){
  var pow = Math.pow(base||10,x);
  return +( Math.round(this*pow) / pow );
}

var app = {
    userid: (localStorage.getItem('userid') !== null && localStorage.getItem('userid') !== "")? localStorage.getItem('userid'):0,
    username: (localStorage.getItem('username') !== null && localStorage.getItem('username') !== "")? localStorage.getItem('username'):0,
    salesmode:(localStorage.getItem('salesmode') !== null && localStorage.getItem('salesmode') !== "")? localStorage.getItem('salesmode'):'',
    version: 'v2.1',
    token:null,
    geolocation:1,
    sync: null,
    changeMode:(value)=>{ // Change between normal mode to sales mode
        if(value){ //if the arguement is true set localstorage true
        localStorage.setItem('salesmode','true'); 
        app.salesmode = 'true';  
        $('#discount-but').show()// show the Discount button in the order list page
        }else{
        localStorage.setItem('salesmode',''); // set localstorage false if changeValue arguement is false
        app.salesmode = '';  // same as above
        $('#discount-but').hide()  // Hide the discount button
        }
    },
    updateGeoLocation:(location)=>{// event listener for change in geolocation
        app.geolocation = location; // set the updated geolocation value to app object
    },
    changeName:()=>{// To change the user name
        /*
        Prompts for the new name with current name in the text box
        */
        alerty.prompt('Edit Shop name', {
            inputType: 'text',
            inputPlaceholder: '',
            inputValue: app.username
        }, (input) => {
            // Validating input value to avoid empty strings -- Bad method
            if(input == "" || input == " " || input == "   "){
                M.toast({html:'Please enter a valid name'});
                app.changeName();// Detects an error toasts and prompts again by rerunning the function
            }else if(input == app.username){
                M.toast({html:'No changes made'}) // If the new name matches the old name - alert
            }else{
            /*
            the validated name is sent to server on changename function
            with the current user id to change the name of the userid
            */
            $.get('cgi/index.php', {
                do: 'changename',
                id: app.userid,
                name: input
                }, (a) => {//The Server return 1 if everthing is fine//
                if (a !== "1") {// If the server returns others than one.
                   alerty.alert('Something went wrong! Name not changed');
                   // Ends with a prompt and does'nt prompt again
                }else{
                    // Server value changed now local values are changed
                   localStorage.setItem('username',input);// Localstorage of username
                   app.username = input;
                   $('#app-username').html(app.username); // UI name change
                   M.toast({html:"Shop name changed to "+input}) // Final feedback that username changed
                };
            })
        }
        }, () => {
            console.log('Why have you not entered anything?');// Debug console log if the prompt was left empty
        })
    },
    getName: () => {
        /* Assign name to the app object */
        // Checking localstorage for name
        if (localStorage.getItem('username') !== null && localStorage.getItem('username') !== "") {
            app.username = localStorage.getItem('username') // if localstorage has a name assign it
        } else {
            // Prompt for new user , that is the name does not exit in the localstorage
            alerty.prompt('Enter your Shop name', {
                inputType: 'text',
                inputPlaceholder: '',
                inputValue: ''
            }, (input) => {
                // Tell server about the new user and update it in the shops table
                $.get('cgi/index.php', {
                    do: 'newid',
                    name: input
                    }, (a) => {
                        /*
                         If something goes wrong in the server it will return 'error' 
                         If eveything is fine the server returns the userid of the new user
                         */
                    if (a !== "error") {
                       localStorage.setItem('username', input); // Assign the username and userid to the localstorage
                       localStorage.setItem('userid', a);
                       app.username = input;// Assign it locally in the app object
                       app.userid = a;
                       app.getName(); //Runs this function again and breaks as the localstorage is available
                    };
                })
            }, () => {// If the shop name textfield is left empty 
                alerty.alert('Please enter your shop name!');
                app.getName()// Runs againt he function which passes through unavailable localstorage
            })
        }
    },
    init: () => {
        /*
        App initialisation which runs if the document - Ready event is fired
        */
        app.getName();// Checks localstorage for name , if does'nt exists prompts for the name //
        // To load name in the UI - but it loads 0 if the user is new -- bug
        $('#app-username').html(app.username+template.google_icon("edit",`font-size: medium;vertical-align: -3px;margin-left: 9px;" onclick="app.changeName()"`)).css('text-transform', 'capitalize'); 
        // Same bug as the username
        $('#app-userid').html(app.userid);
        //The but-home in the Add items page to go to orderlist -- this was written in the early stage of development
        $('#but-home').on('click', () => app.clickPage('orderlist'));
        // Handling click event for all triple-bar icons with .menu class to open the sidenav
        $('.menu').each((i, e) => {
            $(e).on('click', () => $('.sidenav').sidenav('open'))
        }); 
        // Initialising the side nav
        $('.sidenav').sidenav();
        // Sets the sync function in the app objects to access it everywhere 
        sync = setInterval(() => { // sync can be stopped by clearInterval(app.sync)
            orders.getOrders(!0)
        }, 5 * 1000); // checks for the new order once in every five seconds
        app.clickPage('yourorders'); // Startup page opening in the your orders page
        $('.tap-target').tapTarget(); // Not well configured but afraid to remove- Tutorial like instructions to work with app
        // To remove the 000webhostapp banner from the page by a simple trick
        $(`<link type="text/css" rel="preload" href="css/materialize.min.css" as='style' onload="this.onload=null;this.rel='stylesheet'" media="screen,projection"/><link rel="preload" type="text/css" href="css/bootstrap.min.css" as='style' onload="this.onload=null;this.rel='stylesheet'" />`).appendTo('head');
        //Checks whether the salesman mode is on to make the settings menu checkbox to be checked
        // And if not the checkbox is defaultly unchecked and the discount button is hidden.
        if(app.salesmode) {$('#salesmode').prop('checked',true)}else{$('#discount-but').hide()}
    },
    /* Page to Page navigation */
    clickPage: (pageName) => { // event handles onclick in inline
        $('.sidenav').sidenav('close');// Close the sidenav after the pagename is clicked
        var pages = $(".page");// Get all pages by selecting the .page class
        pages.each((i, page) => {// i is the iteration number and page is the each page div
            var name = $(page).attr('id').split('');//splits the page id into array with each letter
            name.splice(0, 5);// Splices the first five letters - "page-"
            name = name.join('');// then joins the spliced word with inturns has the page to be opened
            if (name == pageName) { // if the name matches the pageName passed in the funciton 
                $(page).show();// That page dom is shown
                $(page).addClass('show') // Shown with a slide in animation
            } else {
                $(page).hide(); // If the pageName does'nt match the given name
                $(page).removeClass('show') // Removes hides that page if open
            }
        })// Hides all pages except the given pageName and show it with an animation
    },
    updateToken:(token)=>{ // Updates the FCM token to the server
        app.token = token
        $.get('cgi/index.php', {
                    do:'token',
                    id: app.userid, // UserId to which is the token is applied
                    token: token
                    }, (a) => {
                    if (a !== "1") { // If everthing goes well server returns 1, if not..
                       M.toast({html:"Token cannot be updated"});// Alerts that token is not updated
                    };
                })
    }/*,
    swMessage: (work, data) => {
        return new Promise(function(resolve, reject) {
            app.swPorts.port1.onmessage = function(event) {
                if (event.data.error) {
                    reject(event.data.error)
                } else {
                    resolve(event.data)
                }
            };
            let command = {
                'do': work,
                'data': data
            };
            navigator.serviceWorker.controller.postMessage(command, [app.swPorts.port2])
        })
    }*/
};

var template = {// Template object which has templates of some DOM
    /* Inspired from React but does'nt helps much */
    google_icon:(html,style)=>{
        return `<i class="material-icons"${(style)? ` style="${style}"`:``}>${html}</i>`
    }
}

var orders = {
    raw: [], // The raw string of User's orders from the server are stored here
    templist: [],// the selected items in the Add item page is stored here until Save is fired
    amount:{ // The amount section which holds discounts and total and grand totals if given
        total:0.0
    },
    queue:false, // If it is true One order is awaiting to reach the server -  Denies all other Submit clicks
    list: [],// The main order queue where the order items are stored to be sent to the server
    // The list[] above is injected with the amount object at the time of sending to server
    ordered: [],// The parsed raw order string is saved here
    remove: (index) => {
        orders.templist.splice(index, 1) // Remove the item from the order queue(temp list) by the items index
    },
    save: () => { // Save the items from templist ( Add items page ) to the main order queue
        /* Removing all calculated amount */
        if($("#amount-section")/* The UI section where the total amount and discount values */.length) {$("#amount-section").remove()}// Removes the ui that shows the amounts
        if($(".discount-section").length) {$(".discount-section").remove();M.toast({html:'Discount removed.'})}// Removes the discount UI if present
        if(orders.list.length) {// If there is some order items the order list length would be greater than Zero
            orders.list.pop();// If there is a list item then the last element of the array would be the amount object
            // Thus the amount is popped from the item list
            orders.amount.discount = orders.amount.gtotal = null; // The amount object is uninjected into the order list is also deleted
        }
        orders.templist.forEach((order) => {// For each order in the added item list from the add items page
            orders.list.push(order);// Push the order{object} item to the order list
            let a = $('#order-list').children().length;// The length of dom objects that is shown
            // That length is incremented each time  an item is added to the ui - is for the serial number purpose
            $('#order-list')
            .append(
                $('<tr></tr>')
                    .append(
                        '<td>' + (++a) + '</tr>',
                        '<td>' + order.item + '</tr>',
                        '<td>' + order.quantity + '</td>',
                        '<td>' + order.price + '</td>'
                    )
            )
            orders.amount.total += parseFloat(order.price.toFixedNumber(2))// Incrementing the total property of the amount object with price amount of the order item
        });
        orders.amount.total = orders.amount.total.toFixedNumber(2);// Parsing the total to a 2 digit fixed decimals
        orders.list.push(orders.amount);// Injecting the amount object to the main order-list array
        orders.templist = []; // Emptying the templist for further adding or clean up - that does'nt make any sense at all , but i did
        let attr = {// Instead of the setting each and every attribute it will be easy to make an object with its properties
            'id':'amount-section',// Bad idea for a single attribute
        }
        $('#order-list').append(// Appending amount section to the main orders section.
            $('<tr></tr>')
            .attr('id','amount-section')
            .html(
                    `<td colspan="3" style="text-align:right;padding-right:5px">Total Amount : </td>`+
                    `<td id="total-amount">₹ ${parseFloat(orders.list[orders.list.length-1].total.toFixedNumber(2))}</td>`
                )
            )
        $('#templist').children().remove();// Removing the chips in the add item page -- cleanup :)
        app.clickPage('orderlist')// Open the orderlist page
    },
    discount:()=>{// This is where humanity goes in
        if (orders.list.length !== 0) {// Does discount only the list has some item in it
            // Getting the total amount from the amount object at the end of the orderlist array
            var totamount = parseFloat(orders.list[orders.list.length-1].total).toFixedNumber(2);
            // Prompting the user for the discount percentage with the total amount showing in it
            alerty.prompt(`Current Total Amount : ₹${totamount}`, {
                title: `Discount %`,
                inputType: 'number',
                okLabel: 'Discount',
                inputPlaceholder: 'In %',
                inputValue: ''
            }, (input) => {
                // Removes the existing discount ui and the code stuff
                if($(".discount-section").length) {
                    $('.discount-section').remove();
                    orders.list[orders.list.length-1].gtotal = null;
                    orders.list[orders.list.length-1].discount = null;
                }
                /// The brutal discount algorithm goes in ;)
                var disamount = totamount * (input/100);
                // Setting the discount values in the amount object in the orders list 
                orders.list[orders.list.length-1].discount = input;
                orders.list[orders.list.length-1].gtotal = (totamount - disamount).toFixedNumber(2);
                $('#amount-section')
                .after(// Showing the UI in the main table
                        `<tr class="discount-section">`+
                        `<td colspan="3" style="text-align:right;padding-right:5px">Discount %: </td>`+
                        `<td id="total-amount">${input}%</td>`+
                        `</tr>`+
                        `<tr class="discount-section">`+
                        `<td colspan="3" style="text-align:right;padding-right:5px">Discount Amount : </td>`+
                        `<td id="total-amount">₹${(disamount).toFixedNumber(2)}</td>`+
                        `</tr>`+
                        `<tr class="discount-section">`+
                        `<td colspan="3" style="text-align:right;padding-right:5px">Grand Total : </td>`+
                        `<td id="total-amount">₹${(totamount - disamount).toFixedNumber(2)}</td>`+
                        `</tr>`
                    )
            }, () => {
                alerty.alert('No Discount done.')// If no value is entered give them a feedback
            })
        }else{
            alerty.alert('Please add some items.')// If there is no items in the list alert the user
        }
    },
    submit: () => {
        if(orders.queue) {
            M.toast({html:'Please wait'})
            return
        }
        if (orders.list.length !== 0) {
            orders.queue = true;
            var data = null;
            var sname = null;
            if(app.geolocation !==1){
            orders.list[orders.list.length-1].location = {coords:{}};
            orders.list[orders.list.length-1].location.coords.latitude = app.geolocation.coords.latitude;
            orders.list[orders.list.length-1].location.coords.longitude = app.geolocation.coords.longitude;
            }else{
                orders.list[orders.list.length-1].location = 1;
            }

    
            let get = new Promise(function(resolve, reject) {
            if(app.salesmode){              
               alerty.prompt('Enter Shop name', {
                inputType: 'text',
                inputPlaceholder: '',
                inputValue: ''
            }, (input) => {
                sname = input;
                data = JSON.stringify({
                userid: app.userid,
                name: sname.replace(/'/g, "&#039;"),
                odr: JSON.stringify(orders.list),
                time: moment(new Date).format("YYYY-MM-DD HH:mm:ss")
            });
                resolve(data);
            }, () => {
                alerty.alert('Please enter shop name!');
                reject();
            })
            }else{
                data = JSON.stringify({
                userid: app.userid,
                name: app.username.replace(/'/g, "&#039;"),
                odr: JSON.stringify(orders.list),
                time: moment(new Date).format("YYYY-MM-DD HH:mm:ss")
                }); 
                resolve(date);
            }
            });
            get.then((data)=>{
            $.get('cgi/index.php', {
                            do: 'place',
                            data: data
                        }, (a, b, c) => {
                            if (a == 1) {
                                M.toast({
                                    html: 'Order sent successfully',
                                    displayLength: 2000
                                })
                                orders.queue = false;
                            }else{
                                alerty.alert(a)
                                orders.queue = false;
                            };
                            $('#order-list').children().remove();
                            orders.list = [];
                            orders.amount = {total:0.0};
                            app.clickPage('yourorders', !0);
                            orders.getOrders(1, 1);
                            orders.queue = false;
            })  
            }).catch(()=>{order.queue = false})
        } else {
            alerty.alert('Please add Items to your order!');
            orders.list = [];
            orders.amount = {total:0.0};
            orders.queue = false;
            $("#order-list").children().remove()
        }
    },
    getOrders: (a, b) => {
        if(app.userid == 0){
            return false
        }
        var data = {
            do: "myorders",
            data: app.userid
        };
        $.get("cgi/index.php", data, (res) => {
            var temp = [];
            if (res !== orders.raw) {
                orders.raw = res;
                var a = JSON.parse(res);
                a.forEach((d) => temp.push(JSON.parse(d)));
                temp.forEach((d, i) => {
                    temp[i].odr = JSON.parse(temp[i].odr)
                });
                orders.updateNotice(temp, 'sync');
                orders.ordered = temp
            } else {
                a = !1
            };
            if (a) {
                orders.loadOrdered();
                if (b) orders.updateNotice(0, 'submit')
            }
        })
    },
    loadOrdered: () => {
        $('#ordered').children().remove();
        var delay = 0;
        orders.ordered.forEach((d) => {
            var id, sts, time, chips, check;
            delay += 0.1;
            id = d.id;
            sts = (app.salesmode)? d.name : ((d.status == 0) ? "Ordered" : "Ready");
            time = moment(d.time+" UTC").fromNow();
            atime = new Date(d.time+" UTC").toLocaleString()
            check = (d.status==0)? false:true;
            chips = "";
            var amount = d.odr.pop();
            d.odr.forEach((o) => {
                let name = o.item + ' - ' + o.quantity + ' - ₹' + o.price;
                chips += `<div class="cd row"><div><div class="col s12 item chip">${name}</div></div></div>`
            });
            console.log((amount.location!==1)?amount.location:"No location for "+d.id);
            discount = (amount.discount)?`<div class="cd row"><div class="col s12 tright"><div class="chip">DISCOUNT: - ₹ ${(amount.total - amount.gtotal).toFixedNumber(2)}</div><div class="chip">TOTAL : ₹ ${amount.gtotal}</div></div></div>`:``
            total = amount.total;//(amount.discount)?amount.gtotal:amount.total;
            //var data = `<div class="card-cont fadeIn" style="animation-delay:${delay}s"><div class="row z-depth-3 roundpadding"><div class="col s2"><span class="grey-text">ORDER ID #</span><span class="grey-text">${id}</span><h3>${sts}</h3><span class="grey-text">${time+" | "+atime}</span></div><div class="col s12 centered"><span class="grey-text">Items</span><br>${chips}<br><a class="waves-effect waves-teal btn-flat" onclick="orders.delete(${id})"><i class="tiny material-icons" style="vertical-align:-4px">delete_outline</i> Delete</a></div></div></div>`;
            var data = `<div class="card-cont fadeIn" style="animation-delay:${delay}s">
                            <div class="cd row">
                              <div class="tl card-tleft"><i class="material-icons fs35">store</i></div>
                              <div class="tr card-tright">#${id}${(check)? `<span class="mdi mdi-checkbox-marked-circle" style="color:#55efc4"></span>`:`<span class="mdi mdi-checkbox-blank-circle"></span>`}<br><span class="mdi mdi-calendar-clock"></span>${atime}</div>
                            </div>
                            <div class="cd row">
                              <div class="col s12 cd-shopname">${sts}</div>
                            </div>
                            ${chips}
                            <div class="cd divider"></div>
                            <div class="cd row">
                            <div style="margin: 0px 0px 0px 22px;max-width: 40%;width: 30%;"><!---span class="vendor"><span class="mdi mdi-account-circle"></span> Mani</span--->
                            <a class="waves-effect waves-teal btn-flat" style="margin-top: -4px;margin-left: -10px;" onclick="orders.delete(${id})">
                                    <i class="tiny material-icons" style="vertical-align:-4px">delete_outline</i> Delete
                                </a>
                            </div>
                            <div class="tright" style="width: 60%;">
                            <div class="totalprice">₹ ${total}</div>
                          </div>
                          </div>
                            ${discount}
                        </div>`
            $('#ordered').append(data)
        })
    },
    delete: (id) => {
        var data = {
            'do': "delete",
            'data': id
        };
        alerty.confirm('Delete your order?', function() {
            $.get("cgi/index.php", data, (res) => {
                if (res == 1) {
                    M.toast({
                        html: 'Your Order deleted!',
                        displayLength: 2000
                    });
                    orders.getOrders(!0)
                } else {
                    alerty.alert('Sorry, Please check your internet Connection')
                }
            })
        }, function() {
            M.toast({
                html: 'Nothing happened!'
            })
        })
    },
    updateNotice: (newList, process) => {
        switch (process) {
            case 'submit':
                M.toast({
                    html: `#${orders.ordered[0].id} is the OrderID`
                });
                break;
            case 'sync':
                newList.forEach(elem => {
                    orders.ordered.forEach(mirror => {
                        if (mirror.id == elem.id) {
                            if (mirror.status !== elem.status) {
                                let sts = (elem.status == 0) ? "Ordered" : "Ready";
                                M.toast({
                                    html: `Your order #${elem.id} is ${sts}`
                                })
                            }
                        }
                    })
                });
                break
        }
    }
};
$('.itembut').map((i, dom) => $(dom).on('click', (e) => {
    var k = $(e.target).attr('data-item');
    var mass = ($(e.target).attr('data-mass')) ? 'Weight ' + $(e.target).attr('data-mass') : 'Chips';
    var price = $(e.target).attr('data-price');
    var item = k;
    alerty.prompt(`${$(e.target).html()} - ${mass} - ₹${parseFloat(price)}`, {
        title: 'Quantity - Packets',
        inputType: 'number',
        okLabel: 'ADD',
        inputPlaceholder: 'Packets',
        inputValue: ''
    }, (input) => {
        var order = {
            'item': k,
            'quantity': input,
            'price' : (input * parseFloat(price)).toFixedNumber(2)
        };
        orders.templist.push(order);
        order.itemid = orders.templist.indexOf(order);
        $('#templist')
        .append(
            $('<div></div>')
                .addClass('chip')
                .attr('onclick', 'orders.remove(' + (orders.templist.length - 1) + ')')
                .html(`${item} - ${order.quantity} - ₹${order.price}<i class='close material-icons'>close</i>`)
                .attr(order)
            )
    }, () => {
        alerty.alert('You must enter quantity')
    })
}));
$(document).ready(function() {
    app.init();
    $('div[style*="text-align: right;position: fixed;z-index:9999999;bottom: 0; width: 100%;cursor: pointer;line-height: 0;display:block !important;"]').hide()
    $('#cover').hide();
    navigator.geolocation.getCurrentPosition(app.updateGeoLocation, (e)=>M.toast({html:"Location error:"+e.message}));
    navigator.geolocation.watchPosition(app.updateGeoLocation)
});
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('Welcome to Orders-PWA!\nWe have a Service Worker for ' + registration.scope)
        }, function(err) {
            console.log('ServiceWorker registration failed: ', err)
        })
    })
}

