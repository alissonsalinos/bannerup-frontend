import React, { useContext } from 'react'
import 'rbx/index.css';
import { Navbar, Button } from 'rbx';
import UserContext from '../../context/UserContext';
import { useHistory } from 'react-router-dom';
import {useSpring, animated} from 'react-spring'


export default function Header() {

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    const logout = (e) => {
        e.preventDefault();
        setUserData({
            token: undefined,
            user: undefined,
        })
        localStorage.setItem('auth-token', '');
        history.push("/login");
    }

    const create = (e) => {
      e.preventDefault();
      history.push("/create");
    }

    const values = useSpring({opacity: 1, top: 0, position:'absolute', width: '100%', from: {opacity: 0, top: -100, position:'absolute', width: '100%'}})

    return (
        <React.Fragment>
        <animated.div style={values}>  
        <Navbar color="light">
      <Navbar.Brand>
        <Navbar.Item href="/">
          <span className="is-size-4" style={{fontWeight:'bold', textTransform: 'capitalize'}}>banner</span><span className="is-primary is-size-7" style={{background:'#00d1b2', color:'white', borderRadius: 5+'px', padding:'1px 3px', marginTop:'-10px', marginLeft:'3px', fontWeight: 'bold'}}>UP</span>
        </Navbar.Item>
        <Navbar.Burger />
      </Navbar.Brand>
      <Navbar.Menu>
        <Navbar.Segment align="start">
          <Navbar.Item href="/" >Home</Navbar.Item>
          <Navbar.Item href="/sobre">Sobre o App</Navbar.Item>
    
          <Navbar.Item dropdown>
            <Navbar.Link>Campanhas</Navbar.Link>
            <Navbar.Dropdown>
              <Navbar.Item href="/">Campanhas Ativas</Navbar.Item>
              <Navbar.Item href="/notactive">Campanhas Desativadas</Navbar.Item>
              {/* <Navbar.Divider />
              <Navbar.Item>Report an issue</Navbar.Item> */}
            </Navbar.Dropdown>
          </Navbar.Item>
        </Navbar.Segment>
    
        <Navbar.Segment align="end">
          <Navbar.Item onClick={create}>
    
              <Button color="primary">
                <span className="icon is-small">
                  <i className="fas fa-plus"></i>
                </span>
                <span><strong>Criar campanha</strong></span>
                
              </Button>
          </Navbar.Item >
        {
            userData.user ? (
              <>
          
          <Navbar.Item style={{marginRight: '1em'}} dropdown>
            <Navbar.Link>
              <div className="icon-text">
                <span className="icon has-text-primary">
                <i className="fas fa-user-circle"></i>
                </span>
                <span className="has-text-primary">{userData.user.displayName}</span>
                </div>
             </Navbar.Link> 
             <Navbar.Dropdown>
             <Navbar.Item onClick={logout}>
                
                <div className="icon-text">
                  <span className="icon has-text-danger">
                  <i className="fas fa-sign-out-alt"></i>
                  </span>
                  <span className="has-text-danger">Logout</span>
                  </div>
                    
              </Navbar.Item> 
             </Navbar.Dropdown> 
            </Navbar.Item>
             </>
              )  : ''   
        }  
        </Navbar.Segment>
      </Navbar.Menu>
    </Navbar>
    </animated.div>
        </React.Fragment>
    )
}
