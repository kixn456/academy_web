import React from 'react';
export const HomeBanner = React.createClass({
    render: function () {
        return (
            <div className="slider" style={{height:'330px'}}>
                <div className="camera_wrap camera_azure_skin" id="camera_wrap_1">
                    <div data-src="images/slider3.jpg">  </div>
                    <div data-src="images/slider2.jpg">  </div>
                    <div data-src="images/slider5.jpg">  </div>
                </div>
                <div className="clear"> </div>
            </div>
        )
    }
});


