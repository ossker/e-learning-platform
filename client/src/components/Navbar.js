import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth, logout } from '../auth'
import styled from "styled-components";
import { MdPerson, MdAddCircle,MdPersonAddAlt1, MdLogin } from 'react-icons/md';


const NavBar = () => {

    const [logged] = useAuth();

    return (
        <NavbarWrapper className="bg-white flex">
            <div className="container w-100">
                <div className="brand-and-toggler flex flex-between w-100">
                    <Link to="/" className="navbar-brand text-uppercase ls-1 fw-8">
                        Kur<span>siki</span>
                    </Link>
                    <div className="navbar-btn flex">
                        {logged?<>
                            <Link to="/add-course" className="cart-btn">
                                <MdAddCircle/>
                            </Link>
                            <Link to="/my-profile" className="cart-btn">
                                <MdPerson/>
                            </Link>
                            <a className="cart-btn" href="/" onClick={()=>{logout()}}>Log Out</a>
                        </>:
                        <>
                            <Link to="/login" className="cart-btn">
                                <MdLogin/>
                            </Link>
                            <Link to="/signup" className="cart-btn">
                                <MdPersonAddAlt1/>
                            </Link>
                        </>}
                    </div>
                </div>
            </div>
        </NavbarWrapper>

    )
}

const NavbarWrapper = styled.nav`
    height: 80px;
    box-shadow: rgba(50, 50, 93, 0.15) 0px 16px 12px -2px, rgba(0, 0, 0, 0.2) 0px 3px 7px -3px;

    .navbar-brand{
        font-size: 23px;
        span{
          color: var(--clr-orange);
        }
      }

      .cart-btn{
        margin-right: 18px;
        font-size: 23px;
        position: relative;
        .item-count-badge{
          background-color: var(--clr-orange);
          position: absolute;
          right: -10px;
          top: -10px;
          font-size: 12px;
          font-weight: 700;
          display: block;
          width: 23px;
          height: 23px;
          color: var(--clr-white);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }

      .sidebar-open-btn{
        transition: all 300ms ease-in-out;
        &:hover{
          opacity: 0.7;
        }
      }
`;

export default NavBar