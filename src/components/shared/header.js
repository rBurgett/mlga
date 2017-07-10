import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ activeTab, user }) => {

    const styles = {
        jumbotron: {
            textAlign: 'center',
            backgroundColor: '#fff'
        },
        mainHeaderLink: {
            // marginTop: 0,
            color: '#000',
            textDecoration: 'none'
        },
        subHeader: {
            color: '#040'
        }
    };

    return (
        <div style={{marginBottom: 20}}>
            <div className="container-fluid">
                <div className="jumbotron" style={styles.jumbotron}>
                    <h1><a href="/" style={styles.mainHeaderLink}>Make Liberty Great Again</a></h1>
                    <h2 style={styles.subHeader}></h2>
                </div>
            </div>
            <nav className="nav navbar-inverse">
                <div className="container-fluid">

                    <div className="navbar-header">
                        <button id="js-toggleHeaderNavbarButton" type="button" className="navbar-toggle collapsed">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>

                    <div id="js-collapsableHeaderNavbar" className="collapse navbar-collapse">
                        <ul className="nav navbar-nav pull-right">
                            <li className={activeTab === 'home' ? 'active' : ''}><a href="/"><i className="fa fa-home"></i> Home</a></li>
                            <li className={activeTab === 'about' ? 'active' : ''}><a href="/about"><i className="fa fa-question-circle"></i> About</a></li>
                            <li className={activeTab === 'webcast' ? 'active' : ''}><a href="/webcast"><i className="fa fa-microphone"></i> Webcast</a></li>
                            <li className={activeTab === 'contact' ? 'active' : ''}><a href="/contact"><i className="fa fa-envelope"></i> Contact</a></li>
                            {!user ?
                                ''
                                :
                                <li className="dropdown">
                                    <a href="#" id="js-userDropdownMenu" className="dropdown-toggle">{user.firstName}  <span className="caret"></span></a>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li><a href="/blog/posts"><i className="fa fa-list"></i> Blog Posts</a></li>
                                        <li><a href="/profile"><i className="fa fa-user-circle-o"></i> Profile</a></li>
                                        <li><a href="/logout"><i className="fa fa-sign-out"></i> Logout</a></li>
                                    </ul>
                                </li>
                            }
                        </ul>
                    </div>

                </div>
            </nav>
        </div>
    );
};
Header.propTypes = {
    user: PropTypes.object,
    activeTab: PropTypes.string
};

export default Header;
