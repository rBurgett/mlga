import React from 'react';
import PropTypes from 'prop-types';

import Header from './shared/header';
import FooterComponent from './shared/footer';

const Layout = ({ user, activeTab, children, hideFooter = false })  => {
    return (
        <div>
            <Header activeTab={activeTab} user={user} />
            {children}
            {hideFooter ? <div></div> : <FooterComponent />}
        </div>
    );
};
Layout.propTypes = {
    user: PropTypes.object,
    activeTab: PropTypes.string,
    hideFooter: PropTypes.bool,
    children: PropTypes.element
};

export default Layout;
