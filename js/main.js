$(document).ready(function(){
    // DOM variable declaration
    let cityName = $('.cityName');
    let description = $('.description');
    let temperature = $('.temperature');
    let windSpeed = $('.windSpeed');
    let humidity = $('.Humidity');
    let feelsLike = $('.feelsLike');
    let pressure = $('.pressure');

    // API Key
    let key = `9646cf69311282f3f524046eea52f18c`;
    function data(city){
        $.ajax({

            // API
            url:`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`,
            // method
            method:'Get',
            success:function(currentData){
                let weatherData = currentData;
                // API call
                weatherFun(weatherData);
                lastUpdatedTime();
                $('.errorMsg').text('');
                $('.cityWeather').show()
                $('#weather').show();
            },
            error:function(err){
                if(err.status == 404){
                    $('#weather').hide();
                    $('.cityWeather').hide()
                    $('.errorMsg').text('City not Found. Please try again');
                }else{
                    $('#weather').hide();
                    $('.cityWeather').hide()
                    $('.errorMsg').text('Error fetching data. Please try again');
                }
            }
        });
    }

    // function to get weather Information after api call
    function weatherFun(data){
        let Celsius = Math.round(data.main.temp - 273.15);
        let feelTem = Math.round(data.main.feels_like - 273.15);
        cityName.text(data.name);
        description.text(data.weather[0].description);
        windSpeed.text(data.wind.speed + 'km/h')
        humidity.text(data.humidity);
        feelsLike.html(feelTem + `<sup>o</sup>`);
        pressure.text(data.main.pressure + ' ' +'hPa');
        temperature.html(`<h2>${Celsius}<sup>o</sup>C</h2><h2>(Switch to <sup>o</sup>F)</h2>`);
        $('.image').attr('src',`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    }

    // check last update weather
    function lastUpdatedTime(){
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        // format time
        let AM_PM = 'AM';
        if( hours < 12){
            AM_PM = 'AM'
        }else{
            AM_PM = 'PM';
        }
        $('.updatedTime').html('Last updated' +' '+ hours + ':' + minutes + ' ' + AM_PM);
    }
    lastUpdatedTime();


    // adding Event Listening
    $('#SearchIcon').on('click',function(){
        let InputField = $('.inputField');
        let InputVal = $('.inputField').val().trim();

        // handle error if the field is empty();
        if(!InputVal || InputVal == '' || !isNaN(InputVal)){
            InputField.addClass('active');
            InputField.val("Please enter valid city name..");
            return;
        }
        data(InputVal);
    });


    // remove Error Class on focus
    $('.inputField').on('focus',function(){
        $(this).removeClass('active');
        $(this).val('');
        return;
    });

    // intilize the function
    data('Karachi');
});