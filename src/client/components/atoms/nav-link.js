import React from 'react';
import {Link} from 'react-router';


const NavLink = (props) => <Link className="nav-item is-tab" activeClassName="is-active" style={{margin: 0}} {...props} />;

export default NavLink;
