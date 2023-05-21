(function() {

    /**
     * Variables
     */
    var user_name = "";
	var jwtCode = ""; 
    var lng;
    var lat;

    /**
     * Initialize
     */
    function init() {
        // Register event listeners
        $('nearby-btn').addEventListener('click', loadNearbyItems);
        $('fav-btn').addEventListener('click', loadFavoriteItems);
        $('recommend-btn').addEventListener('click', loadRecommendedItems);

        $('login').addEventListener('click', showMinLogin);
        $('btn_login_close').addEventListener('click',closeMinLogin);
        $('btn_login').addEventListener('click',submitLoginInformation)

        $('signup').addEventListener('click',showMinSignup);
        $('btn_signup_close').addEventListener('click',closeMinSignup);
        $('btn_signup').addEventListener('click',submitSignupInformation)

		$('welcome').addEventListener('mouseover', welcome);
        $('dropdown-content').addEventListener('mouseout', welcome1);
        $('removeaccount').addEventListener('mouseover', welcome);
        $('signout').addEventListener('mouseover', welcome);
        $('signout').addEventListener('click', signout)


        initGeoLocation();
    }

    // login and signup window

    function showMinLogin() {
      var min_login = document.getElementById("min_login");
      var cover = document.getElementsByClassName("cover")[0];
      min_login.style.display = "block";
      cover.style.display = "block"
      min_login.style.left = (window.innerWidth - min_login.scrollWidth) / 2 + "px";
      min_login.style.top = (window.innerHeight - min_login.scrollHeight) / 2 + "px";
    }

    function closeMinLogin() {
      var min_login = document.getElementById("min_login");
      var cover = document.getElementsByClassName("cover")[0];
      min_login.style.display = "none";
      cover.style.display = "none";
      document.form1.uname.value = "";
      document.form1.upwd.value = "";
    }

    function showMinSignup() {
      var min_signup = document.getElementById("min_signup");
      var cover = document.getElementsByClassName("cover")[0];
      min_signup.style.display = "block";
      cover.style.display = "block"
      min_signup.style.left = (window.innerWidth - min_signup.scrollWidth) / 2 + "px";
      min_signup.style.top = (window.innerHeight - min_signup.scrollHeight) / 2 + "px";
    }

    function closeMinSignup() {
      var min_signup = document.getElementById("min_signup");
      var cover = document.getElementsByClassName("cover")[0];
      min_signup.style.display = "none";
      cover.style.display = "none";
      document.form2.uname.value = "";
      document.form2.upwd.value = "";
	  document.form2.upwdc.value = ""; 


    }

    function submitLoginInformation() {
      var userName = document.form1.uname.value;
      //console.log(userName);
      var passWord = document.form1.upwd.value;
      //console.log(passWord);
	    var goal = "login"

      userInformation = JSON.stringify({"userName": userName, "passWord": passWord, "goal": goal, "jwtCode": jwtCode});
      var url = './registerLogin';
      //console.log(userInformation);

      ajax('post', url, userInformation, function(res) {
        var return_user_name = JSON.parse(res).userName;
        var determination = JSON.parse(res).determination;
		jwtCode = JSON.parse(res).jwtCode; 
		//console.log(jwtCode); 

        if (determination === "Login success") {
          document.getElementById("login").style.display = "none";
		  document.getElementById("signup").style.display = "none";
          var welcomeElement = document.getElementById('welcome');
          welcomeElement.innerHTML = 'Welcome '+return_user_name;
          welcomeElement.style.display = "block";

          var min_login = document.getElementById("min_login");
          var cover = document.getElementsByClassName("cover")[0];
          min_login.style.display = "none";
          cover.style.display = "none";
          document.getElementById("fav-btn").style.display = "block";
          document.getElementById("recommend-btn").style.display = "block";
          user_name = return_user_name;

        } else if (determination === "user name or password error") {
		      //console.log(determination);
          alert("The user name or password is not correct. ")
        } else {
          alert("Connection error. Please login later. ")
        }
      },
      function() {
        alert("Connection error. ")
      })

    }

    function submitSignupInformation() {
      var userName = document.form2.uname.value;
      //console.log(userName);
      var passWord = document.form2.upwd.value;
      var passWordc = document.form2.upwdc.value;
      //console.log(passWord);
	    var goal = "signup";

      if (userName === "") {
        alert("The user name can not be empty. ");

      } else if (passWord != passWordc) {
        alert("The password is not matched with the password confirmation. ")
      } else {
        userInformation = JSON.stringify({"userName": userName, "passWord": passWord, "goal": goal, "jwtCode": jwtCode});
        var url = './registerLogin';
        //console.log(userInformation);
  /*
  	  var xhr = new XMLHttpRequest();

        xhr.open('post', url, true);

        xhr.setRequestHeader("Content-Type",
            "application/json;charset=utf-8");

        xhr.send(userInformation);
  */
        ajax('post', url, userInformation, function(res) {
          var return_user_name = JSON.parse(res).userName;
          var determination = JSON.parse(res).determination;
		  jwtCode = JSON.parse(res).jwtCode; 

          if (determination === "The user has been created. ") {
            document.getElementById("login").style.display = "none";
  		      document.getElementById("signup").style.display = "none";
            var welcomeElement = document.getElementById('welcome');
            welcomeElement.innerHTML = 'Welcome '+return_user_name;
            welcomeElement.style.display = "block";


            var min_signup = document.getElementById("min_signup");
            var cover = document.getElementsByClassName("cover")[0];
            min_signup.style.display = "none";
            cover.style.display = "none";
            document.getElementById("fav-btn").style.display = "block";
            document.getElementById("recommend-btn").style.display = "block";
            user_name = return_user_name;
            /*
              welcome sign out
            */
          } else if (determination === "The user name has already existed. ") {
            alert("The user name has already existed. ")
          } else {
            alert("Connection error. ")
          }
        },
      function() {
        alert("Connection error. ")
      	})
      }


    }

	function welcome() {
      var dropDownContent = document.getElementsByClassName("dropdown-content")[0];
      dropDownContent.style.display = "block";
    }

    function welcome1() {
      var dropDownContent = document.getElementsByClassName("dropdown-content")[0];
      dropDownContent.style.display = "none";
    }

    function signout() {
      document.getElementById('welcome').style.display = "none"; 
	  document.getElementById('login').style.display = "block"; 
	  document.getElementById('signup').style.display = "block"; 
      document.form1.uname.value = "";
      document.form1.upwd.value = "";
	  document.getElementById("fav-btn").style.display = "none";
      document.getElementById("recommend-btn").style.display = "none";
	  user_name = ""; 
	  jwtCode = ""; 
	  loadNearbyItems(); 
	  //console.log("No login"); 
    }
/*

*/

    function initGeoLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(onPositionUpdated,
                onLoadPositionFailed, {
                    maximumAge: 60000
                });
            showLoadingMessage('Retrieving your location...');
        } else {
            onLoadPositionFailed();
        }
    }

    function onPositionUpdated(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;

        loadNearbyItems();
    }

    function onLoadPositionFailed() {
        console.warn('navigator.geolocation is not available');
        getLocationFromIP();
    }

    function getLocationFromIP() {
        // Get location from http://ipinfo.io/json
        var url = 'http://ipinfo.io/json'
        var req = null;
        ajax('GET', url, req, function(res) {
            var result = JSON.parse(res);
            if ('loc' in result) {
                var loc = result.loc.split(',');
                lat = loc[0];
                lng = loc[1];
            } else {
                console.warn('Getting location by IP failed.');
            }
            loadNearbyItems();
        });
    }

    // -----------------------------------
    // Helper Functions
    // -----------------------------------

    /**
     * A helper function that makes a navigation button active
     *
     * @param btnId -
     *            The id of the navigation button
     */
    function activeBtn(btnId) {
        var btns = document.getElementsByClassName('main-nav-btn');

        // deactivate all navigation buttons
        for (var i = 0; i < btns.length; i++) {
            btns[i].className = btns[i].className.replace(/\bactive\b/, '');
        }

        // active the one that has id = btnId
        var btn = $(btnId);
        btn.className += ' active';
    }

    function showLoadingMessage(msg) {
        var itemList = $('item-list');
        itemList.innerHTML = '<p class="notice"><i class="fa fa-spinner fa-spin"></i> ' +
            msg + '</p>';
    }

    function showWarningMessage(msg) {
        var itemList = $('item-list');
        itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-triangle"></i> ' +
            msg + '</p>';
    }

    function showErrorMessage(msg) {
        var itemList = $('item-list');
        itemList.innerHTML = '<p class="notice"><i class="fa fa-exclamation-circle"></i> ' +
            msg + '</p>';
    }

    /**
     * A helper function that creates a DOM element <tag options...>
     *
     * @param tag
     * @param options
     * @returns
     */
    function $(tag, options) {
        if (!options) {
            return document.getElementById(tag);
        }

        var element = document.createElement(tag);

        for (var option in options) {
            if (options.hasOwnProperty(option)) {
                element[option] = options[option];
            }
        }

        return element;
    }

    function hideElement(element) {
        element.style.display = 'none';
    }

    function showElement(element, style) {
        var displayStyle = style ? style : 'block';
        element.style.display = displayStyle;
    }

    /**
     * AJAX helper
     *
     * @param method -
     *            GET|POST|PUT|DELETE
     * @param url -
     *            API end point
     * @param callback -
     *            This the successful callback
     * @param errorHandler -
     *            This is the failed callback
     */
    function ajax(method, url, data, callback, errorHandler) {
        var xhr = new XMLHttpRequest();

        xhr.open(method, url, true);

        xhr.onload = function() {
        	if (xhr.status === 200) {
        		callback(xhr.responseText);
        	} else {
        		errorHandler();
        	}
        };

        xhr.onerror = function() {
            console.error("The request couldn't be completed.");
            errorHandler();
        };

        if (data === null) {
            xhr.send();
        } else {
            xhr.setRequestHeader("Content-Type",
                "application/json;charset=utf-8");
            xhr.send(data);
        }
    }

    // -------------------------------------
    // AJAX call server-side APIs
    // -------------------------------------

    /**
     * API #1 Load the nearby items API end point: [GET]
     * /Dashi/search?user_id=1111&lat=37.38&lon=-122.08
     */
    function loadNearbyItems() {
        console.log('loadNearbyItems');
        activeBtn('nearby-btn');

        // The request parameters
        var url = './search';
        var params = '&user_name=' + user_name + '&lat=' + lat + '&lon=' + lng + '&jwtCode=' + jwtCode;
		//console.log(user_name); 
		//console.log(jwtCode);  
        var req = JSON.stringify({});

        // display loading message
        showLoadingMessage('Loading nearby items...');

        // make AJAX call
        ajax('GET', url + '?' + params, req,
            // successful callback
            function(res) {
                var items = JSON.parse(res);
				//console.log(typeof items[0].jwtResult); 
				//console.log(items[0].jwtResult); 
				if (items[0].jwtResult === "Authentication Success.") {
					listItems(items);
				} else if (user_name === "") { 
					listItems(items); 
				} else {
					signout(); 
					listItems(items); 
				}
            },
            // failed callback
            function() {
                showErrorMessage('Cannot load nearby items.');
            });
    }

    /**
     * API #2 Load favorite (or visited) items API end point: [GET]
     * /Dashi/history?user_id=1111
     */
    function loadFavoriteItems() {
        activeBtn('fav-btn');

        // The request parameters
        var url = './history';
		//console.log(jwtCode); 
		//console.log(user_name); 
        var params = 'jwtCode=' + jwtCode + '&user_name=' + user_name;
		//console.log(url + '?' + params); 
        var req = JSON.stringify({});

        // display loading message
        showLoadingMessage('Loading favorite items...');

        // make AJAX call
        ajax('GET', url + '?' + params, req, function(res) {
            var items = JSON.parse(res);
			//console.log(items[0]); 
            if (items.length === 1) {
				if (items[0].jwtResult === "Login Expiration.") {
					showWarningMessage(items[0].jwtResult); 
					signout();
				} else if (items[0].jwtResult === "Authentication Success.") {
                	showWarningMessage('No favorite item.'); 
				} else {
					signout(); 
					alert(items[0].jwtResult); 
					//console.log(typeof items[0].jwtResult); 
					//console.log(2); 
				}
            } else {
				listItems(items);	 
			}
        }, function() {
            showErrorMessage('Cannot load favorite items.');
        });
    }

    /**
     * API #3 Load recommended items API end point: [GET]
     * /Dashi/recommendation?user_id=1111
     */
    function loadRecommendedItems() {
        activeBtn('recommend-btn');

        // The request parameters
        var url = './recommendation';
        var params = 'user_name=' + user_name + '&lat=' + lat + '&lon=' + lng + '&jwtCode=' + jwtCode;
		//console.log(url + '?' + params); 
        var req = JSON.stringify({});

        // display loading message
        showLoadingMessage('Loading recommended items...');

        // make AJAX call
        ajax(
            'GET',
            url + '?' + params,
            req,
            // successful callback
            function(res) {
                var items = JSON.parse(res);
                if (items.length === 1) {
					if (items[0].jwtResult === "Login Expiration.") {
						showWarningMessage(items[0].jwtResult); 
						signout();
					} else if (items[0].jwtResult === "Authentication Success.") {
                		showWarningMessage('No favorite item.'); 
					} else {
						signout(); 
						alert(items[0].jwtResult); 
						//console.log(typeof items[0].jwtResult); 
						//console.log(2); 
					}
            	} else {
					listItems(items);	 
				}
            },
            // failed callback
            function() {
                showErrorMessage('Cannot load recommended items.');
            });
    }

    /**
     * API #4 Toggle favorite (or visited) items
     *
     * @param item_id -
     *            The item business id
     *
     * API end point: [POST]/[DELETE] /Dashi/history request json data: {
     * user_id: 1111, visited: [a_list_of_business_ids] }
     */
    function changeFavoriteItem(item_id) {
        // Check whether this item has been visited or not
        var li = $('item-' + item_id);
        var favIcon = $('fav-icon-' + item_id);
        var favorite = li.dataset.favorite !== 'true';

        // The request parameters
        var url = './history';
        var req = JSON.stringify({
            user_name: user_name,
            favorite: [item_id]
        });
        var method = favorite ? 'POST' : 'DELETE';

        ajax(method, url, req,
            // successful callback
            function(res) {
                var result = JSON.parse(res);
                if (result.result === 'SUCCESS') {
                    li.dataset.favorite = favorite;
                    favIcon.className = favorite ? 'fa fa-heart' : 'fa fa-heart-o';
                }
            });
    }

    // -------------------------------------
    // Create item list
    // -------------------------------------

    /**
     * List items
     *
     * @param items -
     *            An array of item JSON objects
     */
    function listItems(items) {
        // Clear the current results
        var itemList = $('item-list');
        itemList.innerHTML = '';

        for (var i = 1; i < items.length; i++) {
            addItem(itemList, items[i]);
        }
    }

    /**
     * Add item to the list
     *
     * @param itemList -
     *            The
     *            <ul id="item-list">
     *            tag
     * @param item -
     *            The item data (JSON object)
     */
    function addItem(itemList, item) {
        var item_id = item.item_id;

        // create the <li> tag and specify the id and class attributes
        var li = $('li', {
            id: 'item-' + item_id,
            className: 'item'
        });

        // set the data attribute
        li.dataset.item_id = item_id;
        li.dataset.favorite = item.favorite;

        // item image
        if (item.image_url) {
            li.appendChild($('img', {
                src: item.image_url
            }));
        } else {
            li.appendChild($(
                'img', {
                    src: 'https://assets-cdn.github.com/images/modules/logos_page/GitHub-Mark.png'
                }))
        }
        // section
        var section = $('div', {});

        // title
        var title = $('a', {
            href: item.url,
            target: '_blank',
            className: 'item-name'
        });
        title.innerHTML = item.name;
        section.appendChild(title);

        // category
        var category = $('p', {
            className: 'item-category'
        });
        category.innerHTML = 'Category: ' + item.categories.join(', ');
        section.appendChild(category);

        // TODO(vincent). here we might have a problem showing 3.5 as 3.
        // stars
        var stars = $('div', {
            className: 'stars'
        });

        for (var i = 0; i < item.rating; i++) {
            var star = $('i', {
                className: 'fa fa-star'
            });
            stars.appendChild(star);
        }

        if (('' + item.rating).match(/\.5$/)) {
            stars.appendChild($('i', {
                className: 'fa fa-star-half-o'
            }));
        }

        section.appendChild(stars);

        li.appendChild(section);

        // address
        var address = $('p', {
            className: 'item-address'
        });

        address.innerHTML = item.address.replace(/,/g, '<br/>').replace(/\"/g,
            '');
        li.appendChild(address);

        // favorite link
        var favLink = $('p', {
            className: 'fav-link'
        });

        favLink.onclick = function() {
            changeFavoriteItem(item_id);
        };

        favLink.appendChild($('i', {
            id: 'fav-icon-' + item_id,
            className: item.favorite ? 'fa fa-heart' : 'fa fa-heart-o'
        }));

        li.appendChild(favLink);

        itemList.appendChild(li);
    }

    init();

    // Popup window


})();
