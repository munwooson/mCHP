/**
* mcs.js 버전업으로 인한 변경사항 (16.4.5.0, E76063-04 --> 18.3.3.0, E91527-01)
*	1. mscApp.initialize 내 mobileBackend 초기화 방법 변경
*		<기존>
*			mcs.mobileBackendManager.setConfig(mcsConfig);
*			mobileBackend = mcs.mobileBackendManager.getMobileBackend("mDAI");
*			mobileBackend.setAuthenticationType("ssoAuth");
*			mobileBackend.Authorization._setAccessToken(accessToken);
*		<변경>
*			mcs.init(mcsConfig);
*			//mcs.mobileBackend.setAuthenticationType(mcs.AUTHENTICATION_TYPES.oauth);
*			mcs.mobileBackend.authorization._authenticateSuccess({statusCode: 200}, accessToken);
*	2. mobileBackend 변수 제거
*		<기존>
*			mobileBackend 변수 생성하여 사용
*			정의 : var mobileBackend = mcs.mobileBackendManager.getMobileBackend("mDAI");
*		<변경>
*			mcs.mobileBackend 바로 사용
*			(mobileBackendManager Class가 삭제됨)
*	3. mcs.mobileBackend.customCode.invokeCustomCodeJSONRequest() 변경
*		- Promise 패턴으로 변경
*		<기존>
*		mcs.mobileBackend.customCode.invokeCustomCodeJSONRequest(path, method, data, successCallback, errorCallback)
*		<변경>
*		mcs.mobileBackend.customCode.invokeCustomCodeJSONRequest(path, method, data) → {Promise.<NetworkResponse>}
*		- Response Frormat 변경
*		<기존>
*		statusCode = 상태값, data = 응답데이터
*		<변경>
*		response = {statusCode:상태값, header:헤더값, data:응답데이터}
*/

//Local DB
var profileDb = null;

var QR_FLAG = false; //QR 초기화 변수 선언


var APPLICATION_ID = "DHImDAI";
var APPLICATION_NAME = "DHI mDAI";
var MOBILEBACKEND_NAME = "mDAI";

//모바일 백엔드 객체
var mobileBackend;

var mcsApp = mcsApp || {
	/** MCS MobileBackend 초기화 */
    initialize: function(accessToken) {
		console.info("[initialize] ", "START");

        setStartSpinner();

		mcs.init(mcsConfig);
		mobileBackend = mcs.mobileBackend;
		console.info("[initialize] ", "mobileBackend", mobileBackend);
		//mobileBackend.setAuthenticationType(mcs.AUTHENTICATION_TYPES.oauth);

		//console.log("[initialize]access_token from sessionStorage: ", accessToken);
		mobileBackend.authorization._authenticateSuccess({statusCode: 200}, accessToken);
		console.info("[initialize] ", "mobileBackend: ", mobileBackend);

		setStopSpinner();

		console.info("[initialize]", "END");
        navigator.splashscreen.hide();
		onMcsReady();
    },
	/** MCS Custom API 수행 */
	customApi : function(method, path, query, jsonData, successCallback, errorCallback){
		console.info("[" + method + ":" + path + "]", "pram:", query, jsonData);

		var url = path  + query;
		console.log('@@@@@   ' + method + '/' + path + '/' + query + '/' + JSON.stringify(jsonData));

		mobileBackend.customCode.invokeCustomCodeJSONRequest(url, method, jsonData).then(
			function(response) {
				console.info("[" + method + ":" + path + "]", "statusCode:", response.statusCode);
				console.info("[" + method + ":" + path + "]", "Result:", response.data);

				if(response.statusCode != 200){
					navigator.notification.confirm(
						"처리 중 오류가 발생하였습니다. server("+response.statusCode+")",
						confirmIgnoreOrReload,
						APPLICATION_NAME,
						["재시도", "무시"]
					);
				}

				setStopSpinner();

				successCallback(response.data);
			}
		).catch(
			function(error) {
				//errorCallback(error);
                    console.info(JSON.stringify(error));
				setStopSpinner();
				console.warn("[" + method + ":" + path + "]", "Error CustomCode " + method + " : " + path, error);

				navigator.notification.confirm(
					"처리 중 오류가 발생하였습니다. out",
					confirmIgnoreOrReload,
					APPLICATION_NAME,
					["재시도", "무시"]
				);
			}
		);
	},
	/** [공통]Push Notification Count를 -1 업데이트함 */
	/* setPushCnt : function() {
		console.info("[setPushCnt] ", "START");

		var path = "common/userSetting";
		var method = "POST";
		var jsonData = {
			adUserId : sessionStorage.getItem("userId"),
			type : "cnt"
		};

		var val = Number(sessionStorage.getItem("pushCnt")) - 1;

		console.info("[setPushCnt] ", method + " : " + path, jsonData);
		mobileBackend.customCode.invokeCustomCodeJSONRequest(path, method, jsonData).then(
			function(response) {
				console.info("[setPushCnt] ", "statusCode: ", response.statusCode);
				console.info("[setPushCnt] ", "Result:", response.data);

				if(response.data.flag == "SUCCESS"){
					sessionStorage.setItem("pushCnt", val);
				}else{
					console.warn("[setPushCnt] ", "Error CustomCode " + method + " : " + path, response.data.msg);
				}
			}
		).catch(
			function(error) {
				console.warn("[setPushCnt] ", "Error CustomCode " + method + " : " + path, error);
			}
		);
    },  */
	/** [사용자설정] 자동 로그인 여부 업데이트 */
	/* setLoginYn : function(str) {
        console.info("[setLoginYn] ", "START");

		var path = "common/userSetting";
		var method = "POST";
		var jsonData = {
			adUserId : sessionStorage.getItem("userId"),
			type : "login",
			val : str
		};

		setStartSpinner();

		console.info("[setLoginYn] ", method + " : " + path, jsonData);
		mobileBackend.customCode.invokeCustomCodeJSONRequest(path, method, jsonData).then(
			function(response) {
				console.info("[setLoginYn] ", "statusCode: ", response.statusCode);
				console.info("[setLoginYn] ", "Result:", response.data);

				if(response.statusCode != 200){
					navigator.notification.confirm(
						"처리 중 오류가 발생하였습니다.("+response.statusCode+")",
						confirmIgnoreOrReload,
						APPLICATION_NAME,
						["재시도", "무시"]
					);
				}

				if(response.data.flag == "SUCCESS"){
					// Local DB PROFILE Table 업데이트
					window.sqlitePlugin.openDatabase({name: 'profile.db', location: 'default'}, function(db){
						db.transaction(function(tx){
							tx.executeSql('UPDATE PROFILE SET AUTO_LOGIN = ? WHERE USER_ID = ?', [str, sessionStorage.getItem("userId")], function(tx, rs){
							});
						}, function(error){
							console.warn("[setLoginYn] ", "Local DB Transaction ERROR: " + error.message);
						}, function(){
							console.info("[setLoginYn] ", "Local DB Transaction Complete: UPDATE AUTO_LOGIN");
							db.close(function(){
							});
						});
					});

					sessionStorage.setItem("loginYn", str);

					navigator.notification.alert(
						"자동로그인 설정이 변경 되었습니다.",
						reloadPage,
						APPLICATION_NAME,
						"확인"
					);
				}else{
					console.warn("[setLoginYn] ", "Error CustomCode " + method + " : " + path, response.data.msg);

					navigator.notification.confirm(
						"자동로그인 설정 변경에 실패했습니다.("+response.data.msg+")",
						confirmIgnoreOrReload,
						APPLICATION_NAME,
						["재시도", "무시"]
					);
				}

				setStopSpinner();

				console.info("[setLoginYn] ", "END");
			}
		).catch(
			function(error) {
				setStopSpinner();
				console.warn("[setLoginYn] ", "Error CustomCode " + method + " : " + path, error);

				navigator.notification.confirm(
					"처리 중 오류가 발생하였습니다.",
					confirmIgnoreOrReload,
					APPLICATION_NAME,
					["재시도", "무시"]
				);
			}
		);
    }, */
	/** [사용자설정] 알람 수신 여부 업데이트 */
/*   setPushYn : function(str) {
        console.info("[setPushYn] ", "START");

		var path = "common/userSetting";
		var method = "POST";
		var jsonData = {
			adUserId : sessionStorage.getItem("userId"),
			type : "push",
			val : str
		};

		setStartSpinner();

		console.info("[setPushYn] ", method + " : " + path, jsonData);
		mobileBackend.customCode.invokeCustomCodeJSONRequest(path, method, jsonData).then(
			function(response) {
				console.info("[setPushYn] ", "statusCode: ", response.statusCode);
				console.info("[setPushYn] ", "Result:", response.data);

				if(response.statusCode != 200){
					navigator.notification.confirm(
						"처리 중 오류가 발생하였습니다.("+response.statusCode+")",
						confirmIgnoreOrReload,
						APPLICATION_NAME,
						["재시도", "무시"]
					);
				}

				if(response.data.flag == "SUCCESS"){
					sessionStorage.setItem("pushYn", str);

					navigator.notification.alert(
						"알림수신 설정이 변경 되었습니다.",
						reloadPage,
						APPLICATION_NAME,
						"확인"
					);
				}else{
					console.warn("[setPushYn] ", "Error CustomCode " + method + " : " + path, response.data.msg);

					navigator.notification.confirm(
						"알림수신 설정 변경에 실패했습니다.("+response.data.msg+")",
						confirmIgnoreOrReload,
						APPLICATION_NAME,
						["재시도", "무시"]
					);
				}

				setStopSpinner();

				console.info("[setPushYn] ", "END");
			}
		).catch(
			function(error) {
				setStopSpinner();
				console.warn("[setPushYn] ", "Error CustomCode " + method + " : " + path, error);

				navigator.notification.confirm(
					"처리 중 오류가 발생하였습니다.",
					confirmIgnoreOrReload,
					APPLICATION_NAME,
					["재시도", "무시"]
				);
			}
		);
    }, */
	/** [사용자설정] WiFi 사용 설정 업데이트 */
 /*   setWifiYn : function(str) {
        console.info("[setWifiYn] ", "START");

		var path = "common/userSetting";
		var method = "POST";
		var jsonData = {
			adUserId : sessionStorage.getItem("userId"),
			type : "wifi",
			val : str
		};

		setStartSpinner();

		console.info("[setWifiYn] ", method + " : " + path, jsonData);
		mobileBackend.customCode.invokeCustomCodeJSONRequest(path, method, jsonData).then(
			function(response) {
				console.info("[setWifiYn] ", "statusCode: ", response.statusCode);
				console.info("[setWifiYn] ", "Result:", response.data);

				if(response.statusCode != 200){
					navigator.notification.confirm(
						"처리 중 오류가 발생하였습니다.("+response.statusCode+")",
						confirmIgnoreOrReload,
						APPLICATION_NAME,
						["재시도", "무시"]
					);
				}

				if(response.data.flag == "SUCCESS"){
					sessionStorage.setItem("wifiYn", str);

					navigator.notification.alert(
						"WiFi 사용 설정이 변경 되었습니다.",
						reloadPage,
						APPLICATION_NAME,
						"확인"
					);
				}else{
					console.warn("[setWifiYn] ", "Error CustomCode " + method + " : " + path, response.data.msg);

					navigator.notification.confirm(
						"WiFi 사용 설정 변경에 실패했습니다.("+response.data.msg+")",
						confirmIgnoreOrReload,
						APPLICATION_NAME,
						["재시도", "무시"]
					);
				}

				setStopSpinner();

				console.info("[setWifiYn] ", "END");
			}
		).catch(
			function(error) {
				setStopSpinner();
				console.warn("[setWifiYn] ", "Error CustomCode " + method + " : " + path, error);

				navigator.notification.confirm(
					"처리 중 오류가 발생하였습니다.",
					confirmIgnoreOrReload,
					APPLICATION_NAME,
					["재시도", "무시"]
				);
			}
		);
    }, */
	/** [공통] 로그아웃 */
    logout : function() {
		console.info("[logout] ", "START");

		var path = "common/userSetting";
		var method = "POST";
		var jsonData = {
			adUserId : sessionStorage.getItem("userId"),
			type : "login",
			val : "N"
		};

		setStartSpinner();

		console.info("[logout] ", method + " : " + path);
		mobileBackend.customCode.invokeCustomCodeJSONRequest(path, method, jsonData).then(
			function(response) {
				console.info("[logout] ", "statusCode: ", response.statusCode);
				console.info("[logout] ", "Result:", response.data);

				if(response.data.flag == "SUCCESS"){
					//원격DB에서 AccessToken 삭제
					deleteAllAccessToken(sessionStorage.getItem("userId"), function(){
						// SQLite Local DB 삭제
						window.sqlitePlugin.deleteDatabase({name: 'profile.db', location: 'default'}, function(){
						}, function(error){
							console.warn("[logout] ", "Local DB Transaction ERROR: " + error.message);
						});

						console.info("[logout] ", "Local Storage autoLogin Set!");

						sessionStorage.clear();
						console.info("[logout] ", "Sesstion Storage Clear!");

						mobileBackend.authorization.logout();
						console.info("[logout] ", "MCS Logout!");

						console.info("[logout] ", "END");

						location.replace("../index.html");
					});
				}else{
					navigator.notification.alert(
						"처리 중 오류가 발생하여 DHI mDAI을 종료합니다.("+response.statusCode+")",
						exitApp,
						APPLICATION_NAME,
						"확인"
					);
				}

				setStopSpinner();
			}
		).catch(
			function(error) {
				setStopSpinner();
				console.warn("[logout] ", "Error CustomCode " + method + " : " + path, error);

				navigator.notification.confirm(
					"처리 중 오류가 발생하였습니다.",
					confirmIgnoreOrReload,
					APPLICATION_NAME,
					["재시도", "무시"]
				);
			}
		);
    }
};



        var app = {
            // Application Constructor
            initialize: function() {
                    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
                    document.addEventListener('backbutton', onBackKeyDown, true);
            },

             onDeviceReady: function() {
                 
                 StatusBar.overlaysWebView(false);
                 StatusBar.backgroundColorByHexString("#000000");
                 StatusBar.styleLightContent();

                    var accessToken;
                    profileDb = window.sqlitePlugin.openDatabase({name: 'profile.db', location: 'default'});

                    //SQLite Local DB에서 사용자/기기 정보 가져오기
                        profileDb.transaction(function(tx){
                            tx.executeSql('SELECT ACCESS_TOKEN AS accessToken FROM PROFILE', [], function(tx, rs){
                                if(rs.rows.length > 0){
                                    accessToken = rs.rows.item(0).accessToken;
                                }
                                console.info("[onDeviceReady] ", "Local DB Transaction Complete: SELECT " + rs.rows.length);
                            });
                        }, function(error){
                            console.warn("[onDeviceReady] ", "Local DB Transaction ERROR: " + error.message);
                        }, function(){
                            mcsApp.initialize(accessToken);
                            db.close(function(){
                            });
                        });






            },

        };

        app.initialize();


            function onBackKeyDown() {
                         setStopSpinner();
                         console.log($.mobile.activePage.attr('id'));
                         //$('#' + $.mobile.activePage.attr('id')).top(0);
                         switch($.mobile.activePage.attr('id')){
                             case 'main':
                             if(QR_FLAG){
                                QR_FLAG = false;
                             }else{
                                dialog_confirm("앱을 종료하시겠습니까?", onConfirm);
                             }
                                 break;

                             default:
                             if(QR_FLAG){
                                QR_FLAG = false;
                             }else{
                                $.mobile.back();
                             }
                                 break;
                         }
                     }

            //AccessToken 삭제
            function deleteAllAccessToken(p_userId, complateCallback){
            if(p_userId != null && p_userId != ""){
                console.info("[deleteAllAccessToken] ", "Delete All AccessToken...");

                var path = "mcsCommon_accessTokenAfterLogin/logout/ " + APPLICATION_ID + "/" + p_userId;
                var method = "DELETE";
                var jsonData = "";

                console.info("[deleteAllAccessToken] ", method + " : " + path);
                mobileBackend.customCode.invokeCustomCodeJSONRequest(path, method, jsonData).then(
                    function (response) {
                        console.info("[deleteAllAccessToken] ", "statusCode: ", response.statusCode);
                        console.info("[deleteAllAccessToken] ", "Result:", response.data);
                        complateCallback();
                    }
                ).catch(
                    function (error) {
                        console.warn("[deleteAllAccessToken] ", "Error CustomCode " + method + " : " + path, error);
                        complateCallback();
                    }
                );
            }else{
                console.info("[deleteAllAccessToken] ", "No AccessToken or UserId!");
                complateCallback();
            }
            }

                   function onConfirm(buttonIndex) {
                      if(buttonIndex == 1){
                        exitApp();
                           // mcsApp.logout();
                        }else{


                        //     window.location.hash = '#/android_asset/www/html/menu.html';
                             return false;
                              }
                         }

                /** 페이지 리로드(1) or 앱 종료(2) */
                function confirmIgnoreOrReload(buttonIndex){
                    if(buttonIndex == 1){
                        move_refresh();
                    }else{
                    }
                }
