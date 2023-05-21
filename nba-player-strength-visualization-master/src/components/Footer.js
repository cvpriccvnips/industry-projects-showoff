import React from 'react';

export class Footer extends React.Component {
    render() {
        return (
            <footer>
                <ul>
                    <li>
                        <p><i className="fa fa-map-o fa-2x"></i></p>
                        <p className="no-margin">Changtai Liu</p>
                        <p className="no-margin">University of California, San Diego</p>
                    </li>
                    <li>
                        <p><i className="fa fa-envelope-o fa-2x"></i></p>
                        <p>chl193@ucsd.edu</p>
                    </li>
                    <li>
                        <p><i className="fa fa-phone fa-2x"></i></p>
                        <p>+1 858 766 8350</p>
                    </li>
                </ul>
            </footer>
        );
    }
}