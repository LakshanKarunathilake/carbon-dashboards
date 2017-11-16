/*
 *  Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 *  WSO2 Inc. licenses this file to you under the Apache License,
 *  Version 2.0 (the "License"); you may not use this file except
 *  in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing,
 *  software distributed under the License is distributed on an
 *  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, either express or implied.  See the License for the
 *  specific language governing permissions and limitations
 *  under the License.
 *
 */

import { AppBar, FlatButton, IconButton, IconMenu, MenuItem } from 'material-ui';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AuthManager from '../../auth/utils/AuthManager';

import './Header.css';

/**
 * Header component.
 */
export default class Header extends Component {
    /**
     * Render right side header links.
     *
     * @returns {XML} HTML content
     */
    renderRightLinks() {
        if (this.props.hideUserSettings) {
            return <div />;
        }

        // If the user is not set show the login button. Else show account information.
        const user = AuthManager.getUser();
        if (!user) {
            return (
                <FlatButton
                    label="Login"
                    containerElement={<Link to={`${window.contextPath}/login?referrer=${window.location.pathname}`} />}
                />
            );
        }

        return (
            <div className="header-right-btn-group">
                <span className="acc-name">{user.username}</span>
                <IconMenu
                    iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                    targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
                >
                    <MenuItem
                        primaryText="Logout"
                        containerElement={<Link to={`${window.contextPath}/logout`} />}
                    />
                </IconMenu>
            </div>
        );
    }

    /**
     * Render the component.
     *
     * @returns {XML} HTML content
     */
    render() {
        return (
            <AppBar
                title={this.props.title}
                iconElementLeft={<i className="icon fw fw-wso2-logo header-icon" />}
                iconElementRight={this.renderRightLinks()}
            />
        );
    }
}

Header.propTypes = {
    title: React.PropTypes.string,
    hideUserSettings: React.PropTypes.bool,
};

Header.defaultProps = {
    title: 'Portal',
    hideUserSettings: false,
};
